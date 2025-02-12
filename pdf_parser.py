from pypdf import PdfReader
import pandas as pd
import sys
from keyword_extractor import extract_keywords
from keywords import technical_keywords_dict, full_keywords

if len(sys.argv) != 2:
    print(f"Correct usage: <python> {sys.argv[0]} <path-to-resume>")
    exit()

try:
    # If your resume isn't one page, you're cooked anyways
    resume = PdfReader(sys.argv[1]).pages[0]
except FileNotFoundError:
    print(f"Correct usage: <python> {sys.argv[0]} <path-to-resume>")
    exit() 

# how is this a method man; this is goated
text = resume.extract_text().lower()

keywords = extract_keywords(text, full_keywords)

keyword_count = {}
for keyword in keywords:
    if keyword in keyword_count:
        keyword_count[keyword] += 1
    else:
        keyword_count[keyword] = 1

df = pd.DataFrame({
    "Keywords": [keyword for keyword in keyword_count],
    "Count": [count for count in keyword_count.values()]
    })

df = df.sort_values(by="Count", ascending=False)

print(df)

################################################################################################
# we should have this + a way to extract what people have specifically in their skills section #