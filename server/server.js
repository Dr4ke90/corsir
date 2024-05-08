require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const {
  getAllNecesar,
  getOneFileNecesar,
  postNecesarFile,
  updateNecesarFile,
  deleteNecesarFile,
} = require("./routes/ruteNecesar");
const {
  getAllpredare,
  getOnePredareFile,
  updateOnePredareFile,
  postOnePredareFile,
  deleteOnePredareFile,
} = require("./routes/rutePredare");
const {
  getAllEchipament,
  getOneEchipamentFile,
  updateEchipamentFile,
  postOneEchipoamentFile,
  deleteOneEquipment,
} = require("./routes/ruteEchipament");
const {
  getAllRetur,
  postOneReturFile,
  updateOneReturFile,
  deleteOneReturFile,
  getOneReturFile,
} = require("./routes/ruteRetur");
const {
  getNecesarTemplate,
  getPvrTemplate,
  getPvppTemplate,
} = require("./routes/ruteFisiere");
const {
  getAllUsers,
  getUser,
  updateUser,
  logIn,
  getOneUser,
  updateUserByName,
  createUser,
} = require("./routes/ruteUtilizatori");
const {
  getAllLocations,
  postLocation,
  updateLocation,
  deleteLocation,
} = require("./routes/ruteLocatii");
const {
  getAllFiles,
  getOneInventoryFile,
  postOneInventoryFile,
  updateOneInventoryFile,
  deleteOneInventoryFile,
} = require("./routes/ruteInventar");
const {
  getAllMobilePhones,
  postOneMobilePhone,
  updateOneMobilePhone,
  deleteOneMobilePhone,
} = require("./routes/mobilePhonesRoutes");


// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static("../client/build"));
app.use("/login", logIn);

// API SuppliChecklist
app.get("/coral/it/necesar", getAllNecesar);

app.get("/coral/it/necesar/:fisa", getOneFileNecesar);

app.post("/coral/it/necesar", postNecesarFile);

app.put("/coral/it/necesar/:fisa", updateNecesarFile);

app.delete("/coral/it/necesar/:fisa", deleteNecesarFile);

// API Equipment
app.get("/coral/it/echipament", getAllEchipament);

app.get("/coral/it/echipament/:cit", getOneEchipamentFile);

app.put("/coral/it/echipament/:cit", updateEchipamentFile);

app.post("/coral/it/echipament/", postOneEchipoamentFile);

app.delete("/coral/it/echipament/:cit", deleteOneEquipment);

// API Handover
app.get("/coral/it/predare", getAllpredare);

app.get("/coral/it/predare/:fisa", getOnePredareFile);

app.put("/coral/it/predare/:fisa", updateOnePredareFile);

app.delete("/coral/it/predare/:fisa", deleteOnePredareFile);

app.post("/coral/it/predare", postOnePredareFile);

// API Return
app.get("/coral/it/retur", getAllRetur);

app.get("/coral/it/retur/:fisa", getOneReturFile);

app.post("/coral/it/retur", postOneReturFile);

app.put("/coral/it/retur/:fisa", updateOneReturFile);

app.delete("/coral/it/retur/:fisa", deleteOneReturFile);

// API Inventory
app.get("/coral/it/inventar", getAllFiles);

app.get("/coral/it/inventar/:fisa", getOneInventoryFile);

app.post("/coral/it/inventar", postOneInventoryFile);

app.put("/coral/it/inventar/:fisa", updateOneInventoryFile);

app.delete("/coral/it/inventar/:fisa", deleteOneInventoryFile);

// API Files
app.get("/coral/it/templates/necesar.docx", getNecesarTemplate);

app.get("/coral/it/templates/predare.docx", getPvppTemplate);

app.get("/coral/it/templates/retur.docx", getPvrTemplate);

// API Locations
app.get("/coral/api/locations", getAllLocations);

app.post("/coral/api/locations", postLocation);

app.put("/coral/api/locations/:proiect", updateLocation);

app.delete("/coral/api/locations/:proiect", deleteLocation);

// API MobilePhones
app.get("/coral/api/mobile-phones", getAllMobilePhones);

app.post("/coral/api/mobile-phones", postOneMobilePhone);

app.put("/coral/api/mobile-phones/:cit", updateOneMobilePhone);

app.delete("/coral/api/mobile-phones/:cit", deleteOneMobilePhone);

// API Employees
app.get("/coral/api/users", getAllUsers);

app.get("/coral/api/users/:username", getOneUser);

app.put("/coral/api/users/:fisa", updateUser);

app.post("/coral/api/users", createUser);

// Pornirea serverului
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Serverul rulează la adresa http://localhost:${port}`);
});
