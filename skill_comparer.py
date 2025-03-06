# Given a .csv file with most recent job skills for a given role AND a list of extracted keywords from a resume:
# Calculate the percentage of skills 


import pandas as pd
from cli_pdf_parser import parse_pdf
from scrape_job_keywords_func import scrape_and_save
import ast
from collections import Counter

def count_skills(skills):
    return sum(skills.values())

def compute_percentage(wanted_skills, resume_skills, total_wanted_skills):
    percentage = sum((wanted_skills.get(skill, 0) / total_wanted_skills) for skill in resume_skills)
    return round(percentage * 100, 2)  # Convert to percentage

# Get file path for our full_keywords_data.
job_keyword_data_filepath = scrape_and_save()

df = pd.read_csv(job_keyword_data_filepath)

# Convert stored keyword strings into lists
df["technical_keywords"] = df["technical_keywords"].apply(ast.literal_eval)

# Get a dictionary of resume skills
resume_skills_dict = parse_pdf("Resume-Sample-1-Software-Engineer.pdf")

# Compute match percentage for every job listing
match_percentages = []

for _, row in df.iterrows():
    job_skills = Counter(set(row["technical_keywords"]))  # Unique skill count per job
    total_job_skills = count_skills(job_skills)
    
    if total_job_skills > 0:
        percentage = compute_percentage(job_skills, resume_skills_dict, total_job_skills)
    else:
        percentage = 0  # No skills listed in job

    match_percentages.append(percentage)

# Add percentages to DataFrame
df["match_percentage"] = match_percentages

# Print results
print(df[["title", "company", "match_percentage"]])

# Save results to a new CSV (optional)
df.to_csv("job_match_results.csv", index=False)

print("Job match percentages saved to 'job_match_results.csv'.")
