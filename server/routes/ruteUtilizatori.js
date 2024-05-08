const connectDB = require("../db");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("users");

    const users = await collection.find({}).toArray();
    res.json(users);
  } catch (error) {
    console.error("Eroare la preluarea utilizatorilor:", error);
    res.status(500).json({ error: "Eroare la preluarea utilizatorilor" });
  }
};

const logIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("users");

    const user = await collection.findOne({
      username: username,
    });

    if (!user) {
      console.log("Utilizatorul nu exista.");
      return res.status(400).json(null);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      console.log("Parola gresita");
      return res.status(401).json(null);
    }

    console.log("Autentificare reusita");

    res.status(200).json(user);
  } catch (error) {
    console.error("Eroare la autentificare:", error);
    res.status(500).json({
      error: "Eroare la autentificare. Te rugăm să încerci din nou mai târziu.",
    });
  }
};

const getOneUser = async (req, res) => {
  const { username } = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("users");

    const response = await collection.findOne({
      username: username,
    });

    if (response) {
      res.json(response);
    } else {
      console.log(
        "Autentificare eșuată. Numele de utilizator sau parola incorectă."
      );
      res.status(401).json(null);
    }
  } catch (error) {
    console.error("Eroare la autentificare:", error);
    res.status(500).json({
      error: "Eroare la autentificare. Te rugăm să încerci din nou mai târziu.",
    });
  }
};

const updateUser = async (req, res) => {
  const { fisa } = req.params;
  const data = req.body;

  delete data._id;

  try {
    const db = await connectDB();
    const collection = db.collection("users");

    const response = await collection.updateOne({ fisa: fisa }, { $set: data });

    if (response.matchedCount === 0) {
      console.log(`Userul ${data.nume} nu a fost găsita.`);
      return res.status(404).json(response);
    }

    if (response.modifiedCount !== 0) {
      console.log(`Userul ${data.nume} a fost actualizat cu succes.`);
      return res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json("Eroare la actualizarea user-ului " + data.nume);
  }
};

const createUser = async (req, res) => {
  const newUser = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("users");

    const response = await collection.insertOne(newUser);

    if (!response.acknowledged) {
      console.log(`Angajatul ${newUser.nume} nu a putut fi adaugata.`);
      return res.status(404).json(response);
    }

    if (response.modifiedCount !== 0) {
      console.log(`Angajatul ${newUser.nume} a fost agaugat cu succes.`);
      return res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json("Eroare la adaugarea user-ului " + newUser.nume);
  }
};

module.exports = {
  getAllUsers,
  logIn,
  updateUser,
  getOneUser,
  createUser
};
