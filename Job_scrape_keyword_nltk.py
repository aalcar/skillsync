# pip install -U python-jobspy

import csv
import pandas as pd
from jobspy import scrape_jobs

search_params = {
    "site_name": ["indeed","linkedin", "zip_recruiter", "google"],
    "search_term": "software engineer internship",
    "google_search_term": "software engineer internship",
    "location": "United States",
    "results_wanted": 100,
    "hours_old": 72,
    "country_indeed": 'USA',
    "job_type": "internship"
}

jobs = scrape_jobs(**search_params)

df = pd.DataFrame(jobs)

# Seperate keywords for different roles
#   1.  Check roles data available in dataset.
#   2.  make a list for each role's technical words.
# Allow to choose the role and then make a csv of keywords of only that role with its keywords and job id.

import nltk

nltk.download('punkt_tab')
from nltk.tokenize import word_tokenize

# list of technical keywords (Expand and seperate for different roles)
technical_keywords = ['python', 'java', 'algorithm', 'data', 'machine learning', 
                      'software', 'developer', 'programming', 'cloud', 'api', 'sql', 
                      'javascript', 'c++', 'react', 'django', 'node.js', 'git']

# Extractiong technical keywords from job description.
def extract_technical_keywords(description):
    # To check that the Job description has a string and is not empty.
    if isinstance(description, str):
        words = word_tokenize(description.lower())  # lowercase for match
        # To take out technical keywords present in a description.
        keywords = [word for word in words if word in technical_keywords]
        return keywords
    else:
        # If the description is empty returns an empty list. --> we may later change this to remove that data.
        return []

# using function on the description column.
df['technical_keywords'] = df['description'].apply(extract_technical_keywords)

# Dictionary with job_id and technical keyword present.
job_keywords_dict = df[['id', 'technical_keywords']].set_index('id').to_dict()['technical_keywords']


# Edit csv to have other columns too like (id	site,	job_url,title,company,location,date_posted,job_type,Keywords from description, min_amount,max_amount)


# Converting dictionary to DataFrame.
job_keywords_df = pd.DataFrame(list(job_keywords_dict.items()), columns=['job_id', 'technical_keywords'])

# CSV File.
job_keywords_df.to_csv('job_keywords.csv', index=False)

# displaying to check
print(job_keywords_df.head(30))

#This would be the final csv to compare with resume.