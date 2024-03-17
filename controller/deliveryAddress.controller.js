const createDeliveryAddress = async (req, res) => {
  const id = req.infoUser.id;

  const data = req.body;
  console.log("====================================");
  console.log(data);
  console.log("====================================");

  res.status(200).json({
    status: true,
    data: data,
  });
};

module.exports = {
  createDeliveryAddress,
};
