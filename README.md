# Project Pidgeon

This project consists of two parts:

## Frontend

The frontend visualizes how implementing new battery technology can minimize power peaks. It is built using Angular and PrimeNG and allows users to:

- Upload CSV files containing power data.
- Visualize the power data in various ways, including:
  - Line charts
  - Bar charts
  - Pie charts
- Simulate the impact of implementing new battery technology on the power peaks.

## Python Script

The Python script converts and sorts the CSV data files containing power data for a set time period to readable JSON files. Data is sorted by day.

## Getting Started

To get started with this project, you will need to:

1. Install Node.js and Angular CLI.
2. Clone this repository.
3. Run `npm install` to install the project's dependencies.
4. Run `ng serve` to start the frontend.
5. Run `python convert_csv_to_json.py input.csv output.json` to convert your CSV files to JSON files.
6. Open `output.json` in the frontend to visualize the power data.

## Contributing

Contributions to this project are welcome! Please read the contributing guidelines before submitting a pull request.

## License

This project is licensed under the MIT License.
