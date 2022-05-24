const { getClientsDB } = require('../../../database/controller/clients.js');

module.exports = {
  getClientsByDate: async (req, res) => {
    try {
      console.log('reached');
      const clients = await getClientsDB();
      res.status(200).json(clients);
    }
    catch (err) {
      res.status(404).json({
        message: `error: ${err}`
      });
    }
  },
};