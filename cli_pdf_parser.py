# install pypdf and nltk

from pypdf import PdfReader
import pandas as pd
from collections import Counter

from keyword_extractor import extract_keywords
from keywords import technical_keywords_dict, full_keywords

def parse_pdf(resume_path):
    try:
        resume = PdfReader(resume_path)
        text = " ".join([page.extract_text().lower() for page in resume.pages if page.extract_text()])
    except Exception as e:
        print(f"Something blew up: {e}")
        exit() 

    keywords = extract_keywords(text, full_keywords)

    keyword_count = Counter(keywords)

    return keyword_count

    ################################################################################################
    # we should have this + a way to extract what people have specifically in their skills section #