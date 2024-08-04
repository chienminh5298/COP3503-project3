import re

def capitalize_within_quotes(text):
    # Define a function to capitalize words within a quoted string
    def capitalize_words(quoted_string):
        return ' '.join(word.capitalize() for word in quoted_string.split())

    # Use regex to find quoted strings and apply the capitalization function
    modified_text = re.sub(r'(["\'])(.*?)\1', lambda match: match.group(1) + capitalize_words(match.group(2)) + match.group(1), text)
    return modified_text

def process_file(file_path):
    # Read the content of the file
    with open(file_path, 'r') as file:
        content = file.read()

    # Modify the content
    modified_content = capitalize_within_quotes(content)

    # Write the modified content back to the file
    with open(file_path, 'w') as file:
        file.write(modified_content)


if __name__ == "__main__":
    # Replace 'yourfile.txt' with the path to your file
    file_path = 'src/components/words.js'
    process_file(file_path)
    print(f"Processed file: {file_path}")
