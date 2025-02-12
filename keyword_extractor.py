import nltk
from nltk.tokenize import word_tokenize

def extract_keywords(string, keyword_list):
    # Check if it's empty.
    if isinstance(string, str):
        # Get words (in token form)
        words = word_tokenize(string.lower())

        # Get possible bigrams
        bigram_sets = list(nltk.bigrams(words))
        bigram_strings = [' '.join(bigram) for bigram in bigram_sets]

        # Take out technical keywords present in a description.
        found_keywords = [word for word in words if word in keyword_list]
        found_bigrams = [bigram for bigram in bigram_strings if bigram in keyword_list]

        return list(set(found_bigrams + found_keywords))
    else:
        # If the description is empty returns an empty list. --> we may later change this to remove that data.
        return []