
from openai import OpenAI
with open("key.txt", 'r') as file:
    key = file.read()

def getResponseOpenAI():
    client = OpenAI(
        api_key=key
    )

    json_str = read_json_as_string("../3_OpenDroneMap/odm_georeferencing/odm_georeferenced_model.boundary.json")
    # print(json_str)
    text_str = "Is this one contain of soil sample laboratory result " + json_str 
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

    print(chat_completion.choices[0].message.content)

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
    
getResponseOpenAI()