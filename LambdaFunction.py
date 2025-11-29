import json
import base64
import boto3

bedrock = boto3.client("bedrock-runtime", region_name="ap-south-1")
textract = boto3.client("textract")

TEMPLATE = {
    "name": "", "email": "", "phoneNumber": "",
    "highSchoolName": "", "highSchoolAddress": "", "highSchoolGpaOrPercentage": "", "highSchoolGpaScale": "", "highSchoolBoard": "", "highSchoolGraduationYear": "",
    "ugCollegeName": "", "ugCollegeAddress": "", "ugCollegeGpaOrPercentage": "", "ugCollegeGpaScale": "", "ugUniversity": "", "ugGraduationYear": "", "ugDegree": "", "ugMajor": "",
    "pgCollegeName": "", "pgCollegeAddress": "", "pgCollegeGpaOrPercentage": "", "pgCollegeGpaScale": "", "pgUniversity": "", "pgGraduationYear": "", "pgDegree": "", "pgMajor": "",
    "certifications": [], "extraCurricularActivities": [], "workExperience": [], "researchPublications": [],
    "testScores": {"sat": "", "act": "", "gre": "", "gmat": "", "toefl": "", "ielts": ""},
    "achievements": []
}

def lambda_handler(event, context):
    try:
        body = json.loads(event["body"]) if "body" in event else event
        file_b64 = body["fileContentBase64"]
        
        resume_bytes = base64.b64decode(file_b64)
        print(f"File size: {len(resume_bytes)} bytes")
        
        # Extract text using Textract
        text = ""
        try:
            print("Starting Textract...")
            resp = textract.detect_document_text(Document={"Bytes": resume_bytes})
            lines = [block["Text"] for block in resp.get("Blocks", []) if block.get("BlockType") == "LINE"]
            text = "\n".join(lines)
            print(f"Textract extracted {len(text)} characters")
            print(f"First 200 chars: {text[:200]}")
        except Exception as e:
            print(f"Textract failed: {e}")
            return {
                "statusCode": 500,
                "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
                "body": json.dumps({"error": f"Text extraction failed: {str(e)}"})
            }
        
        if not text or len(text.strip()) < 10:
            return {
                "statusCode": 400,
                "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
                "body": json.dumps({"error": "No readable text found in document"})
            }
        
        # Limit text length for faster processing
        if len(text) > 3000:
            text = text[:3000]
        
        # Improved prompt for better extraction
        prompt = f"""You are a resume parser. Extract information from this resume text and return ONLY a JSON object.

Template to follow:
{json.dumps(TEMPLATE, indent=2)}

Resume text:
{text}

Extract the information and return ONLY the JSON object with the extracted data. Fill empty strings for missing information."""
        
        try:
            print("Calling Bedrock...")
            print(f"Prompt length: {len(prompt)}")
            
            response = bedrock.invoke_model(
                modelId="amazon.titan-text-express-v1",
                body=json.dumps({
                    "inputText": prompt,
                    "textGenerationConfig": {"maxTokenCount": 4000, "temperature": 0.2}
                }),
                contentType="application/json"
            )
            
            result = json.loads(response["body"].read().decode("utf-8"))
            output_text = result["results"][0]["outputText"].strip()
            print(f"Full Bedrock response: {output_text}")
            
            # Parse JSON response
            try:
                extracted_data = json.loads(output_text)
                print("Successfully parsed JSON from Bedrock")
            except Exception as parse_error:
                print(f"JSON parse error: {parse_error}")
                # Try to extract JSON from response
                start = output_text.find('{')
                end = output_text.rfind('}') + 1
                if start >= 0 and end > start:
                    json_str = output_text[start:end]
                    print(f"Extracted JSON string: {json_str[:200]}...")
                    extracted_data = json.loads(json_str)
                else:
                    print("No JSON found in response, using template")
                    extracted_data = TEMPLATE
            
            print(f"Final extracted data keys: {list(extracted_data.keys())}")
            return {
                "statusCode": 200,
                "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
                "body": json.dumps(extracted_data)
            }
            
        except Exception as e:
            print(f"Bedrock failed: {e}")
            return {
                "statusCode": 500,
                "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
                "body": json.dumps({"error": f"AI processing failed: {str(e)}"})
            }
        
    except Exception as e:
        print(f"Lambda error: {e}")
        return {
            "statusCode": 500,
            "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": str(e)})
        }