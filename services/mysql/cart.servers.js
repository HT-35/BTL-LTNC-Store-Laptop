const { CartUser } = require("../../models/index");

const findCartbyIdUser = async (id) => {
  try {
    // console.log("service : id =    ", id);
    const findCart = await CartUser.findAll({
      where: {
        id_user: id,
      },
      attributes: {
        exclude: ["id", "id_user", "updatedAt"],
      },
      order: [
        ["createdAt", "ASC"], // Sắp xếp theo thời gian khởi tạo tăng dần
        // Hoặc ['createdAt', 'DESC'] nếu bạn muốn sắp xếp giảm dần
        //["createdAt", "ASC"], // Sắp xếp theo thời gian khởi tạo tăng dần
      ],
    });

    return findCart;
  } catch (error) {
    throw new Error(
      "Lỗi khi tìm kiếm giỏ hàng theo id người dùng: " + error.message
    );
  }
};

module.exports = {
  findCartbyIdUser,
};
