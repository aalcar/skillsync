from transformers import pipeline
from sentence_transformers import SentenceTransformer, util
from keyword_extractor import extract_keywords
from pypdf import PdfReader
from collections import Counter
from nltk.tokenize import sent_tokenize
import re

from keywords import full_keywords 

# Load NER and embedding models
# ner_pipeline = pipeline("ner", model="dslim/bert-base-NER", aggregation_strategy="simple")
# embedding_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

# def extract_text_from_pdf(pdf_path):
#     try:
#         reader = PdfReader(pdf_path)
#         text = " ".join([page.extract_text() for page in reader.pages if page.extract_text()])
#         return text.lower()
#     except Exception as e:
#         print(f"Error reading PDF: {e}")
#         return ""

# def clean_entity_word(word):
#     return word[2:] if word.startswith("##") else word

# def extract_explicit_keywords(text):
#     entities = ner_pipeline(text)
#     valid_groups = {"ORG", "MISC", "LOC"}
#     stopwords = {"H", "S", "Some", "United", "in", "on", "of", "and", "the", "Co"}

#     keywords = [
#         clean_entity_word(ent["word"]) for ent in entities
#         if ent["entity_group"] in valid_groups
#     ]

#     return list(set(kw for kw in keywords if len(kw) > 2 and kw not in stopwords))

# def extract_hidden_keywords(text, threshold=0.6):
#     text_embedding = embedding_model.encode(text, convert_to_tensor=True)
#     keyword_embeddings = embedding_model.encode(full_keywords, convert_to_tensor=True)

#     cosine_scores = util.cos_sim(text_embedding, keyword_embeddings)[0]

#     return [
#         full_keywords[i] for i, score in enumerate(cosine_scores)
#         if score >= threshold
#     ]

# def combine_keywords(explicit_keywords, hidden_keywords):
#     return list(set(explicit_keywords) | set(hidden_keywords))

embedding_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2") # something

keyword_embeddings = embedding_model.encode(full_keywords, convert_to_tensor=True) # something

def extract_text_from_pdf(pdf_path): # get text
    try:
        reader = PdfReader(pdf_path)
        text = " ".join([page.extract_text() for page in reader.pages if page.extract_text()])
        return text.lower()
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return ""
    
# basically AI tries to catch matches caught from sementics
def semantic_match_keywords(text, threshold=0.5):
    matches = set()
    sentences = sent_tokenize(text)

    for sent in sentences:
        sent = re.sub(r"[^a-zA-Z0-9\s]", " ", sent)
        sent = re.sub(r"\s+", " ", sent).strip()
        if not sent:
            continue

        sent_embedding = embedding_model.encode(sent, convert_to_tensor=True)
        scores = util.cos_sim(sent_embedding, keyword_embeddings)[0]

        for i, score in enumerate(scores):
            if score.item() >= threshold:
                matches.add(full_keywords[i])

    return list(matches)

def parse_pdf(pdf_path):
    print(f"Processing resume: {pdf_path}")
    text = extract_text_from_pdf(pdf_path)
    print(text)
    if not text:
        print("No text extracted from PDF.")
        return Counter()

    string_matches = extract_keywords(text, full_keywords) # what we were doing before
    semantic_matches = semantic_match_keywords(text) # + any matches caught from AI

    all_keywords = string_matches + semantic_matches
    print(all_keywords)
    return Counter(all_keywords)
