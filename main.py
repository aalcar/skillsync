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
    skills: str
    keywordsFromJob: str

@app.post("/skill-recommendations")
def get_skill_advice(req: SkillRequest):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="Missing OpenRouter API key")

    prompt = f"""
    You are an AI mentor that helps users improve their technical skills.
    Here are the skills currently listed on the person's resume:
    {req.skills}
    Here are the most commonly used keywords in recent job postings:
    {req.keywordsFromJob}

    The user wants to learn the most up-to-date, valuable skills in today's job market. Give them a highly specific, step-by-step, motivating plan to level up.

    Please follow this strict format for your response:

    Start with a brief 1-2 sentence motivational intro paragraph.

    Then list your recommendations in the following exact format:

    1. **[Title of the Recommendation]**: [Short explanation]
    - [Resource Name] - [Brief description] ([link])
    - [Resource Name] - [Brief description] ([link])
    - Project idea: [Short practice project idea] ← optional

    Repeat this numbered pattern for each skill or topic.

    Your advice should refer to tangible things that the user can leverage and look into as soon as possible, this includes:
    Programming Language Tutorials (C++, Java, Python, etc.)
    Develop For Good, Coding It Forward, Parker Dewey, MLH Fellowship (Experience building opportunities)
    Management Leadership for Tomorrow, Code2040, ColorStack, Headstart Fellowship (Mentorship programs, ONLY MENTION THESE IF THE USER SEEMS TO BE A BEGINNER)
   
    ONLY CHOOSE A FEW OF THESE RESOURCES AS THEY RELATE TO THE SKILLS INCLUDED ON THE CANDIDATES RESUME AND RECENT JOB DESCRIPTIONS

    General Programming & CS Foundations

    CS50 (Harvard) - Legendary intro to computer science (cs50.harvard.edu)

    The Odin Project - Free full-stack curriculum (theodinproject.com)

    Exercism - Practice programming with mentorship (exercism.org)

    GeeksforGeeks - CS concepts + coding practice (geeksforgeeks.org)

    Cracking the Coding Interview (book) - DSA prep standard

    Software Development / Full Stack / Web

    Frontend Mentor - Realistic frontend practice (frontendmentor.io)

    FreeCodeCamp - Everything from HTML to APIs (freecodecamp.org)

    JavaScript.info - Modern JS deep dive (javascript.info)

    Fullstack Open - Comprehensive React/Node.js course (fullstackopen.com)

    MDN Web Docs - Best docs for JS/HTML/CSS (developer.mozilla.org)

    Data Science / Machine Learning / AI

    Kaggle Learn - Short, interactive ML courses (kaggle.com/learn)

    Fast.ai - Deep learning for coders (course.fast.ai)

    StatQuest with Josh Starmer - Stats/ML explained visually (YouTube)

    Google Machine Learning Crash Course (developers.google.com/machine-learning)

    Pandas/NumPy Docs - Learn from the real thing

    DevOps / Cloud / Systems / Networking

    Linux Journey - Learn Linux for real (linuxjourney.com)

    Roadmap.sh: DevOps & Backend paths (roadmap.sh)

    AWS Skill Builder - Free AWS fundamentals (explore.skillbuilder.aws)

    Codecademy Bash Course - Scripting intro (codecademy.com)

    GCP / Azure Fundamentals (Microsoft/Google) - Free cert prep

    Cybersecurity

    OverTheWire - Linux hacking games (overthewire.org)

    Hack The Box (Beginner Labs) - Practical offensive security (hackthebox.com)

    Blue Team Labs Online - Defensive sec labs (blueteamlabs.online)

    Cybrary - Cybersecurity courses (cybrary.it)

    OWASP Juice Shop - Learn app security via hacking (owasp.org)

    Mobile & App Dev

    Flutter.dev Docs - Google's official docs (flutter.dev)

    RayWenderlich.com - iOS & Android tutorials (raywenderlich.com)

    React Native Docs (reactnative.dev)

    Kotlinlang.org - Kotlin for Android (kotlinlang.org)

    Software Testing & QA

    Test Automation University - Free QA/automation platform (testautomationu.applitools.com)

    Selenium.dev - Web testing framework

    Cypress.io - JS end-to-end testing

    Tools & Workflows

    Git Immersion - Learn Git through practice (gitimmersion.com)

    Learn Git Branching - Interactive Git sim (learngitbranching.js.org)

    DevDocs.io - Unified dev docs (devdocs.io)

    UX/UI Design

    Figma University (YouTube) - Figma basics & workflows

    Refactoring UI (book/site) - Great UI design advice for devs

    UX Design.cc - Articles, case studies, best practices (uxdesign.cc)

    Product / PM / Business

    Reforge Articles - Product strategy deep dives (reforge.com)

    A/B Testing for Beginners (Google's guide)

    Mind the Product Blog (mindtheproduct.com)

    ONLY CHOOSE A FEW OF THESE RESOURCES AS THEY RELATE TO THE SKILLS INCLUDED ON THE CANDIDATES RESUME AND RECENT JOB DESCRIPTIONS

    DO NOT wrap the output in markdown code blocks. DO NOT skip numbers. Each title MUST be bold using double asterisks (e.g. **Learn Python**).
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
        "recommendations": res.json()["choices"][0]["message"]["content"]
    }
