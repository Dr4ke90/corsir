const path = require("path");
const fs = require("fs");



const getNecesarTemplate = (req, res) => {
    const filePath = path.join(__dirname, "../resources/tampletes/necesar.docx");
  
    const fileStream = fs.createReadStream(filePath);
  
    fileStream.on("open", () => {
      res.setHeader("Content-Disposition", 'attachment; filename="necesar.docx"');
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
  
      fileStream.pipe(res);
    });
  
    fileStream.on("error", (err) => {
      console.error("Error reading file:", err);
      res.status(500).send("Error reading file");
    });
  
    fileStream.on("close", () => {
      console.log("File read successfully");
    });
  }


  const getPvppTemplate = (req, res) => {
    const filePath = path.join(__dirname, "../resources/tampletes/predare.docx");
  
    const fileStream = fs.createReadStream(filePath);
  
    fileStream.on("open", () => {
      res.setHeader("Content-Disposition", 'attachment; filename="predare.docx"');
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
  
      fileStream.pipe(res);
    });
  
    fileStream.on("error", (err) => {
      console.error("Error reading file:", err);
      res.status(500).send("Error reading file");
    });
  
    fileStream.on("close", () => {
      console.log("File read successfully");
    });
  }

  const getPvrTemplate = (req, res) => {
    const filePath = path.join(__dirname, "../resources/tampletes/retur.docx");
    const fileStream = fs.createReadStream(filePath);
    fileStream.on("open", () => {
      res.setHeader("Content-Disposition", 'attachment; filename="retur.docx"');
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
  
      fileStream.pipe(res);
    });
    fileStream.on("error", (err) => {
      console.error("Error reading file:", err);
      res.status(500).send("Error reading file");
    });
  
    fileStream.on("close", () => {
      console.log("File read successfully");
    });
  }

  module.exports = {
    getNecesarTemplate,
    getPvppTemplate,
    getPvrTemplate
  }