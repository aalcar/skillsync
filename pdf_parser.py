# Install required libraries
!pip install nltk
!pip install pypdf

import nltk
import pandas as pd
import sys
from collections import Counter
from pypdf import PdfReader
from keyword_extractor import extract_keywords
from keywords import full_keywords
from google.colab import files

nltk.download('punkt')

# Upload PDF in Google Colab
uploaded = files.upload()  # User uploads a file
file_path = list(uploaded.keys())[0]  # Get the uploaded filename

try:
    # Read all pages of the PDF
    pdf_reader = PdfReader(file_path)
    text = " ".join([page.extract_text().lower() for page in pdf_reader.pages if page.extract_text()])
except Exception as e:
    print(f"An error occurred: {e}")  # Catch errors
    sys.exit()

# Extract keywords
keywords = extract_keywords(text, full_keywords)

# Count occurrences of keywords
keyword_count = Counter(keywords)

# Convert to DataFrame
df = pd.DataFrame(keyword_count.items(), columns=["Keywords", "Count"])
df = df.sort_values(by="Count", ascending=False)

# Display results
print(df)

################################################################################################
# we should have this + a way to extract what people have specifically in their skills section #
