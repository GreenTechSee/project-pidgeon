import pandas as pd
import json

def excel_to_json_pandas(excel_file, sheet_name="Sheet1"):
  df = pd.read_excel(excel_file, sheet_name=sheet_name)
  json_data = df.to_dict(orient='records')

  return json_data

excel_file = "your_excel_file.xlsx"
json_data = excel_to_json_pandas(excel_file)

# Print the JSON data
print(json.dumps(json_data, indent=4))