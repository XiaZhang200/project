
import requests
import json

url = 'http://localhost:11434/api/generate'

while True:
    # Get user input
    user_input = input("You: ")
    
    # Check if the user wants to exit
    if user_input.lower() == "/bye":
        print("Goodbye!")
        break

    # Define request data
    data = {
        "model": "deepseek-r1:8b",
        "prompt": user_input
    }

    # Send request to Ollama API
    response = requests.post(url, json=data, stream=True)

    # Process response
    if response.status_code == 200:
        print("AI:", end=" ", flush=True)
        for line in response.iter_lines():
            if line:
                decoded_line = line.decode("utf-8")
                result = json.loads(decoded_line)
                generated_text = result.get("response", "")
                print(generated_text, end="", flush=True)
        print()  # Newline after response
    else:
        print("Error:", response.status_code, response.text)
