import splunklib.client as client
from time import sleep
import xmltodict
import requests
import json

# Your Splunk connection settings
service = client.connect(
    host='localhost',
    port='8089',
    username='admin',
    password='deep1298',
    owner='admin',
    app='search',
)

search_string = '| rest /servicesNS/-/-/saved/searches|table title, eai:acl.app,search,disabled'
payload = {"exec_mode": "normal"}

if service:
    jobs = service.jobs.create(search_string, **payload)

    while not jobs.is_done():
        sleep(.2)

    # Get the XML results as a string
    xml_results = jobs.results()
    xml_content = b''.join(xml_results)
    xml_string = xml_content.decode('utf-8')
    parsed_dict = xmltodict.parse(xml_string)

    # Extracting the text part
    text_data = parsed_dict.get('results', {}).get('result', [])

    l1 = []  # Create a list to hold dashboard info dictionaries

    for item in text_data:
        # Extract individual fields from the XML response
        title = item.get('field', [{}])[0].get('value', {}).get('text')
        eaiaclapp = item.get('field', [{}])[1].get('value', {}).get('text')
        search= item.get('field', [{}])[2].get('value', {}).get('text')
        disabled= item.get('field', [{}])[3].get('value', {}).get('text')

        # Construct dictionary with extracted data
        dashboard_info = {
            'title': title,
            'eaiaclapp':eaiaclapp,
            'search': search,
            'disabled': disabled
        }

        l1.append(dashboard_info)

    # Convert the list of dictionaries to JSON
    json_data = json.dumps(l1)
    print(json_data)
        # POST JSON data to a specific endpoint
    url = 'http://localhost:5003/saved-search'
    headers = {'Content-Type': 'application/json'}
    try:
        response = requests.post(url, headers=headers, data=json_data)
        if response.status_code == 200:
            print("Request successful!")
            print(response.json())  # If the response is JSON
        else:
            print("Request failed:", response.text)
    except Exception as e:
        print("An exception occurred:", str(e))


