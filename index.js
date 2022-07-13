const fs = require("fs");
const mysql = require("mysql");
const fastcsv = require("fast-csv");
const path = require("path");

// create a new connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "imdb",
});

connection.connect(async (error) => {
  if (error) {
    console.log(error);
    return;
  }
  const files = fs.readdirSync(path.resolve(__dirname, "imdb_ijs"));
  console.log(files);
  for (const file of files) {
    await new Promise((res, rej) => {
      let temp = file.replace("imdb_ijs_", "");
      let tablename = temp.replace(".csv", "");
      if (!file.endsWith(".csv")) {
        return rej(0);
      }
      console.log(file);
      let stream = fs.createReadStream(`./imdb_ijs/${file}`);
      let csvData = [];
      let csvStream = fastcsv
        .parse()
        .on("data", (data) => {
          csvData.push(data);
        })
        .on("end", async () => {
          const header = csvData[0];
          if (tablename == "directors" || tablename == "actors") {
            header.shift();
          }
          csvData.shift();
          let i = 1;
          for (let row of csvData) {
            console.log(header)
            if (tablename == "directors" || tablename == "actors") {
              row.shift();
            }
            
            let query = `INSERT INTO ${tablename} (${header}) VALUES (?)`;
            await new Promise((resolve, reject) => {
              connection.query(query, [row], (error, response) => {
                if (error) {
                  return reject(error);
                }
                return resolve(response);
              });
            });
            console.log(i++, row);
          }
        });

      stream.pipe(csvStream);
    });
  }
  connection.end();
});