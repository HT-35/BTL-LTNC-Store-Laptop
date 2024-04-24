const { where } = require("sequelize");
const { Address } = require("../../models/index");

const createDeliveryShippingService = async (data) => {
  try {
    if (!data) return "service missing";
    const createDeleveryAddress = await Address.create(data);

    return createDeleveryAddress;
  } catch (error) {
    return error;
  }
};
const findAllDeliveryAddressService = async (id_User) => {
  try {
    if (!id_User) return "service missing id_User";
    console.log(id_User);
    const createDeleveryAddress = await Address.findAll({
      where: {
        id_User: id_User,
      },
    });

    return createDeleveryAddress;
  } catch (error) {
    return error;
  }
};
const findDetailDeliveryAddressService = async ({ id }) => {
  try {
    if (!id) return "service missing id";
    const createDeleveryAddress = await Address.findOne({
      where: {
        id,
      },
    });

    return createDeleveryAddress;
  } catch (error) {
    return error;
  }
};

const updateDetailDeliveryAddressService = async ({ id, data }) => {
  try {
    if (!data || !id) return "service missing id";
    const createDeleveryAddress = await Address.update(data, {
      where: {
        id,
      },
    });

    return createDeleveryAddress;
  } catch (error) {
    return error;
  }
};

const deleteDeliveryAddressService = async ({ id }) => {
  try {
    if (!id) return "service missing id";
    const deleteDetailAddress = await Address.destroy({
      where: {
        id,
      },
    });

    return deleteDetailAddress;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createDeliveryShippingService,
  findAllDeliveryAddressService,
  findDetailDeliveryAddressService,
  updateDetailDeliveryAddressService,
  deleteDeliveryAddressService,
};
