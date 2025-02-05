# pip install -U python-jobspy

import csv
import pandas as pd
from jobspy import scrape_jobs
import nltk
from nltk.tokenize import word_tokenize

# Download necessary NLTK data
nltk.download('punkt')
# Download the 'punkt_tab' data package
nltk.download('punkt_tab')

# list of technical keywords
from keywords import technical_keywords_dict

search_params = {
    "site_name": ["indeed","linkedin", "zip_recruiter", "google"],
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

selected_role = input("Please select a job role from the list above: ").strip()

# Update the search term with the selected role
if selected_role in technical_keywords_dict:
    search_params["search_term"] = f"{selected_role} internship"
    search_params["google_search_term"] = f"{selected_role} internship"
else:
    print("Invalid job role selected.")
    exit()

    
# Scrape job data using the role user chose.
jobs = scrape_jobs(**search_params)
df = pd.DataFrame(jobs)

# Function to extract technical keywords from job description
def extract_technical_keywords(description, role_keywords):
    # To check that the Job description has a string and is not empty.
    if isinstance(description, str):
        words = word_tokenize(description.lower())  # convert to lowercase
        # To take out technical keywords present in a description.
        keywords = [word for word in words if word in role_keywords]
        return keywords
    else:
        # If the description is empty returns an empty list. --> we may later change this to remove that data.
        return []

# using function on the description column.
role_keywords = technical_keywords_dict[selected_role]
df['technical_keywords'] = df['description'].apply(lambda x: extract_technical_keywords(x, role_keywords))

# Dictionary with job_id and technical keyword present.
job_keywords_dict = df[['id', 'technical_keywords']].set_index('id').to_dict()['technical_keywords']

# Create DataFrame from dictionary
job_keywords_df = pd.DataFrame(list(job_keywords_dict.items()), columns=['job_id', 'technical_keywords'])

# Add additional job information to the DataFrame (id, site, job_url, title, company, location, date_posted, job_type)
job_info_df = df[['id', 'site', 'job_url', 'title', 'company', 'location', 'date_posted', 'job_type', 'min_amount', 'max_amount']]

# Merge the job info with technical keywords DataFrame
final_df = pd.merge(job_info_df, job_keywords_df, left_on='id', right_on='job_id', how='left')

# Save the results to a CSV
final_df.to_csv(f'{selected_role.replace("/", "_")}_job_keywords.csv', index=False)

print(f"CSV for {selected_role} created successfully: {selected_role.replace('/', '_')}_job_keywords.csv")

print(final_df.head(30))
