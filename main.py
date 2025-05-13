# server/main.py

from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
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
