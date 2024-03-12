import pandas as pd
import json

#Function that converts the CSV data into JSON.
def csv_to_json(csv_file):
    #Reads the CSV file into a DataFrame.
    df = pd.read_csv(csv_file)

    #Extracts the dates from the 'Timestamp' column and formats them as YYYY-MM-DD.
    dates = pd.to_datetime(df['Timestamp']).dt.strftime('%Y-%m-%d')

    #Groups the data by date and converts each group to lists of dictionaries.
    data_by_date = df.groupby(dates).apply(lambda x: x.to_dict('records')).tolist()

    #Creates a new dictionary "organized_data" to organize the data by day.
    organized_data = {}
    #Iterates over each group of data and assigns it to a key representing the day, e.g., "Day1", "Day2", etc.
    for i, date_data in enumerate(data_by_date):
        #Assign each group of data to a key like "Day1", "Day2", etc.
        day_key = f"Day{i+1}" #Defines the key representing the day.
        organized_data[day_key] = date_data #Assigns the data to the day key.
    
    return organized_data  #Returns the JSON data organized by day.

csv_file = "Steamanlegg_elkjel2.csv" #*Specify the CSV file to be read here*.
filename, extension = csv_file.split(".") #Splits "csv_file" into filename and extension (before and after ".").

#Uses the "csv_to_json"-function to converts the CSV data to JSON.
json_data = csv_to_json(csv_file)

#Exports the JSON data by creating a JSON file in the current directory.
with open(f'{filename}.json', 'w', encoding='utf-8') as output_file:
    output_file.write(json.dumps(json_data, indent=4))