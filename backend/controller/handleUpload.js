import reader from "xlsx";
import sequelize from "../db/config.mjs";
import Data from "../db/DataModel.mjs";
import fs from "fs";

// __dirname isn't defined in the ES module,
// Hence the next four lines tries to define it.
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handleUploadedFile = async (req, res) => {
  let excelFile = req.files.excelFile;

  if (
    !excelFile.mimetype.includes("spreadsheet") ||
    !excelFile.mimetype.includes("sheet")
  ) {
    return res.json({ failed: "Please select an excel file" });
  }
  await excelFile.mv(__dirname + "/" + excelFile.name);
  const file = reader.readFile(__dirname + "/" + excelFile.name);
  let excelData = [];

  const sheets = file.SheetNames;

  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach((res) => {
      excelData.push(res);
    });
  }

  // Saving data to db
  excelData = JSON.stringify(excelData);
  sequelize
    .sync({ force: true })
    .then((result) => {
      return Data.create({ content: excelData });
    })
    .then((result) => {
      res.json({ success: "Data Uploaded Successfully" });
      fs.unlinkSync(__dirname + "/" + excelFile.name); // Delete file after saving to DB
    });
};

const displayData = async (req, res) => {
  Data.findAll({}).then((result) => {
    if (!result) {
      res.json({ failed: "No file found. Please Upload File First" });
    }
    let data = result[0].dataValues.content;
    data = JSON.parse(data);
    res.json(data);
  });
};

export { handleUploadedFile, displayData };
