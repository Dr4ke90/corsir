const connectDB = require("../db");

const getAllLocations = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("locatii");

    const locatii = await collection.find({}).toArray();

    res.json(locatii);
  } catch (error) {
    console.error("Eroare la preluarea listei de locatii:", error);
    res.status(500).json({ error: "Eroare la preluarea listei de locatii" });
  }
};

const postLocation = async (req, res) => {
  const locatie = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("locatii");

    const response = await collection.insertOne(locatie);

    if (!response.acknowledged) {
      return res.status(404).json({ error: "Locatia nu a putut fi adaugata." });
    }

    return res.status(200).json({
      success: `Locatia ${locatie.proiect} a fost adaugata cu succes`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Eroare la adăugarea locatiei" + locatie.proiect });
  }
};

const updateLocation = async (req, res) => {
  const { proiect } = req.params;
  const updates = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("locatii");

    const response = await collection.updateOne(
      { proiect: proiect },
      { $set: updates }
    );

    if (response.matchedCount === 0) {
      return res.status(404).json({ error: "Locatia nu a fost găsita." });
    }

    if (response.modifiedCount >= 1) {
      res.json({
        success: `Locatia  ${proiect} a fost actualizata cu succes.`,
      });
    }
  } catch (error) {
    console.error("Eroare la actualizarea locatiei:", error);
    res.status(500).json({ error: "Eroare la actualizarea locatiei" });
  }
};

const deleteLocation = async (req, res) => {
  const { proiect } = req.params;

  try {
    const db = await connectDB();
    const collection = db.collection("locatii");

    const response = await collection.deleteOne({ proiect: proiect });

    if (!response.acknowledged) {
      return res
        .status(404)
        .json({ message: `Locatia ${proiect} nu a fost găsita.` });
    }

    return res.status(200).json({
      message: `Locatia ${proiect} a fost stearsa cu succes.`,
    });
  } catch (error) {
    res.status(500).json({ error: `Eroare la stergerea locatiei ${proiect}` });
  }
};

module.exports = {
  getAllLocations,
  updateLocation,
  postLocation,
  deleteLocation,
};
