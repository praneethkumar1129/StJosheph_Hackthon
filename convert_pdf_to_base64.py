import base64
import json

# Replace with your PDF file path
pdf_path = "resume.pdf"

with open(pdf_path, "rb") as f:
    pdf_bytes = f.read()
    base64_string = base64.b64encode(pdf_bytes).decode("utf-8")

# Create test event JSON
test_event = {
    "fileContentBase64": base64_string
}

# Save to file
with open("test_event.json", "w") as f:
    json.dump(test_event, f)

print("✓ Base64 conversion complete!")
print(f"✓ Test event saved to: test_event.json")
print(f"✓ Base64 length: {len(base64_string)} characters")
