import splunklib.client as client
from time import sleep
import xmltodict
import requests
import json
from collections import OrderedDict

# Your Splunk connection settings
service = client.connect(
    host='localhost',
    port='8089',
    username='admin',
    password='deep1298',
    owner='admin',
    app='search',
)

search_string = '| rest /services/apps/local | search disabled=0 | table label title version description'
payload = {"exec_mode": "normal"}
l1=[]
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

    result_dict = {}

    for item in text_data :
        offset = item['@offset']
        fields = item['field']
        parsed_data = {}
        
        for field in fields:
            field_name = field['@k']
            field_value = field['value']['text']
            parsed_data[field_name] = field_value

        result_dict[offset] = parsed_data


    for i,j in result_dict.items():
        if len(j)==4:
            dashboard_info = {
                'label': j['label'],
                'title':j['title'],
                'version':j['version'],
                'description':j['description']

            }
        l1.append(dashboard_info)
    json_data = json.dumps(l1)
    url = 'http://localhost:5003/apps'
    headers = {'Content-Type': 'application/json'}
    print(json_data)
    try:
        response = requests.post(url, headers=headers, data=json_data)
        if response.status_code == 200:
            print("Request successful!")
            print(response.json())  # If the response is JSON
        else:
            print("Request failed:", response.text)
    except Exception as e:
        print("An exception occurred:", str(e))



  
 
