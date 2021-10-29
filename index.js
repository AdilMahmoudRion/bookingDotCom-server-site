const express = require("express");
const { MongoClient } = require("mongodb");
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
    })
    // inserted data in database

    // POST API
    app.post("/AddHotel", async (req, res) => {
      const addHotel = req.body;
      const result = await hotelDetails.insertOne(addHotel);
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
