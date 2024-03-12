#Imports the modules "pandas", "json" and "os".
import pandas as pd
import json
import os

#Defines function that reads the csv file and creates a JSON file.
def csv_to_json_pandas(csv_file):
  df = pd.read_csv(csv_file)
  json_data = df.to_dict(orient='records')

  return json_data

csv_file = "Oppdrett.csv"
json_data = csv_to_json_pandas(csv_file)

print(json.dumps(json_data, indent=4))

with open('JSON.json','w', encoding='utf-8') as output_file:
  output_file.write(json.dumps(json_data, indent=4))
  print('JSON file Generated.')