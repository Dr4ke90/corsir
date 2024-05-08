const connectDB = require("../db");

const getAllNecesar = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("necesar_it");

    const necesar = await collection.find({}).toArray();
    res.json(necesar);
  } catch (error) {
    console.error("Eroare la preluarea fiselor necear:", error);
    res.status(500).json({ error: "Eroare la preluarea fiselor" });
  }
};

const getOneFileNecesar = async (req, res) => {
  const { fisa } = req.params;

  try {
    const db = await connectDB();
    const collection = db.collection("necesar_it");

    const response = await collection.findOne({ fisa });

    if (!response) {
      console.log(`Fisa ${fisa} nu a fost găsita.`);
      return res.status(404).json(response);
    }

    console.log(`Fisa ${fisa} a fost preluata cu succes.`);

    return res.status(200).json(response);
  } catch (error) {
    console.error("Eroare la preluarea fisei : " + fisa);
    res.status(500).json(error);
  }
};

const postNecesarFile = async (req, res) => {
  const fisaNoua = req.body;
  try {
    const db = await connectDB();
    const collection = db.collection("necesar_it");

    const response = await collection.insertOne(fisaNoua);

    if (!response.acknowledged) {
      console.log(`Fisa ${fisaNoua.fisa} nu a putut fi adaugata.`);
      return res.status(404).json(response);
    }

    console.log(`Fisa ${fisaNoua.fisa} a fost adaugata cu succes`);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Eroare la adăugarea fisei : " + fisaNoua.fisa);
    res.status(500).json(error);
  }
};

const updateNecesarFile = async (req, res) => {
  const { fisa } = req.params;
  const updates = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("necesar_it");

    const response = await collection.updateOne(
      { fisa: fisa.toString() },
      { $set: updates }
    );

    if (response.matchedCount === 0) {
      console.log(`Fisa ${fisa} nu a fost găsita.`);
      return res.status(404).json(response);
    }

    if (response.modifiedCount !== 0) {
      console.log(`Fisa cu nr ${fisa} a fost actualizata cu succes.`);
      return res.status(200).json(response);
    }
  } catch (error) {
    console.error("Eroare la actualizarea fisei " + fisaNoua.fisa);
    res.status(500).json(error);
  }
};

const deleteNecesarFile = async (req, res) => {
  const { fisa } = req.params;

  try {
    const db = await connectDB();
    const collection = db.collection("necesar_it");

    const response = await collection.deleteOne({ fisa: fisa });

    if (response.matchedCount === 0) {
      console.log(`Fisa cu nr ${fisa} nu a fost găsita.`);
      return res.status(404).json(response);
    }
    console.log(`Fisa cu nr ${fisa} a fost stearsa cu succes.`);
    res.status(200).json(response);
  } catch (error) {
    console.error("Eroare la preluarea fiselor de necesar");
    res.status(500).json(error);
  }
};

module.exports = {
  getAllNecesar,
  getOneFileNecesar,
  postNecesarFile,
  updateNecesarFile,
  deleteNecesarFile,
};
