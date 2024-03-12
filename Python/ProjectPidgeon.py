#Imports the modules "pandas", "json" and "os".
import pandas as pd
import json

#Defines the "csv_to_json"-function that reads the csv file and converts the contents into the wanted "records"-format.
def csv_to_json(csv_file):
  df = pd.read_csv(csv_file)
  result = df.to_dict(orient='records')

  return result

csv_file = "Oppdrett.csv" #*csv file to be read is specified here*
csv_to_json_result = csv_to_json(csv_file) #Converts the csv contents into the wanted "records"-format using the "csv_to_json"-function.
json_data = json.dumps(csv_to_json_result, indent=4) #Converts the "csv_to_json_result" into JSON data with "indent=4" for a more readable result.

print(json_data) #Prints the JSON data.

#Exports the JSON data by creating a JSON file in the current directory.
with open('JSON.json','w', encoding='utf-8') as output_file:
  output_file.write(json.dumps(json_data))
  print('JSON file Generated.')