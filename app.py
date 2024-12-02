import openai
import json


openai.api_key = input("Enter your key: ")

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