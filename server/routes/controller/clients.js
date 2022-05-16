const { getClientsDB } = require('../../../database/controller/clients.js');

module.exports = {
  getClientsByDate: async (req, res) => {
    try {
      console.log('reached');
      const clients = await getClientsDB();
      res.json(clients);
      // res.status(200).json({
      //   message: 'Successful',
      //   clients
      // });
    }
    catch (err) {
      res.status.json({
        message: 'error',
        err
      });
    }
  },
};