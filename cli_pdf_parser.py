from transformers import pipeline
from sentence_transformers import SentenceTransformer, util
from pypdf import PdfReader
from collections import Counter

from keywords import full_keywords  # Your keyword list

# Load NER and embedding models
ner_pipeline = pipeline("ner", model="dslim/bert-base-NER", aggregation_strategy="simple")
embedding_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

def extract_text_from_pdf(pdf_path):
    try:
        reader = PdfReader(pdf_path)
        text = " ".join([page.extract_text() for page in reader.pages if page.extract_text()])
        return text.lower()
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return ""

def clean_entity_word(word):
    return word[2:] if word.startswith("##") else word

def extract_explicit_keywords(text):
    entities = ner_pipeline(text)
    valid_groups = {"ORG", "MISC", "LOC"}
    stopwords = {"H", "S", "Some", "United", "in", "on", "of", "and", "the", "Co"}

    keywords = [
        clean_entity_word(ent["word"]) for ent in entities
        if ent["entity_group"] in valid_groups
    ]

    return list(set(kw for kw in keywords if len(kw) > 2 and kw not in stopwords))

def extract_hidden_keywords(text, threshold=0.6):
    text_embedding = embedding_model.encode(text, convert_to_tensor=True)
    keyword_embeddings = embedding_model.encode(full_keywords, convert_to_tensor=True)

    cosine_scores = util.cos_sim(text_embedding, keyword_embeddings)[0]

    return [
        full_keywords[i] for i, score in enumerate(cosine_scores)
        if score >= threshold
    ]

def combine_keywords(explicit_keywords, hidden_keywords):
    return list(set(explicit_keywords) | set(hidden_keywords))

def parse_pdf(pdf_path):
    print(f"Processing resume: {pdf_path}")
    text = extract_text_from_pdf(pdf_path)
    if not text:
        print("⚠️ No text extracted from PDF.")
        return Counter()

    explicit_keywords = extract_explicit_keywords(text)
    hidden_keywords = extract_hidden_keywords(text)
    combined_keywords = combine_keywords(explicit_keywords, hidden_keywords)

    # Print details for debugging or CLI inspection
    print("\n Explicit keywords found:")
    print(explicit_keywords)
    print("\n Hidden keywords (semantic match):")
    print(hidden_keywords)
    print("\n All combined keywords:")
    print(combined_keywords)

    return Counter(combined_keywords)

# CLI usage
if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python cli_pdf_parser.py <resume_pdf_path>")
    else:
        parse_pdf(sys.argv[1])
