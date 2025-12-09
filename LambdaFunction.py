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
        # Handle both API Gateway and direct invocation
        if "body" in event:
            body = json.loads(event["body"]) if isinstance(event["body"], str) else event["body"]
            file_b64 = body.get("fileContentBase64", "")
        else:
            file_b64 = event.get("fileContentBase64", "")
        
        if not file_b64:
            return {
                "statusCode": 400,
                "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
                "body": json.dumps({"error": "Missing fileContentBase64 field"})
            }
        
        resume_bytes = base64.b64decode(file_b64)
        
        # Validate PDF format
        if not resume_bytes.startswith(b'%PDF'):
            if resume_bytes.startswith(b'PK\x03\x04'):
                return {
                    "statusCode": 400,
                    "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
                    "body": json.dumps({"error": "DOCX files not supported. Please convert to PDF."})
                }
            return {
                "statusCode": 400,
                "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
                "body": json.dumps({"error": "Only PDF files are supported."})
            }
        
        # Extract text using Textract
        resp = textract.detect_document_text(Document={"Bytes": resume_bytes})
        text = "\n".join([block["Text"] for block in resp.get("Blocks", []) if block.get("BlockType") == "LINE"])
        
        if not text or len(text.strip()) < 10:
            return {
                "statusCode": 400,
                "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
                "body": json.dumps({"error": "No text found in PDF"})
            }
        
        # Limit text
        if len(text) > 3000:
            text = text[:3000]
        
        # Call Bedrock
        prompt = f"Extract resume data as JSON: {json.dumps(TEMPLATE)}\n\nResume:\n{text}\n\nJSON:"
        
        response = bedrock.invoke_model(
            modelId="amazon.titan-text-express-v1",
            body=json.dumps({
                "inputText": prompt,
                "textGenerationConfig": {"maxTokenCount": 4000, "temperature": 0.1}
            }),
            contentType="application/json"
        )
        
        result = json.loads(response["body"].read().decode("utf-8"))
        output_text = result["results"][0]["outputText"].strip()
        
        try:
            extracted_data = json.loads(output_text)
        except:
            start = output_text.find('{')
            end = output_text.rfind('}') + 1
            extracted_data = json.loads(output_text[start:end]) if start >= 0 and end > start else TEMPLATE
        
        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
            "body": json.dumps(extracted_data)
        }
        
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": str(e)})
        }
