# Given a .csv file with most recent job skills for a given role AND a list of extracted keywords from a resume:
# Calculate the percentage of skills 


import pandas as pd
from cli_pdf_parser import parse_pdf
from scrape_job_keywords_func import scrape_and_save
import ast
from collections import Counter

def count_skills(skills):
    total = 0
    for amount in skills.values():
        total += amount
    return total

def compute_percentage(wanted_skills, resume_skills, total_wanted_skills):
    percentage = 0
    for pair in wanted_skills.items():
        if pair[0] in resume_skills:
            percentage += (pair[1] / total_wanted_skills)
    return percentage

# Get file path for our full_keywords_data.
job_keyword_data_filepath = scrape_and_save()

df = pd.read_csv(job_keyword_data_filepath)

# csv file stores everything as strings so I'm using ast.literal_eval to change the keywords section back into a list.
df["technical_keywords"] = df["technical_keywords"].apply(ast.literal_eval)

# Count how many times keywords are used a job description. Should only include mentions of keyword once from each respective job description.
 # Using a set here because we don't want to iterate through duplicate keywords in a single job description. (open to changes later)
full_keywords = [keyword for keyword_list in df["technical_keywords"] for keyword in set(keyword_list)]

# count occurences and total skill count
wanted_skills_dict = Counter(full_keywords)
total_num_skills = count_skills(wanted_skills_dict)

# get a similar dictionary for resume keywords
resume_skills_dict = parse_pdf("jakes-resume.pdf")

# compute skill percentage as a decimal
skill_percentange = compute_percentage(wanted_skills_dict, resume_skills_dict, total_num_skills)

print(f'You are {(skill_percentange * 100):.2f}% goated!')