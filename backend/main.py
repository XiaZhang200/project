from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import requests
import json
import asyncio

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OLLAMA_URL = "http://localhost:11434/api/generate"

class ChatRequest(BaseModel):
    prompt: str

async def stream_response(prompt: str):
    data = {"model": "deepseek-r1:8b", "prompt": prompt}
    response = requests.post(OLLAMA_URL, json=data, stream=True)

    if response.status_code == 200:
        for line in response.iter_lines():
            if line:
                decoded_line = line.decode("utf-8")
                result = json.loads(decoded_line)
                chunk = result.get("response", "")
                yield chunk  # Send chunk immediately
                await asyncio.sleep(0.01)  # Small delay to allow streaming
    else:
        yield json.dumps({"error": response.status_code, "message": response.text})

@app.post("/chat")
async def chat(request: ChatRequest):
    return StreamingResponse(stream_response(request.prompt), media_type="text/plain")
