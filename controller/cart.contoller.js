const cartUser = async (req, res) => {
  try {
      const { email, numberPhone } = req.data;
      
    //   cart : id , id_user ,id_product,

    const findCartbyEmailOrNumberPhone = findCartbyEmailOrNumberPhone(
      email,
      numberPhone
    );
    res.status(200).json({
      status: true,
      data: email,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      data: error,
    });
  }
};

module.exports = {
  cartUser,
};
