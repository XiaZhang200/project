from fastapi import FastAPI
import requests
import json

app = FastAPI()
OLLAMA_URL = "http://localhost:11434/api/generate"

@app.post("/chat")
async def chat(prompt: str):
    data = {"model": "deepseek-r1:8b", "prompt": prompt}
    response = requests.post(OLLAMA_URL, json=data, stream=True)

    if response.status_code == 200:
        generated_text = ""
        for line in response.iter_lines():
            if line:
                decoded_line = line.decode("utf-8")
                result = json.loads(decoded_line)
                generated_text += result.get("response", "")
        return {"response": generated_text}
    else:
        return {"error": response.status_code, "message": response.text}