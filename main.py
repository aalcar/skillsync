# server/main.py

from fastapi import FastAPI, Form, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pdf_parser import parse_pdf
from pydantic import BaseModel
import pandas as pd
from jobspy import scrape_jobs
from nltk.tokenize import word_tokenize
import nltk
from keywords import technical_keywords_dict

nltk.download('punkt')

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
