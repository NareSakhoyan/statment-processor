# Statements Validator

## Description

Statements Validator is a tool for validating CSV or XML files. It ensures that fields such as references are unique, and end balances are correctly calculated. The tool provides a user-friendly interface for uploading files and obtaining a JSON format of the validated data.

## Technologies Used

### Frontend
- **Vue.js**: A progressive JavaScript framework for building user interfaces.
- **Vuetify**: A Material Design component framework for Vue.js.
  
### Backend
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A fast, unopinionated, minimalist web framework for Node.js.
- **Multer**: A middleware for handling file uploads.
- **Papaparse**: A powerful CSV parsing library for JavaScript.
- **xml2js**: A simple XML to JavaScript object converter.

## Getting Started

To run the application locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NareSakhoyan/statment-processor.git

2. **Go to the directory:**
   ```bash
   cd statment-processor

3. **Install dependencies:**
   ```bash
   npm install

4. **Start the application:**
   ```bash
   npm start

5. **Access the application:**
   - For the front-end, open your browser and navigate to http://localhost:8080.
   - For the back-end, use Postman or another API platform with the API URL http://localhost:3000.

## Usage

### Frontend

- **Upload File:**
  Browse [http://localhost:8080](http://localhost:8080) and attach the files for validation.

- **View Results:**
  A table will appear with the data, marking the invalid fields in red.

### Backend

- **Upload File:**
  Use the `/upload` endpoint with the HTTP POST method. Add the files in form-data with the property name `files`.

- **View Results:**
  The application will return the validated data in JSON format. Invalid objects will have an additional "invalid" property containing the names of the invalid fields.

## Solution Overview
The solution utilizes Node.js and Express to create a server with a single /upload endpoint. The endpoint uses Multer for file handling, and the files are parsed using Papaparse for CSV and xml2js for XML. The data is then formatted uniformly, and validation checks are performed, including uniqueness of references and correct end balances.