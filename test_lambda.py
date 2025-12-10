#!/usr/bin/env python3
"""
Test script to debug Lambda function issues
"""
import base64
import json
import requests

# Test with actual PDF file
def test_with_pdf_file(pdf_path):
    """Test Lambda with a real PDF file"""
    try:
        with open(pdf_path, 'rb') as f:
            pdf_bytes = f.read()
        
        # Convert to base64
        pdf_b64 = base64.b64encode(pdf_bytes).decode('utf-8')
        
        # Test payload
        payload = {
            "fileContentBase64": pdf_b64
        }
        
        # Send request
        response = requests.post(
            'https://nrkg7cmta3.execute-api.ap-south-1.amazonaws.com/dev/praneeth',
            headers={'Content-Type': 'application/json'},
            json=payload,
            timeout=120
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
    except Exception as e:
        print(f"Error: {e}")

# Test with sample text (will fail - for debugging)
def test_with_text():
    """Test with text data to see error details"""
    sample_text = "This is a sample resume text for testing. Name: John Doe, Email: john.doe@example.com, Phone: +91 9876543210."
    text_b64 = base64.b64encode(sample_text.encode()).decode('utf-8')
    
    payload = {
        "fileContentBase64": text_b64
    }
    
    try:
        response = requests.post(
            'https://nrkg7cmta3.execute-api.ap-south-1.amazonaws.com/dev/praneeth',
            headers={'Content-Type': 'application/json'},
            json=payload,
            timeout=30
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
    except Exception as e:
        print(f"Error: {e}")

# Create a minimal PDF for testing
def create_test_pdf():
    """Create a minimal PDF file for testing"""
    # Minimal PDF content
    pdf_content = """%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
100 700 Td
(John Doe Resume) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000206 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
300
%%EOF"""
    
    with open('test_resume.pdf', 'wb') as f:
        f.write(pdf_content.encode('latin-1'))
    
    print("Created test_resume.pdf")
    return 'test_resume.pdf'

if __name__ == "__main__":
    print("=== Testing Lambda Function ===")
    
    print("\n1. Testing with text (should fail):")
    test_with_text()
    
    print("\n2. Creating test PDF:")
    pdf_file = create_test_pdf()
    
    print("\n3. Testing with PDF:")
    test_with_pdf_file(pdf_file)