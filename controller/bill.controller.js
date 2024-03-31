const {
  createBillService,
  findBillDetailService,
} = require("../services/mysql/bill.services");
const { getDetailProductBySlug } = require("../services/product.services");

const {
  createBillItembyIdBill,
} = require("../services/mysql/billItem.services");

const createBillController = async (req, res) => {
  try {
    const id_user = req.infoUser.id;

    let total = 0;

    const { id_product, quanlity, email_address, numberPhone, id_address } =
      req.body;

    let arrPrice = [];

    // tinh tong ToTal để tạo db Bill
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
    // tao từng Bill Item
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

    res.status(200).json({
      status: true,
      data: createBill,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      data: error.message,
    });
  }
};

const getBillAllController = async (req, res) => {
  try {
    const id_user = req.infoUser.id;

    const { idBill } = req.body;

    const findBillDetail = await findBillDetailService(idBill);

    console.log(findBillDetail);

    res.status(200).json({
      status: true,
      data: findBillDetail,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      data: error.message,
    });
  }
};

module.exports = {
  createBillController,
  getBillAllController,
};
