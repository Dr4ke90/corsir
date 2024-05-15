const connectDB = require("../db");

const getAllWorkEquipament = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("echipament_lucru");

    const echipament = await collection.find({}).toArray();

    res.status(200).json(echipament);
  } catch (error) {
    console.error("Eroare la preluarea listei de echipamente:", error);
    res
      .status(500)
      .json({ error: "Eroare la preluarea listei de achipamente" });
  }
};

const postWorkEquipment = async (req, res) => {
  const echipament = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("echipament_lucru");

    const response = await collection.insertOne(echipament);

    if (!response.acknowledged) {
      console.log("Echipamentul nu a putut fi adaugat.");
      return res.status(404).json(response);
    }

    console.log(
      `Echipamentul ${echipament.id} a fost adaugat cu succes`
    );
    return res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Eroare la adăugarea echipamentului" + echipament.id });
  }
};

const getOneWorkEquipment = async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connectDB();
    const collection = db.collection("echipament_lucru");

    const response = await collection.findOne(
      { id: id },
      { returnDocument: "after" }
    );

    if (response === null) {
      return res.status(404).json({ message: "Echipamentul nu a fost găsit." });
    }

    return res.status(200).json({
      message: `Echipamentul ${id} a fost preluat cu succes`,
      file: response,
    });
  } catch (error) {
    console.error("Eroare la preluarea echipamentului:", error);
    return res
      .status(500)
      .json({ error: "Eroare la preluarea echipamentului" });
  }
};

const updateWorkEquipment = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("echipament_lucru");

    const response = await collection.updateOne(
      { id: id },
      { $set: updates }
    );

    if (response.matchedCount === 0) {
      console.log(`Echipamentul ${id} nu a fost găsit.`);
      return res.status(404).json(response);
    }

    if (response.modifiedCount !== 0) {
      console.log(`Echipamentul ${id} a fost actualizat cu succes.`);
      res.status(200).json(response);
    }
  } catch (error) {
    console.error("Eroare la actualizarea echipamentului:", error);
    res.status(500).json({ error: "Eroare la actualizarea echipamentului" });
  }
};

const deleteWorkEquipment = async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connectDB();
    const collection = db.collection("echipament_lucru");

    const response = await collection.deleteOne({ id: id });

    if (!response.acknowledged) {
      console.log(`Echipamentul ${id} nu a fost găsit.`);
      return res.status(404).json(response);
    }

    console.log(`Echipamentul ${id} a fost sters cu succes.`);
    return res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Eroare la stergerea echipamentului ${id}` });
  }
};

module.exports = {
  getAllWorkEquipament,
  getOneWorkEquipment,
  updateWorkEquipment,
  postWorkEquipment,
  deleteWorkEquipment,
};
