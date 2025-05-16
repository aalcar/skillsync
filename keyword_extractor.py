# keyword_extractor.py

import nltk
from nltk.tokenize import word_tokenize

def extract_keywords(string, keyword_list):
    if isinstance(string, str):
        words = word_tokenize(string.lower())
        bigrams = list(nltk.bigrams(words))
        bigram_strings = [' '.join(bigram) for bigram in bigrams]

        found_keywords = [word for word in words if word in keyword_list]
        found_bigrams = [bigram for bigram in bigram_strings if bigram in keyword_list]

        return found_bigrams + found_keywords
    else:
        return []
