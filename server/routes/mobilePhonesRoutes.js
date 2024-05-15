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
      `Telefonul ${phone.id} a fost adaugat cu succes`
    );
    return res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Eroare la adăugarea telefonului" + phone.id });
  }
};

const getOneMobilePhone = async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connectDB();
    const collection = db.collection("telefoane");

    const response = await collection.findOne(
      { id: id },
      { returnDocument: "after" }
    );

    if (response === null) {
      return res.status(404).json({ message: "Telefonul nu a fost găsit." });
    }

    return res.status(200).json({
      message: `Telefonul ${id} a fost preluat cu succes`,
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
  const { id } = req.params;
  const updates = req.body;

  try {
    const db = await connectDB();
    const collection = db.collection("telefoane");

    const response = await collection.updateOne(
      { id: id },
      { $set: updates }
    );

    if (response.matchedCount === 0) {
      console.log(`Telefonul ${id} nu a fost găsit.`);
      return res.status(404).json(response);
    }

    if (response.modifiedCount !== 0) {
      console.log(`Telefonul ${id} a fost actualizat cu succes.`);
      res.status(200).json(response);
    }
  } catch (error) {
    console.error("Eroare la actualizarea echipamentului:", error);
    res.status(500).json({ error: "Eroare la actualizarea telefonului" });
  }
};

const deleteOneMobilePhone = async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connectDB();
    const collection = db.collection("telefoane");

    const response = await collection.deleteOne({ id: id });

    if (!response.acknowledged) {
      console.log(`Telefonul ${id} nu a fost găsit.`);
      return res.status(404).json(response);
    }

    console.log(`Telefonul ${id} a fost sters cu succes.`);
    return res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Eroare la stergerea telefonului ${id}` });
  }
};

module.exports = {
  getAllMobilePhones,
  getOneMobilePhone,
  updateOneMobilePhone,
  postOneMobilePhone,
  deleteOneMobilePhone,
};
