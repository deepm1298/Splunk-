import splunklib.client as client
from time import sleep
import xmltodict
import requests
import re
import json
from collections import OrderedDict
service = client.connect(
    host='localhost',
    port='8089',
    username='admin',
    password='deep1298',
    owner='admin',
    app='search',
)
l2={}
l1={
    'Apps':"| rest /services/apps/local | search visible=1 |stats count",
    'Dashboard':'| rest /servicesNS/-/-/data/ui/views |search isDashboard=1|stats count',
    'Reports':'| rest /servicesNS/-/-/saved/searches| search disabled=0| stats count',
    'Saved Searches':'|rest /servicesNS/-/-/saved/searches| stats count',
    'Lookups':'| rest /servicesNS/-/-/data/props/extractions| search is_lookup=1| stats count',
    'KV Store':'| rest /servicesNS/-/-/data/lookup-table-files| search type=kvstore| stats count',
    'CSV_Store':'| rest /servicesNS/-/-/data/lookup-table-files| search type=file| stats count',
    'Indexes':'| rest /services/data/indexes| stats count',
    'Metrics':'| rest /services/data/indexes/_introspection| search title="*metrics*"| stats count',
    'Host count':'| metadata type=hosts index=_*| stats count as HostCount',
    'Index Count':'| rest /services/data/indexes| stats count',
    'Metrics ':'| rest /services/data/indexes/_introspection| search title="*metrics*"| stats count',
    "Total Events":"| eventcount  index=_*",
    
    }
payload = {"exec_mode": "normal"}
for i,j in l1.items():
    jobs = service.jobs.create(j, **payload)
    while not jobs.is_done():
        sleep(.2)
    xml_results=jobs.results()
    xml_content=b''.join(xml_results)
    xml_string=xml_content.decode('utf-8')
    parsed_dict = xmltodict.parse(xml_string)

    text_data = parsed_dict.get('results', {}).get('result', [])
    value = text_data['field']['value']['text']
    l2[i]=value
json_data = json.dumps(l2)
print(json_data)
url = 'http://localhost:5006/overview'  
response = requests.post(url, json=payload)
if response.status_code == 200:
    print(response.json())  # If the response is JSON
else:
    print("Request failed:", response.text)
	