# install pypdf and nltk

import sys

from pypdf import PdfReader
import pandas as pd
from collections import Counter

from keyword_extractor import extract_keywords
from keywords import technical_keywords_dict, full_keywords

if len(sys.argv) != 2:
    print(f"Correct usage: <python> {sys.argv[0]} <path-to-resume>")
    exit()

try:
    resume = PdfReader(sys.argv[1])
    text = " ".join([page.extract_text().lower() for page in resume.pages if page.extract_text()])
except Exception as e:
    print(f"Something blew up: {e}")
    print(f"Correct usage: <python> {sys.argv[0]} <path-to-resume>")
    exit() 

keywords = extract_keywords(text, full_keywords)

keyword_count = Counter(keywords)

df = pd.DataFrame(keyword_count.items(), columns=["Keywords", "Count"])

df = df.sort_values(by="Count", ascending=False)

print(df)

################################################################################################
# we should have this + a way to extract what people have specifically in their skills section #