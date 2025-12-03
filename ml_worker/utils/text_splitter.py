import spacy
nlp = spacy.load("xx_sent_ud_sm")
def split_into_sentences(text: str):
    text = text.replace("\n", " ").strip()
    doc = nlp(text)
    sentences = [sent.text.strip() for sent in doc.sents if len(sent.text.strip()) > 0]
    if len(sentences) < 2:
        import re
        sentences = re.split(r'(?<=[.?!।])\s+', text)
        sentences = [s.strip() for s in sentences if s.strip()]
    return sentences