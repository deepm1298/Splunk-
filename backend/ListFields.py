import splunklib.client as client
import splunklib.results as results
from time import sleep
import xmltodict
import requests
import json
import redis

r = redis.Redis(
  host='redis-14951.c267.us-east-1-4.ec2.cloud.redislabs.com',
  port=14951,
  password='4VS4Q2lR4frhMRr5rAoHx8QtsmPxAfiw')

# Your Splunk connection settings
service = client.connect(
    host='localhost',
    port='8089',
    username='admin',
    password='deep1298',
    owner='admin',
    app='search',
)

search_string = 'search index=_internal | fieldsummary | fields field'
payload = {"exec_mode": "normal"}
l1=[]
if service:
    print("Connection successful")
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
    for item in text_data:
        field_info = item.get('field', {}).get('value', {}).get('text')
        
        dashboard_info2 = {
            'FieldSaved': field_info,
            'index':'ListFields'
        }
       
        l2=json.dumps(dashboard_info2)
        r.hset('ListFields',field_info,l2)
        json_data=json.dumps(field_info)
        l1.append(json_data)
    json_data = json.dumps(l1)
    print(json_data)
    payload = {'searchQuery': json_data}
    url = 'http://localhost:5002/execute-search'  
    response = requests.post(url, json=payload)
    if response.status_code == 200:
        print("Request successful!")
        print(response.json())
    else:
        print("Request failed:", response.text)
