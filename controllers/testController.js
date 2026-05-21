const testController = (req, res) => {
  res.status(200).send({
    message: "Welcome Server",
    success: true,
  });
};

module.exports = { testController };
