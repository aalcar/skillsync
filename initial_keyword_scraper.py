#####################################
# this was the first scraper we had #
#####################################
import csv
import pandas as pd
from jobspy import scrape_jobs

# file with list of keywords i wanted to look for
from keywords import search_words

# Set parameters for the search. This is for SWE internships. 
# I hate glassdoor so I omitted it as a site.
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
# Yoink the jobs and put them in a dictionary.
jobs = scrape_jobs(**search_params)

# Make it pretty.
df = pd.DataFrame(jobs)

# Yoink only the descriptions.
descriptions = df["description"]

lower_descriptions_list = []
for description in descriptions:
    lower_descriptions_list.append(str(description).lower())

# New descriptions list all in lowercase.
descriptions = pd.Series(lower_descriptions_list, name="description")


# Create a dictionary for the search words.
found_words = {}
for word in search_words:
    found_words[word] = 0

# Split each description into words.
for description in descriptions:
    words = description.split(" ")
# Count them.
    for word in words:
        if word in search_words:
            found_words[word] += 1

# Make new lists to make a data frame. (idk if this is necessary but i just learned how to use pandas today)
words = []
count = []
percents = []
for key, value in found_words.items():
    words.append(key)
    count.append(value)
    percents.append(f"{((value / len(jobs)) * 100):.2f}%")

# Make data frame
found_df = pd.DataFrame(
    {
        "Keywords": words,
        "Count": count,
        "Percentage": percents
    }
)
# Sort so that most common keyword is at the top
sorted_df = found_df.sort_values(by='Count', ascending=False)
# Print datafram and amt of jobs found, not useful but i was working on my terminal for this so it helped
print(sorted_df)
print(f"We found {len(jobs)} jobs!!")

# Save as a a csv file
sorted_df.to_csv("found_words.csv", quoting=csv.QUOTE_NONNUMERIC, escapechar="\\", index=False)
