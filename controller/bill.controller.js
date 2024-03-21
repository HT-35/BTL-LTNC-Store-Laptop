const { createBillService } = require("../services/mysql/bill.services");
const { getDetailProductBySlug } = require("../services/product.services");

const {
  createBillItembyIdBill,
} = require("../services/mysql/billItem.services");

const createBillController = async (req, res) => {
  const id_user = req.infoUser.id;

  let total = 0;

  const { id_product, quanlity, email_address, numberPhone, id_address } =
    req.body;

  let arrPrice = [];

  for (let i = 0; i < id_product.length; i++) {
    const findProduct = await getDetailProductBySlug(id_product[i]);

    const { price } = findProduct;

    let priceProduct = Number(price * quanlity[i]);

    // console.log(`${i}    : `, quanlity[i]);
    arrPrice.push(price);
    total += priceProduct;
  }
  const createBill = await createBillService({ id_user, id_address, total });

  const id_Bill = createBill.dataValues.id;
  for (let i = 0; i < id_product.length; i++) {
    const idProductItem = id_product[i];
    const quanlityItem = quanlity[i];
    const price_per_unit = arrPrice[i];

    console.log(id_Bill, idProductItem, quanlityItem, price_per_unit);

    const data = {
      id_Bill,
      id_product: idProductItem,
      quanlity: quanlityItem,
      price_per_unit,
    };

    const createBillItem = await createBillItembyIdBill(
      id_Bill,
      idProductItem,
      quanlityItem,
      price_per_unit
    );
  }

  // console.log("====================================");
  // console.log(id_Bill);
  // console.log("====================================");

  res.status(200).json({
    status: true,
    data: id_Bill,
  });
};

module.exports = {
  createBillController,
};
