const mongoose = require("mongoose");

const processor = new Schema({
  cpuTechnology: string,
  multiplier: string,
  numberOfStreams: string,
  cpuSpeed: string,
  maxSpeed: string,
  caching: string,
});

const ramMemory_hardDrive = new Schema({
  ram: string,
  ramType: string,
  ramBusSpeed: string,
  MaximumRamSupport: string,
  HardDrive: string,
});
const Screen = new Schema({
  ram: string,
  ramType: string,
  ramBusSpeed: string,
  MaximumRamSupport: string,
  HardDrive: string,
});

const product = new Schema({
  nameLaptop: {
    type: String,
  },
  color: {
    type: String,
  },
  price: {
    type: String,
  },
  image: {
    type: String,
  },
  productInformation: {
    type: String,
  },
  Specifications: [],
});
