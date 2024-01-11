import requests
import json
import redis
import sys

# Accessing command-line arguments
arguments = sys.argv[1]

ks=arguments
l1=[]
r = redis.StrictRedis(
  host='redis-14951.c267.us-east-1-4.ec2.cloud.redislabs.com',
  port=14951,
  password='4VS4Q2lR4frhMRr5rAoHx8QtsmPxAfiw')

fields = r.hgetall("ListFields")
fields2=r.hgetall("ListApps")
fields3=r.hgetall("Dashboard")
fields4=r.hgetall("ListSavedSearches")

# Define the word you want to search for within field names
search_word =ks

# Filter field names containing the search word
filtered_fields = {key.decode(): value.decode() for key, value in fields.items() if search_word in key.decode()}


for key, value in filtered_fields.items():
    l1.append(value)
    
filtered_fields = {key.decode(): value.decode() for key, value in fields2.items() if search_word in key.decode()}


for key, value in filtered_fields.items():
    l1.append(value)

filtered_fields = {key.decode(): value.decode() for key, value in fields3.items() if search_word in key.decode()}


for key, value in filtered_fields.items():
    l1.append(value)
  
filtered_fields = {key.decode(): value.decode() for key, value in fields4.items() if search_word in key.decode()}


for key, value in filtered_fields.items():
    l1.append(value)
    
json_data = json.dumps(l1)
cleaned_string = json_data.replace('\\"','') 
cleaned_string2 = cleaned_string.replace('\"','') 


l1=[]
sk=""
for i in cleaned_string2:
    if i.isalpha()==True:
        sk+=i
    elif i ==":":
        l1.append(sk+i)
        sk=""
    elif i==",":
        l1.append(sk)
        if len(sk)>2:
            po=len(sk)-2
            if sk[po]==":":
                continue
            else:
                l1.append("nsotest")
        sk=""
         
    elif i=="}":
        l1.append(sk)
        sk=""
        l1.append("ohyes")  
l1.append(sk)     
json_data=l1
payload = {'searchQuery': json_data}
url = 'http://localhost:5003/search'  
response = requests.post(url, json=payload)
if response.status_code == 200:  
    print(response.json())
else:
    print("Request failed:", response.text)
  
   