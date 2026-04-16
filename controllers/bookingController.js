import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
  try {
    const { city, serviceId, serviceName, workerId, workerName, date, time, address, notes } = req.body;

    if (!city || !serviceId || !serviceName || !workerId || !workerName || !date || !time || !address) {
      return res.status(400).json({ message: 'Please fill all required booking fields' });
    }

    const booking = await Booking.create({
      user: req.user.id,
      city,
      serviceId,
      serviceName,
      workerId,
      workerName,
      date,
      time,
      address,
      notes
    });

    return res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Booking failed' });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.json(bookings);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Unable to fetch bookings' });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized to delete this booking' });
    }

    await booking.deleteOne();
    return res.json({ message: 'Booking successfully deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete booking' });
  }
};
