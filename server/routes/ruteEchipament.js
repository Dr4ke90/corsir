const connectDB = require("../db");

const getAllEchipament = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("echipament_it");

    const echipament = await collection.find({}).toArray();

    res.status(200).json(echipament);
  } catch (error) {
    console.error("Eroare la preluarea listei de echipamente:", error);
    res
      .status(500)
      .json({ error: "Eroare la preluarea listei de achipamente" });
  }
};

const postOneEchipoamentFile = async (req, res) => {
  const echipament = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("echipament_it");

    const response = await collection.insertOne(echipament);

    if (!response.acknowledged) {
      console.log("Fisa nu a putut fi adaugata.");
      return res.status(404).json(response);
    }

    console.log(
      `Echipamentul cu nr ${echipament.cit} a fost adaugat cu succes`
    );
    return res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Eroare la adăugarea echipamentului" + echipament.cit });
  }
};

const getOneEchipamentFile = async (req, res) => {
  const { cit } = req.params;

  try {
    const db = await connectDB();
    const collection = db.collection("echipament_it");

    const response = await collection.findOne(
      { cit: cit },
      { returnDocument: "after" }
    );

    if (response === null) {
      return res.status(404).json({ message: "Echipamentul nu a fost găsit." });
    }

    return res.status(200).json({
      message: `Echipamentul ${cit} a fost preluat cu succes`,
      file: response,
    });
  } catch (error) {
    console.error("Eroare la preluarea echipamentului:", error);
    return res
      .status(500)
      .json({ error: "Eroare la preluarea echipamentului" });
  }
};

const updateEchipamentFile = async (req, res) => {
  const { cit } = req.params;
  const updates = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("echipament_it");

    const response = await collection.updateOne(
      { cit: cit },
      { $set: updates }
    );

    if (response.matchedCount === 0) {
      console.log(`Echipamentul ${cit} nu a fost găsit.`);
      return res.status(404).json(response);
    }

    if (response.modifiedCount !== 0) {
      console.log(`Echipamentul ${cit} a fost actualizat cu succes.`);
      res.status(200).json(response);
    }
  } catch (error) {
    console.error("Eroare la actualizarea echipamentului:", error);
    res.status(500).json({ error: "Eroare la actualizarea echipamentului" });
  }
};

const deleteOneEquipment = async (req, res) => {
  const { cit } = req.params;

  try {
    const db = await connectDB();
    const collection = db.collection("echipament_it");

    const response = await collection.deleteOne({ cit: cit });

    if (!response.acknowledged) {
      console.log(`Echipamentul cu nr ${cit} nu a fost găsit.`);
      return res.status(404).json(response);
    }

    console.log(`Echipamentul ${cit} a fost sters cu succes.`);
    return res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Eroare la stergerea echipamentului ${cit}` });
  }
};

module.exports = {
  getAllEchipament,
  getOneEchipamentFile,
  updateEchipamentFile,
  postOneEchipoamentFile,
  deleteOneEquipment,
};
