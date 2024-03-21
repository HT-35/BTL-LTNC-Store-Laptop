const { Bill } = require("../../models/index");

const createBillService = async ({ id_user, id_address, total }) => {
  const createBill = await Bill.create({ id_user, id_address, total });
  return createBill;
};

module.exports = {
  createBillService,
};
