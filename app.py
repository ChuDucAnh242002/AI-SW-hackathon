import openai
import json

openai.api_key = "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"

# Load your JSON data
def load_json_file(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)
    

# Example function to analyze the JSON data using OpenAI API
def analyze_data_with_openai(data):
    # Convert the data into a string format that OpenAI can understand
    data_str = json.dumps(data, indent=4)  

    # Create a prompt for OpenAI
    prompt = f"Please analyze the following data:\n{data_str}\n\nProvide a summary and key insights."

    # Send the prompt to OpenAI (using ChatCompletion API for conversation-like interaction)
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",  
        messages=[
            {"role": "system", "content": "You are a data analysis assistant."},
            {"role": "user", "content": prompt}
        ]
    )
    
    # Extract the generated response
    return response['choices'][0]['message']['content'].strip()



# Load your JSON data file (adjust the path as needed)
json_file_path = '3_OpenDroneMap/images.json'
data = load_json_file(json_file_path)

# Analyze the data
analysis = analyze_data_with_openai(data)

# Print the result
print(analysis)