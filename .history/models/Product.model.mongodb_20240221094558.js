const mongoose = require("mongoose");

const { Schema } = mongoose;

const optionColor = new Schema({
  color: String,
  price: String,
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

const Screen = new Schema({
  screen: String,
  resolution: String,
  scanFrequency: String,
  colorCoverage: String,
  screenTechnology: String,
});

const GraphicsAndSound = new Schema({
  GraphicCard: String,
  AudioTechnology: String,
});

const connectionPortsAndExpansionFeatures = new Schema({
  TheWebOfCommunication: String,
  WirelessConnectivity: String,
  Webcams: String,
  KeyboardLight: String,
});

const SizeVolume = new Schema({
  Size: String,
  volume: String,
  Material: String,
});

const OtherInformation = new Schema({
  BatteryInformation: String,
  ChargerCapacity: String,
  OperatingSystem: String,
  LaunchTime: String,
});

const product = new Schema({
  nameLaptop: String,
  color: String,
  price: String,
  image: String,
  productInformation: String,
  Specifications: {
    processor,
    ramMemory_hardDrive,
    Screen,
    GraphicsAndSound,
    connectionPortsAndExpansionFeatures,
    SizeVolume,
    OtherInformation,
  },
});

const productModel = mongoose.model("productModel", product);

module.exports = {
  productModel,
};
