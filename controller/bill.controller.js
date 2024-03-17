const createBillController = async (req, res) => {
  const idUser = req.infoUser.id;

  const { id_product, quanlity, email_address, numberPhone, address } =
    req.body;

  res.status(200).json({
    status: true,
    data: { idUser, id_product, quanlity, email_address, numberPhone, address },
  });
};

module.exports = {
  createBillController,
};
