const mongoose = require("mongoose");

const { Schema } = mongoose;

//const optionColor = new Schema({
//  optionColor: String,
//  price: String,
//});

//const optionRam = new Schema({
//  optionRam: String,
//  price: String,
//});

//const optionMemory = new Schema({
//  optionMemory: String,
//  price: String,
//});

const ColorSchema = new mongoose.Schema({
  color: String,
  price: Number,
  image: String,
});

const StorageSchema = new mongoose.Schema({
  size: String,
  colors: [ColorSchema],
});

const processor = new Schema({
  cpuTechnology: String,
  multiplier: String,
  numberOfStreams: String,
  cpuSpeed: String,
  maxSpeed: String,
  caching: String,
});

const ramMemory_hardDrive = new Schema({
  ram: String,
  ramType: String,
  ramBusSpeed: String,
  MaximumRamSupport: String,
  HardDrive: String,
});

const screen = new Schema({
  screen: String,
  resolution: String,
  scanFrequency: String,
  colorCoverage: String,
  screenTechnology: String,
});

const graphicsAndSound = new Schema({
  GraphicCard: String,
  AudioTechnology: String,
});

const connectionPortsAndExpansionFeatures = new Schema({
  TheWebOfCommunication: String,
  WirelessConnectivity: String,
  Webcams: String,
  KeyboardLight: String,
});

const sizeVolume = new Schema({
  Size: String,
  volume: String,
  Material: String,
});

const otherInformation = new Schema({
  BatteryInformation: String,
  ChargerCapacity: String,
  OperatingSystem: String,
  LaunchTime: String,
});

const product = new Schema({
  nameLaptop: String,

  ram: String,
  storage: [StorageSchema],

  //optionColorPrice: [optionColor],
  //optionRamPrice: [optionRam],
  //optionMemoryPrice: [optionMemory],

  price: String,
  image: [String],
  slug: String,
  productInformation: String,
  Specifications: {
    processor,
    ramMemory_hardDrive,
    screen,
    graphicsAndSound,
    connectionPortsAndExpansionFeatures,
    sizeVolume,
    otherInformation,
  },
});

const productModel = mongoose.model("productModel", product);

module.exports = {
  productModel,
};
