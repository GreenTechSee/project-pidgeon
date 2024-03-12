import pandas as pd
import json

def csv_to_json_pandas(csv_file):
  df = pd.read_csv(csv_file)
  json_data = df.to_dict(orient='records')

  return json_data

csv_file = "Oppdrett.csv"
json_data = csv_to_json_pandas(csv_file)

print(json.dumps(json_data, indent=4))
#EXPORT DATA AS JSON