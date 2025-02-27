# Add these code blocks if you're running it in Google colab
# ! pip install -U python-jobspy
# ! pip install nltk

import nltk
import ast
import csv
import pandas as pd
from jobspy import scrape_jobs
# our cool keyword extractor :)
from keyword_extractor import extract_keywords

# list of technical keywords
from keywords import technical_keywords_dict, full_keywords

nltk.download('punkt')

search_params = {
    #"site_name": ["indeed","linkedin", "zip_recruiter", "google"],
    "site_name": ["indeed","linkedin", "google"],
    "google_search_term": "software engineer internship",
    "location": "United States",
    "results_wanted": 100,
    "hours_old": 72,
    "country_indeed": 'USA',
    "job_type": "internship"
}


# Ask the user to choose a job role
print("Available Job Roles: ")
for role in technical_keywords_dict.keys():
    print(role)

selected_role = input("Please select a job role from the list above; or don't: ").strip()

# Update the search term with the selected role
search_params["search_term"] = f"{selected_role} internship"
search_params["google_search_term"] = f"{selected_role} internship"
    
# Scrape job data using the role user chose.
jobs = scrape_jobs(**search_params)
df = pd.DataFrame(jobs)

# using function on the description column.
if selected_role in technical_keywords_dict:
    role_keywords = technical_keywords_dict[selected_role]
else:
    print("Invalid job role selected. Using all keywords.")
    role_keywords = full_keywords

df['technical_keywords'] = df['description'].apply(lambda x: extract_keywords(x, role_keywords))

# Dictionary with job_id and technical keyword present.
job_keywords_dict = df[['id', 'technical_keywords']].set_index('id').to_dict()['technical_keywords']

# Create DataFrame from dictionary
job_keywords_df = pd.DataFrame(list(job_keywords_dict.items()), columns=['job_id', 'technical_keywords'])

# Add additional job information to the DataFrame (id, site, job_url, title, company, location, date_posted, job_type)
job_info_df = df[['id', 'site', 'job_url', 'title', 'company', 'location', 'date_posted', 'job_type', 'min_amount', 'max_amount']]

# Merge the job info with technical keywords DataFrame
final_df = pd.merge(job_info_df, job_keywords_df, left_on='id', right_on='job_id', how='left')

# Save the results to a CSV
final_df.to_csv(f'{selected_role.replace("/", "_").replace(" ", "_").lower()}_job_keywords.csv', index=False)

print(f"CSV for {selected_role} created successfully: {selected_role.replace('/', '_').replace(' ', '_').lower()}_job_keywords.csv")

print(final_df.head(30))
