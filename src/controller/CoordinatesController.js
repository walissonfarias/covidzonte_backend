module.exports = {
  async index(req, res) {
    return res.status(200).json({
      code: 200,
      message: 'Welcome to CovidZone API',
    });
  },
};
