import { indiaCities } from '../data/indiaCities.js';
import { services } from '../data/serviceData.js';

export const getCities = async (_req, res) => {
  return res.json(indiaCities);
};

export const getServices = async (req, res) => {
  const city = req.query.city;
  return res.json({ city: city || 'All Cities', services });
};

export const getServiceDetails = async (req, res) => {
  const service = services.find((item) => item.id === req.params.serviceId);

  if (!service) {
    return res.status(404).json({ message: 'Service not found' });
  }

  return res.json(service);
};

export const getWorkerDetails = async (req, res) => {
  const { serviceId, workerId } = req.params;
  const service = services.find((item) => item.id === serviceId);

  if (!service) {
    return res.status(404).json({ message: 'Service not found' });
  }

  const worker = service.workers.find((item) => item.id === workerId);
  if (!worker) {
    return res.status(404).json({ message: 'Worker not found' });
  }

  return res.json({ ...worker, serviceName: service.name, serviceDescription: service.description });
};
