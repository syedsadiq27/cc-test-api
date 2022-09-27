const mongoose = require("mongoose");
require("dotenv").config();

const TextureMap = new mongoose.Schema({
  fileName: String,
  thumbnailFileName: String,
  catogery: String,
  subCat: String,
  timeStamp: String,
});

const DimensionButton = new mongoose.Schema({
  buttonCatogery: {
    type: String,
    required: true,
  },
  dimension: {
    type: Number,
    required: true,
  },
});

const Model3D = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  catogery: {
    type: String,
    required: true,
  },
  subCat: {
    type: String,
    required: true,
  },
});

const WardInteriorModel = new mongoose.Schema({
  displayName: String,
  isChildModelContainer: Boolean,
  isChildModel: Boolean,
  parentCatogery: String,
  catogery: String,
  price: Number,
  fileName_3d: String,
  fileName_3d_left: String,
  fileName_3d_center: String,
  fileName_3d_right: String,
  fileName_thumb: String,
  fileName_thumbHover: String,
  childModelPosition: Object,
  childModelMargins: Object,
  dimensions: Object,
  widths: Object,
  isPullAble: Boolean,
});

const WardDoorModel = new mongoose.Schema({
  displayName: String,
  isChildModelContainer: Boolean,
  isChildModel: Boolean,
  parentCatogery: String,
  catogery: String,
  price: Number,
  fileName_3d: String,
  fileName_3d_left: String,
  fileName_3d_center: String,
  fileName_3d_right: String,
  fileName_thumb: String,
  fileName_thumbHover: String,
  childModelPosition: Object,
  childModelMargins: Object,
  dimensions: Object,
  isPullAble: Boolean,
  isScalble: Boolean,
});

var Schema_Model3D = mongoose.model(
  process.env.MODELS_3D_MAPS_COLLECTION,
  Model3D
);
var Schema_Texture = mongoose.model(
  process.env.TEXTURE_MAPS_COLLECTION,
  TextureMap
);
var Schema_DimensionButton = mongoose.model(
  process.env.DIMENSIONS_BUTTONS_COLLECTION,
  DimensionButton
);
var Schema_WardInt3DModel = mongoose.model(
  process.env.WARDROBE_INTERIOR_3D_MODELS,
  WardInteriorModel
);
var Schema_WardDoorModel = mongoose.model(
  process.env.WARDROBE_DOORS_3D_MODELS,
  WardDoorModel
);

module.exports = {
  Schema_Model3D,
  Schema_Texture,
  Schema_DimensionButton,
  Schema_WardInt3DModel,
  Schema_WardDoorModel,
};
