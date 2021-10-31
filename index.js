const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const cors = require("cors");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.or2vp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("booking");
    const hotelDetails = database.collection("hotelDetails");

    // GET API
    app.get("/addHotel", async (req, res) => {
      const cursor = hotelDetails.find({});
      const hotel = await cursor.toArray();
      res.send(hotel);
    });

    // GET Single Hotel details
    app.get("/addHotel/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: ObjectId(id) };
      const service = await hotelDetails.findOne(query);
      res.json(service);
    });

    // POST API
    app.post("/addHotel", async (req, res) => {
      const addHotel = req.body;
      const result = await hotelDetails.insertOne(addHotel);
      res.json(result);
    });

    // DELETE API
    app.delete("/addHotel/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await hotelDetails.deleteOne(query);
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Happy code with programming hero adil");
});

app.listen(port, () => {
  console.log(`Example app listening  hello at http://localhost:${port}`);
});
