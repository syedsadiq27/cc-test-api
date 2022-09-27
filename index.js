// var $ = require( "jquery" );
const {
  Schema_Texture,
  Schema_DimensionButton,
  Schema_Model3D,
  Schema_WardInt3DModel,
  Schema_WardDoorModel
} = require("./models/datamodel");
const express = require("express");
const https = require("https");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const connection = require("./db");
const upload = require("./routes/upload");
const Grid = require("gridfs-stream");
var mongodb = require("mongodb");
require("dotenv/config");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const options = {
    // key: fs.readFileSync("cert" + "/privkey.pem"),
    // cert: fs.readFileSync("cert" + "/cert.pem"),
    pfx: fs.readFileSync("cert" + "/cert.pfx"),
    passphrase: 'rc123456'
  };
const sslServer = https.createServer(options, app);

// mongodb user: parveenkaloi    pass: nz2MOfJE5UP12Hly

//#region API Requirements
// APIs Required
// user:
// userType:
// password:

// APIs:
// Create User
// Edit User
// Delete User
// Query Users

// Upload:
// 3D model {fileName, Catogary: wardrobe, subCat: wardInterior, Hanger, slab, dimension}
// Texture {fileName, Catogary: wardrobe, subCat: Hanger, Material}

// Delete:
// 3D model {Catogary: wardrobe, name}
// Texture {Catogary: wardrobe, name}
//#endregion

// API Calls:

// Get List of files from Collection by collection name
// http://localhost:3001/getlistoffiles/texture_maps.files

//

// let gfs, bucket;
connection();

const conn = mongoose.connection;

app.use("/file", upload);

app.get("/file/:filename/:collectionname", async (req, res) => {
  try {
    // console.log(req.params.collectionname);
    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: req.params.collectionname,
    });
    const gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection(req.params.collectionname);

    const file = await gfs.files.findOne({ filename: req.params.filename });
    if (file !== null) {
      const readStream = bucket.openDownloadStream(file._id);
      readStream.pipe(res);
    } else {
      res.send(
        `${req.params.filename} was not found in collection:${req.params.collectionname}`
      );
    }
    // console.log(error);
    // res.send(`${req.params.filename} was not found ${error}`);
  } catch (error) {
    console.log(error);
    return "could not get collections";
  }
});

app.get("/getlistofcollections", async (req, res) => {
  try {
    await conn.db.listCollections().toArray(function (err, collInfos) {
      res.send(JSON.parse(collInfos));
    });
  } catch (error) {
    console.log(error);
    return "could not get collections";
  }
});

app.get("/getlistoffiles/:collectionname", async (req, res) => {
  try {
    // console.log(req.params.collectionname);
    let col = await conn.db.collection(req.params.collectionname);
    let colData = await col.find({}).toArray();
    // console.log(colData);
    res.send(colData);
  } catch (error) {
    console.log(error);
    res.send("An error occured in getting files info");
  }
});

app.delete("/file/:filename/:collectionname", async (req, res) => {
  try {
    const gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection(req.params.collectionname);

    await gfs.files.deleteOne({ filename: req.params.filename });
    res.send("success");
  } catch (error) {
    console.log(error);
    res.send("An error occured");
  }
});

//#region Wardrobe wood texture APIs
app.post("/wardTexture", async (req, res) => {
  try {
    // console.log(req.body);
    const texMap = new Schema_Texture(req.body);
    await texMap.save().then((result) => {
      // console.log(result)
      res.send(result);
    });

    // console.log("saved on database");
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

app.delete("/wardTexture/:filename", async (req, res) => {
  console.log("deleting entry");
  try {
    var coll = await conn.db.collection(process.env.TEXTURE_MAPS_COLLECTION);
    await coll.deleteOne({ fileName: req.params.filename }).then((result) => {
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
//#endregion

//#region Wardrobe Interior Model API
app.post("/wardInteriorModel", async (req, res) => {
  try {
    const texMap = new Schema_WardInt3DModel(req.body);
    await texMap.save().then((result) => {
      // console.log(result)
      res.send(result);
    });
    // console.log("saved on database");
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

app.delete("/wardInteriorModel/:id", async (req, res) => {
  console.log("deleting entry");
  try {
    var coll = await conn.db.collection(
      process.env.WARDROBE_INTERIOR_3D_MODELS
    );
    await coll
      .deleteOne({ _id: new mongodb.ObjectId(req.params.id) })
      .then((result) => {
        res.send(result);
      });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
//#endregion

//#region Wardrobe Doors Model API
app.post("/wardDoorModel", async (req, res) => {
  try {
    const texMap = new Schema_WardDoorModel(req.body);
    await texMap.save().then((result) => {
      // console.log(result)
      res.send(result);
    });
    // console.log("saved on database");
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

app.delete("/wardDoorModel/:id", async (req, res) => {
  console.log("deleting entry");
  try {
    var coll = await conn.db.collection(process.env.WARDROBE_DOORS_3D_MODELS);
    await coll
      .deleteOne({ _id: new mongodb.ObjectId(req.params.id) })
      .then((result) => {
        res.send(result);
      });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
//#endregion

//#region Wardrobe Depth Button APIs
app.post("/wardDimensionButton", async (req, res) => {
  try {
    // console.log(req.body);
    const texMap = new Schema_DimensionButton(req.body);
    await texMap.save().then((result) => {
      // console.log(result)
      res.send(result);
    });

    // console.log("saved on database");
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

app.delete("/wardDimensionButton/:id", async (req, res) => {
  console.log("deleting entry");
  try {
    var coll = await conn.db.collection(
      process.env.DIMENSIONS_BUTTONS_COLLECTION
    );
    await coll
      .deleteOne({ _id: new mongodb.ObjectId(req.params.id) })
      .then((result) => {
        res.send(result);
      });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
//#endregion

// app.get("/wardTexture/:filename", async (req, res) =>{
//     const gfs = Grid(conn.db, mongoose.mongo);
//     let coll = await gfs.collection(process.env.TEXTURE_MAPS_COLLECTION)
//     let fetchedfile = await coll.findOne({"fileName":"abc"}).then(result=>{
//         console.log(result);
//     });
//     console.log(fetchedfile)
//     res.send("Done");
// });

sslServer.listen(
  process.env.PORT,
  console.log(`Listening on port ${process.env.PORT} and connected to ${process.env.DB_CONNECTION_STRING}...`)
);

// mongoose.connect(
//     process.env.DB_CONNECTION_STRING,
//     (req,res) =>{
//     console.log("Connected to the database");
// } );

// app.get("/", (req, res) =>{
//     console.log("getting a request");
//     res.send("this is the response");
// });
