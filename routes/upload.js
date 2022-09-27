const upload = require("../middleware/upload");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();
const Grid = require("gridfs-stream");

const conn = mongoose.connection;

router.post("/upload/:collectionname", upload.single("file"), async (req, res)=>{
    console.log("uploading file...")
    // const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
    //     bucketName: req.params.collectionname
    // });
    // const gfs = Grid(conn.db, mongoose.mongo);
    // gfs.collection(req.params.collectionname);

    // const fetchedfile = await gfs.files.findOne({filename:req.file.originalname});
    

    // if (req.file === undefined) return res.send("you mut select a file.");

    // else if(fetchedfile !== null){
        // console.log(fetchedfile);
        // return res.send(`File uploaded!`);
    // }

    // return res.send(req.file.filename);
    return res.send("uploaded");
})

module.exports = router;