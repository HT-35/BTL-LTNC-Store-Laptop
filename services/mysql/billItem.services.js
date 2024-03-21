const { BillItem } = require("../../models/index");

const createBillItembyIdBill = async (
  id_Bill,
  idProductItem,
  quanlityItem,
  price_per_unit
) => {
  // console.log(id_Bill, idProductItem, quanlityItem, price_per_unit);

  const createBillItem = await BillItem.create({
    id_Bill,
    slug_Product: idProductItem,
    quanlity: quanlityItem,
    price_per_unit,
  });
  return createBillItem;
};

module.exports = {
  createBillItembyIdBill,
};
