import json
from openai import OpenAI

with open("key.txt", 'r') as file:
    key = file.read()

def getResponseOpenAI():
    client = OpenAI(
        api_key=key
    )

    json_str = read_json_as_string("3_OpenDroneMap/odm_georeferencing/odm_georeferenced_model.boundary.json")
    # print(json_str)
    text_str = "Find these metadata (contributor, coverage, creator, date, description, format, identifier, language, publisher, relation, rights, source, subject, title, type) in this json and response in json, if the element data is missing, then fill it randomly: " + json_str 
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": text_str
                    }
                ],
            }
        ],
        model="gpt-4o-mini",
    )

    # Get the generated response
    generated_response = chat_completion.choices[0].message.content

    print(generated_response)

    # Save the response to a JSON file
    save_to_json(generated_response, "odm_georeferenced_model_boundary.json")

def read_json_as_string(json_file):
    """
    Reads the contents of a JSON file as a string.

    Args:
        json_file (str): Path to the JSON file.

    Returns:
        str: The contents of the JSON file as a string.
    """
    try:
        # Open the file and read its content
        with open(json_file, 'r') as file:
            json_string = file.read()

        return json_string
    except Exception as e:
        print(f"Error reading JSON file: {e}")
        return None
    
def save_to_json(data, file_path):
    """
    Saves the generated data to a JSON file.

    Args:
        data (str): The data to save.
        file_path (str): The path to the file where data should be saved.

    Returns:
        bool: True if data was saved successfully, False if an error occurred.
    """
    try:
        # If the data is in string format and it's a valid JSON string, try to parse it into JSON
        if isinstance(data, str):
            data = json.loads(data)
        
        # Write the parsed data to the specified JSON file
        with open(file_path, 'w') as file:
            json.dump(data, file, indent=4)
        
        print(f"Data saved successfully to {file_path}")
        return True

    except Exception as e:
        print(f"Error saving data to JSON file: {e}")
        return False
    
getResponseOpenAI()