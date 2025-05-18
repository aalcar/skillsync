# server/main.py

from fastapi import FastAPI, Form, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import os
import requests
from pdf_parser import parse_pdf
from pydantic import BaseModel
import pandas as pd
from jobspy import scrape_jobs
from nltk.tokenize import word_tokenize
import nltk
from keywords import technical_keywords_dict

nltk.download('punkt')

# start stuff
load_dotenv()
API_KEY = os.getenv("OPENROUTER_API_KEY")
app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class JobRequest(BaseModel):
    role: str
    location: str
    job_type: str

@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    try:
        # Save uploaded file temporarily
        with open("temp_resume.pdf", "wb") as f:
            f.write(await file.read())

        # Parse keywords from resume
        resume_keywords = parse_pdf("temp_resume.pdf")

        # Optional: sort by frequency
        sorted_keywords = sorted(resume_keywords.items(), key=lambda x: -x[1])

        return JSONResponse(content={
            "keywords": sorted_keywords,
            "total_keywords": sum(resume_keywords.values())
        })

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
    
@app.post("/scrape")
def scrape_keywords(req: JobRequest):
    if req.role not in technical_keywords_dict:
        return {"error": "Invalid role selected."}

    search_params = {
        "site_name": ["indeed", "linkedin", "zip_recruiter", "google"],
        "search_term": f"{req.role} internship",
        "google_search_term": f"{req.role} internship",
        "location": req.location,
        "results_wanted": 50,
        "hours_old": 72,
        "country_indeed": "USA",
        "job_type": req.job_type,
    }

    jobs = scrape_jobs(**search_params)
    df = pd.DataFrame(jobs)

    role_keywords = technical_keywords_dict[req.role]

    def extract_keywords(desc):
        if isinstance(desc, str):
            tokens = word_tokenize(desc.lower())
            return [word for word in tokens if word in role_keywords]
        return []

    df['technical_keywords'] = df['description'].apply(extract_keywords)

    result = df[['title', 'company', 'location', 'job_url', 'technical_keywords']].fillna("").to_dict(orient="records")
    return {"data": result}

# Request model
class SkillRequest(BaseModel):
    skill: str
    context: str

# Endpoint
@app.post("/skill-advice")
def get_skill_advice(req: SkillRequest):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="Missing OpenRouter API key")

    prompt = f"""
    You are an AI mentor that helps users improve their technical skills.
    Here's some helpful background for the model:
    {req.context}

    The user wants to improve in {req.skill}. Give them a step-by-step, motivating plan to level up.
    """

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "mistralai/mistral-7b-instruct",  # or use "meta-llama/llama-3-8b-instruct"
        "messages": [
            {"role": "system", "content": "You are a helpful and encouraging AI mentor that gives users step-by-step advice on how to improve their skills."},
            {"role": "user", "content": prompt}
        ]
    }

    res = requests.post("https://openrouter.ai/api/v1/chat/completions", json=payload, headers=headers)

    if res.status_code != 200:
        raise HTTPException(status_code=res.status_code, detail=res.text)

    return {
        "advice": res.json()["choices"][0]["message"]["content"]
    }
