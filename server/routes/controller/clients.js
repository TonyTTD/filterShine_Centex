const { getClientsDB, addClient, updateServiceDate, updateServiceCycle } = require('../../../database/controller/clients.js');

module.exports = {
  getAllClients: async (req, res) => {
    try {
      const clients = await getClientsDB();
      res.status(200).json(clients);
    }
    catch (err) {
      res.status(404).json({
        message: `error: ${err}`
      });
    }
  },
  updateClientServiceDate: async (req, res) => {
    try {
      const updatedServiceDate = await updateServiceDate(req.body.newDate, req.body.clientId);
      res.status(200).json(updatedServiceDate);
    }
    catch (err) {
      res.status(404).json({
        message: `error: ${err}`
      });
    }
  },
  updateClientCycle: async (req, res) => {
    try {
      const updatedCycle = await updateServiceCycle(req.body.newCycle, req.body.clientId)
      res.status(200).json(updatedCycle);
    }
    catch (err) {
      res.status(404).json({
        message: `error: ${err}`
      });
    }
  },
};