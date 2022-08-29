import reader from "xlsx";
import sequelize from "../db/config.mjs";
import Data from "../db/DataModel.mjs";

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
    console.log("Please select an excel file");
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

  // Printing data
  excelData = JSON.stringify(excelData);
  sequelize
    .sync({ force: true })
    .then((result) => {
      return Data.create({ content: excelData });
    })
    .then((result) => {
      res.json({ success: "Data Uploaded Successfully" });
    });
};

const displayData = async (req, res) => {
  console.log("Running display");
  Data.findAll({}).then((result) => {
    let data = result[0].dataValues.content;
    data = JSON.parse(data);
    console.log(data);
    res.json(data);
  });
};

export { handleUploadedFile, displayData };
