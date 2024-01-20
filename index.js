const fs = require("fs");
const csv = require("csv-parser");
const results = [];

// Function to delete a file if it exists
const deleteIfExists = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

// Delete files (canada.txt and usa.txt)
deleteIfExists("canada.txt");
deleteIfExists("usa.txt");

// Function to write data to file
const writeDataToFile = (data, filename) => {
  let fileContent = "country,year,population\n";
  data.forEach((row) => {
    fileContent += `${row.country},${row.year},${row.population}\n`;
  });
  fs.writeFileSync(filename, fileContent);
};

// Read the CSV file and then filter data for "Canada" and "United States"
fs.createReadStream("input_countries.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    // Filter for Canada and write to canada.txt
    const canadaData = results.filter((row) => row.country === "Canada");
    writeDataToFile(canadaData, "canada.txt");

    // Filter for USA and write to usa.txt
    const usaData = results.filter((row) => row.country === "United States");
    writeDataToFile(usaData, "usa.txt");
  });
