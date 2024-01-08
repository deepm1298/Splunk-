import redis

r = redis.Redis(
  host='redis-14951.c267.us-east-1-4.ec2.cloud.redislabs.com',
  port=14951,
  password='4VS4Q2lR4frhMRr5rAoHx8QtsmPxAfiw')
r.set('test_key', 'test_value')
value = r.get('test_key')

if value:
    decoded_value = value.decode()  # Decode bytes to string
    print(decoded_value)  # Output the decoded value as a string
else:
    print("Value not found")