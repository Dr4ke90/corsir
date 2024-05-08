const connectDB = require("../db");

const getAllMobilePhones = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("telefoane");

    const echipament = await collection.find({}).toArray();

    res.status(200).json(echipament);
  } catch (error) {
    console.error("Eroare la preluarea listei de telefoane:", error);
    res
      .status(500)
      .json({ error: "Eroare la preluarea listei de telefoane" });
  }
};

const postOneMobilePhone = async (req, res) => {
  const phone = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("telefoane");

    const response = await collection.insertOne(phone);

    if (!response.acknowledged) {
      console.log("Telefonul nu a putut fi adaugat.");
      return res.status(404).json(response);
    }

    console.log(
      `Telefonul ${phone.cit} a fost adaugat cu succes`
    );
    return res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Eroare la adăugarea telefonului" + phone.cit });
  }
};

const getOneMobilePhone = async (req, res) => {
  const { cit } = req.params;

  try {
    const db = await connectDB();
    const collection = db.collection("telefoane");

    const response = await collection.findOne(
      { cit: cit },
      { returnDocument: "after" }
    );

    if (response === null) {
      return res.status(404).json({ message: "Telefonul nu a fost găsit." });
    }

    return res.status(200).json({
      message: `Telefonul ${cit} a fost preluat cu succes`,
      file: response,
    });
  } catch (error) {
    console.error("Eroare la preluarea telefonului:", error);
    return res
      .status(500)
      .json({ error: "Eroare la preluarea telefonului" });
  }
};

const updateOneMobilePhone = async (req, res) => {
  const { cit } = req.params;
  const updates = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("telefoane");

    const response = await collection.updateOne(
      { cit: cit },
      { $set: updates }
    );

    if (response.matchedCount === 0) {
      console.log(`Telefonul ${cit} nu a fost găsit.`);
      return res.status(404).json(response);
    }

    if (response.modifiedCount !== 0) {
      console.log(`Telefonul ${cit} a fost actualizat cu succes.`);
      res.status(200).json(response);
    }
  } catch (error) {
    console.error("Eroare la actualizarea echipamentului:", error);
    res.status(500).json({ error: "Eroare la actualizarea telefonului" });
  }
};

const deleteOneMobilePhone = async (req, res) => {
  const { cit } = req.params;

  try {
    const db = await connectDB();
    const collection = db.collection("telefoane");

    const response = await collection.deleteOne({ cit: cit });

    if (!response.acknowledged) {
      console.log(`Telefonul ${cit} nu a fost găsit.`);
      return res.status(404).json(response);
    }

    console.log(`Telefonul ${cit} a fost sters cu succes.`);
    return res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Eroare la stergerea telefonului ${cit}` });
  }
};

module.exports = {
  getAllMobilePhones,
  getOneMobilePhone,
  updateOneMobilePhone,
  postOneMobilePhone,
  deleteOneMobilePhone,
};
