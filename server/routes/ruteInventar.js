const connectDB = require("../db");

const getAllFiles = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("inventar_it");

    const retur = await collection.find({}).toArray();
    res.status(200).json(retur);
  } catch (error) {
    console.error("Eroare la preluarea fiselor de inventar:", error);
    res.status(500).json({ error: "Eroare la preluarea fiselor de inventar" });
  }
};

const getOneInventoryFile = async (req, res) => {
  const { fisa } = req.params;
  try {
    const db = await connectDB();
    const collection = db.collection("inventar_it");

    const response = await collection.findOne({ fisa });
    if (!response) {
      return res
        .status(404)
        .json({ error: `Fisa de inventar ${fisa} nu a fost găsita.` });
    }

    res.json(response);
  } catch (error) {
    console.error("Eroare la preluarea fisei: " + fisa, error);
    res.status(500).json({ error: "Eroare la preluarea fisei" + fisa });
  }
};

const postOneInventoryFile = async (req, res) => {
  const inventar = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("inventar_it");

    const response = await collection.insertOne(inventar);

    if (!response.acknowledged) {
      console.log(`Fisa ${inventar.fisa} nu a putut fi adaugata.`);
      return res.status(404).json(response);
    }

    console.log(`Fisa ${inventar.fisa} a fost adaugata cu succes`);
    return res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Eroare la adăugarea fisei de retur" + inventar.fisa });
  }
};

const updateOneInventoryFile = async (req, res) => {
  const { fisa } = req.params;
  const updates = req.body;

  try {
    const db = await connectDB();

    const collection = db.collection("inventar_it");

    const response = await collection.updateOne(
      { fisa: fisa },
      { $set: updates }
    );

    if (response.matchedCount === 0) {
      console.log(`Fisa cu nr ${fisa} nu a fost gasita!`);
      return res.status(404).json(response);
    }

    if (response.modifiedCount !== 0) {
      console.log(`Fisa cu nr ${fisa} a fost actualizata cu succes!!`);
      return res.status(200).json(response);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Eroare la actualizarea fisei " + fisa, error: error });
  }
};

const deleteOneInventoryFile = async (req, res) => {
  const { fisa } = req.params;

  try {
    const db = await connectDB();
    const collection = db.collection("inventar_it");

    const response = await collection.deleteOne({ fisa: fisa });

    if (response.matchedCount === 0) {
      console.log(`Fisa cu nr ${fisa} nu a fost găsita.`);
      return res.status(404).json(response);
    }

    if (response.deletedCount !== 0) {
      console.log(`Fisa cu nr ${fisa} a fost stearsa cu succes.`);
      return res.status(200).json(response);
    }
  } catch (error) {
    console.error("Eroare la stergerea fisei:" + fisa, error);
    res.status(500).json({ error: "Eroare la stergerea fisei:" + fisa });
  }
};

module.exports = {
  getAllFiles,
  postOneInventoryFile,
  updateOneInventoryFile,
  getOneInventoryFile,
  deleteOneInventoryFile,
};
