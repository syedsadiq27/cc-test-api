const multer = require("multer");
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const mongoose = require("mongoose");

require("dotenv").config();


const storage = new GridFsStorage({
    url: process.env.DB_CONNECTION_STRING,
    options:{useNewUrlParser:true, useUnifiedTopology:true},
    file: (req,file)=>{
        // // check if file already exists
        // const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
        //     bucketName: req.params.collectionname
        // });
        // const gfs = Grid(conn.db, mongoose.mongo);
        // gfs.collection(req.params.collectionname);
    
        // const fetchedfile = await gfs.files.findOne({filename:file.originalname});
        // if(fetchedfile !== null){
        //     return `file already exists with the same name ${file.originalname}`;
        // }

        // when file does not exists on the same bucket
        return{
            bucketName: req.params.collectionname,
            filename: `${file.originalname}`
        }
    }
});

module.exports = multer({storage});