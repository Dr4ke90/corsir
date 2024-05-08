const connectDB = require("../db");

const getAllpredare = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("predare_it");

    const response = await collection.find({}).toArray();

    if (!response) {
      return res
        .status(404)
        .json({ error: "Fisele de predare nu au putut fi preluate!!" });
    }

    return res.status(200).json({
      succes: "Fisele de predare au fost preluate cu succes!!",
      response: response,
    });
  } catch (error) {
    res.status(500).json({ error: "Eroare la preluarea fiselor de Predare" });
  }
};

const getOnePredareFile = async (req, res) => {
  const { fisa } = req.params;
  try {
    const db = await connectDB();
    const collection = db.collection("predare_it");

    const response = await collection.findOne({ fisa });

    if (!response) {
      return res.status(404).json("Fisa nu a fost găsita.");
    }

    return res.status(200).json({
      response: response,
      succes: `Fisa cu nr ${fisa} a fost preluata cu succes`,
    });
  } catch (error) {
    res.status(500).json("Eroare la preluarea fisei " + fisa);
  }
};

const postOnePredareFile = async (req, res) => {
  const fisaNoua = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("predare_it");

    const response = await collection.insertOne(fisaNoua);

    if (!response.acknowledged) {
      console.log(`Fisa ${fisaNoua.fisa} nu a putut fi adaugata.`);
      return res.status(404).json(response);
    }

    console.log(`Fisa cu nr ${fisaNoua.fisa} a fost adaugata cu succes`);
    return res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Eroare la adăugarea fisei" + fisaNoua.fisa });
  }
};

const updateOnePredareFile = async (req, res) => {
  const { fisa } = req.params;
  const data = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("predare_it");

    const response = await collection.updateOne({ fisa: fisa }, { $set: data });

    if (response.matchedCount === 0) {
      console.log(`Fisa cu nr ${fisa} nu a fost găsita.`);
      return res.status(404).json(response);
    }

    if (response.modifiedCount !== 0) {
      console.log(`Fisa cu nr ${fisa} a fost actualizata cu succes.`);
      return res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json("Eroare la actualizarea fisei " + fisa);
  }
};

const deleteOnePredareFile = async (req, res) => {
  const { fisa } = req.params;
  try {
    const db = await connectDB();
    const collection = db.collection("predare_it");

    const response = await collection.deleteOne({ fisa: fisa });

    if (!response) {
      `Fisa cu nr ${fisa} nu a fost găsita.`;
      return res.status(404).json(response);
    }

    console.log(`Fisa cu nr ${fisa} a fost stearsa cu succes.`);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Eroare la stergerea fisei " + fisa });
  }
};

module.exports = {
  getAllpredare,
  getOnePredareFile,
  postOnePredareFile,
  updateOnePredareFile,
  deleteOnePredareFile,
};
