import os
from transformers import pipeline
#import torch.utils._pytree as _torch_pytree
from bs4 import BeautifulSoup

with open("test.html", 'r', encoding='utf-8') as html_file:
    html_content = html_file.read()

soup = BeautifulSoup(html_content, "html.parser")
text_content = soup.get_text()
#print(text_content)
#print(html_content)
#ner = pipeline("ner",grouped_entities=True)
#print(ner)
#results = ner(text_content)

# Extract and print names
#nlp = spacy.load("en_core_web_sm")

#doc = nlp(text_content)
#print(doc)

#names = [ent.text for ent in doc.ents if ent.label_ == "PERSON"]
#names = [entity['word'] for entity in results if entity['entity_group'] == 'PER']
#print("Found names:", names)