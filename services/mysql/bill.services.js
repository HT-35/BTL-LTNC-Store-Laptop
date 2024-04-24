const { Bill } = require("../../models/index");
const { BillItem } = require("../../models/index");

const createBillService = async ({ id_user, id_address, total }) => {
  console.log(id_user, id_address, total);
  const createBill = await Bill.create({ id_user, id_address, total });
  return createBill;
};

// const findBillDetailService = async (id_Bill) => {
//   const findBillDetail = await Bill.findAll({
//     where: { id: id_Bill },
//     include: [
//       {
//         model: BillItem,
//         as: "Billitem", // Tên alias của mối quan hệ
//       },
//     ],
//   });
//   return findBillDetail;
// };

const findBillDetailService = async (id_Bill) => {
  try {
    const findBillDetail = await Bill.findOne({
      where: { id: id_Bill },
      include: [
        {
          model: BillItem,
          as: "Billitems", // Sử dụng tên alias đã cập nhật của mối quan hệ
        },
      ],
    });

    return findBillDetail;
  } catch (error) {
    console.error("Lỗi khi tìm kiếm hóa đơn:", error);
    throw error;
  }
};

const findBillAllByIDService = async (id_user) => {
  try {
    const findBillAll = await Bill.findAll({
      where: { id_user: id_user },
      include: [
        {
          model: BillItem,
          as: "Billitems", // Sử dụng tên alias đã cập nhật của mối quan hệ
        },
      ],
    });

    return findBillAll;
  } catch (error) {
    console.error("Lỗi khi tìm kiếm hóa đơn:", error);
    throw error;
  }
};

const findBillAllAdminService = async () => {
  try {
    const findBillAll = await Bill.findAll({
      include: [
        {
          model: BillItem,
          as: "Billitems", // Sử dụng tên alias đã cập nhật của mối quan hệ
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return findBillAll;
  } catch (error) {
    console.error("Lỗi khi tìm kiếm hóa đơn:", error);
    throw error;
  }
};

module.exports = {
  createBillService,
  findBillDetailService,
  findBillAllByIDService,
  findBillAllAdminService,
};
