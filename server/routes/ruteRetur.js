const connectDB = require("../db");

const getAllRetur = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("retur_it");

    const retur = await collection.find({}).toArray();
    res.json(retur);
  } catch (error) {
    console.error("Eroare la preluarea fiselor de retur:", error);
    return res
      .status(500)
      .json({ error: "Eroare la preluarea fselor de retur" });
  }
};

const getOneReturFile = async (req, res) => {
  const { fisa } = req.params;
  try {
    const db = await connectDB();
    const collection = db.collection("retur_it");

    const response = await collection.findOne({ fisa });

    if (!response) {
      console.log(`Fisa ${fisa} nu a fost găsita.`);
      return res.status(404).json(response);
    }

    console.log(`Fisa ${fisa} a fost preluata cu succes`);
    res.status(200).json(response);
  } catch (error) {
    console.error("Eroare la preluarea fisei: " + fisa, error);
    return res.status(500).json({ error: "Eroare la preluarea fisei" + fisa });
  }
};

const postOneReturFile = async (req, res) => {
  const retur = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("retur_it");

    const response = await collection.insertOne(retur);

    if (!response.acknowledged) {
      console.log(`Fisa ${retur.fisa} nu a putut fi adaugata.`);
      return res.status(404).json(response);
    }

    console.log(`Fisa cu nr ${retur.fisa} a fost adaugata cu succes`);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Eroare la adaugarea fisei: " + retur.fisa, error);
    return res
      .status(500)
      .json({ error: "Eroare la adăugarea fisei de retur" + retur.fisa });
  }
};

const updateOneReturFile = async (req, res) => {
  const { fisa } = req.params;
  const updates = req.body;

  try {
    const db = await connectDB();

    const collection = db.collection("retur_it");

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
    console.error("Eroare la actualizarea fisei:" + fisa, error);
    return res
      .status(500)
      .json({ message: "Eroare la actualizarea fisei " + fisa, error: error });
  }
};

const deleteOneReturFile = async (req, res) => {
  const { fisa } = req.params;
  try {
    const db = await connectDB();
    const collection = db.collection("retur_it");

    const response = await collection.deleteOne({ fisa: fisa });

    if (response.matchedCount === 0) {
      console.log(`Fisa cu nr ${fisa} nu a fost găsita.`);
      return res.status(404).json(response);
    }

    console.log(`Fisa cu nr ${fisa} a fost stearsa cu succes.`);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Eroare la stergerea fisei:" + fisa, error);
    return res.status(500).json({ error: "Eroare la stergerea fisei:" + fisa });
  }
};

module.exports = {
  getAllRetur,
  postOneReturFile,
  updateOneReturFile,
  getOneReturFile,
  deleteOneReturFile,
};
