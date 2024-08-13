import os
from transformers import pipeline
#import torch.utils._pytree as _torch_pytree
from bs4 import BeautifulSoup
import spacy
import re
import unicodedata

def load_words_list(filepath):
    """Load and return a sorted list of words from the .txt file."""
    with open(filepath, 'r') as file:
        words = [line.strip().lower() for line in file]
    return words

def binary_search(word_list, word):
    """Perform binary search to check if the word is in the word_list."""
    low, high = 0, len(word_list) - 1
    while low <= high:
        mid = (low + high) // 2
        if word_list[mid] == word:
            return True
        elif word_list[mid] < word:
            low = mid + 1
        else:
            high = mid - 1
    return False

def remove_words_from_text(text, word_list):
    """Remove words from text that exist in the word_list, preserving dashes between words."""
    # Update regex to capture words with dashes
    words = re.findall(r'\b[\w-]+\b', text.lower())
    
    # Filter out words that are in the word_list
    filtered_words = [word for word in words if not binary_search(word_list, word)]
    
    # Join the filtered words back into a single string
    filtered_text = ' '.join(filtered_words)
    
    return filtered_text

def split_camel_case(text):
    """Splits camel case words in a string into separate words, without affecting dashes."""
    # Use regex to find camel case patterns and insert a space before each uppercase letter
    # Only insert space if the uppercase letter is not preceded by a dash or space
    split_text = re.sub(r'(?<=[a-z])(?=[A-Z])', ' ', text)
    return split_text

def normalize_text(text):
    #Split words if in camel case like CamelCase -> Camel Case
    text = split_camel_case(text)
    
    # Convert to lowercase
    text = text.lower()
        
    # Replace tabs with a single space
    text = text.replace('\t', ' ')

    text = text.replace(",", ' ')
    
    # Remove extra whitespace (including multiple spaces)
    text = re.sub(r'\s+', ' ', text).strip()

    #words_to_remove = load_words_list('oxford_3000.txt')
    #text = remove_words_from_text(text, words_to_remove)

    return text

with open("test.html", 'r', encoding='utf-8') as html_file:
    html_content = html_file.read()

soup = BeautifulSoup(html_content, "html.parser")
text_content = soup.get_text()
#print(text_content)
norm = normalize_text(text_content)
print(norm)

#word_list = load_words_list('oxford_3000.txt')
#cleaned_norm = remove_words_from_text(norm, word_list)

#print(cleaned_norm)

nlp = spacy.load("en_core_web_trf")
doc = nlp(norm)

names = [ent.text for ent in doc.ents if ent.label_ == "PERSON"]
print("Names found:", names)



