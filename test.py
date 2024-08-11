import re
from bs4 import BeautifulSoup
#import spacy


def split_camel_case(text):
    """Splits camel case words in a string into separate words."""
    # Use regex to find camel case patterns and insert a space before each uppercase letter (except the first one)
    split_text = re.sub(r'(?<!^)(?=[A-Z])', ' ', text)
    return split_text

# Example usage
sample_text = "ThisTextIsCamelCase and thisIsAnotherExample."
split_text = split_camel_case(sample_text)
print(split_text)
