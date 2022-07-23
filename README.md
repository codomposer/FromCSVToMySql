# NodeJS Skillset Assessment

1. Implement SQL schema creation script (see schema diagram below); 
2. Implement a tool to import raw data from a root subfolder ‘data’ to a database; Advice: this script should be launched from the terminal with an input parameter specifying path to directory with necessary files.
  
![image](https://user-images.githubusercontent.com/101377478/180581904-04b36c10-b9f4-4299-8a14-461c851d8f4d.png)

## Installation

Use the package manager npm to install package.

```bash
npm install
```

## Usage

* create local MySQL database
```
  host: "localhost",
  user: "root",
  password: "",
  database: "imdb",
```

* connect to the database
* execute this command
```
  node index.js
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Note
There is required some time to execute this program because The file data is big.
