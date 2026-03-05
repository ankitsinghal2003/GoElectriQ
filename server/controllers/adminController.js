import Booking from '../models/Booking.js';
import TourBooking from '../models/TourBooking.js';
import User from '../models/User.js';
import Driver from '../models/Driver.js';
import Package from '../models/Package.js';

export const getAllBookings = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const skip = (page - 1) * limit;
      
      const query = {};
      if (req.query.status) query.status = req.query.status;
      
      const bookings = await Booking.find(query)
        .populate('user', 'name email phone')
        .populate('driver', 'name phone vehicleDetails')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      
      const total = await Booking.countDocuments(query);
      
      res.status(200).json({
        success: true,
        data: {
          bookings,
          pagination: {
            total,
            page,
            pages: Math.ceil(total / limit),
          },
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
};

export const getAnalytics = async (req, res) => {
  try {
    const rideBookings = await Booking.countDocuments();
    const tourBookings = await TourBooking.countDocuments();
    const totalBookings = rideBookings + tourBookings;
    const completedBookings = await Booking.countDocuments({ status: 'completed' });
    const completedTourBookings = await TourBooking.countDocuments({ status: 'completed' });
    const activeUsers = await User.countDocuments({ isActive: true });
    const activeDrivers = await Driver.countDocuments({ status: 'active' });

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    const todayRideBookings = await Booking.countDocuments({ createdAt: { $gte: todayStart, $lte: todayEnd } });
    const todayTourBookings = await TourBooking.countDocuments({ createdAt: { $gte: todayStart, $lte: todayEnd } });
    const todayBookings = todayRideBookings + todayTourBookings;

    const rideRevenuePipeline = [
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$pricing.totalFare' } } },
    ];
    const tourRevenuePipeline = [
      { $match: { status: { $in: ['confirmed', 'completed'] } } },
      { $group: { _id: null, total: { $sum: '$pricing.totalAmount' } } },
    ];
    const rideRevenue = await Booking.aggregate(rideRevenuePipeline);
    const tourRevenue = await TourBooking.aggregate(tourRevenuePipeline);
    const totalRevenue = (rideRevenue[0]?.total || 0) + (tourRevenue[0]?.total || 0);

    res.status(200).json({
      success: true,
      data: {
        totalBookings,
        todayBookings,
        rideBookings,
        tourBookings,
        completedBookings: completedBookings + completedTourBookings,
        activeUsers,
        activeDrivers,
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Create tour package (Travel Tour or Temple Tour)
 */
export const createPackage = async (req, res) => {
  try {
    const {
      title,
      description,
      shortDescription,
      tourCategory,
      location,
      basePrice,
      durationDays,
      durationHours,
      coverImage,
    } = req.body;
    if (!title || !description || !tourCategory) {
      return res.status(400).json({
        success: false,
        message: 'Title, description and tour category are required',
      });
    }
    if (!['travel_tour', 'temple_tour'].includes(tourCategory)) {
      return res.status(400).json({
        success: false,
        message: 'tourCategory must be travel_tour or temple_tour',
      });
    }
    const price = basePrice ? Number(basePrice) : 0;
    const pkg = await Package.create({
      title,
      description,
      shortDescription: shortDescription || description.slice(0, 120),
      packageType: 'tour',
      tourCategory,
      location: location || '',
      basePrice: price,
      duration: {
        days: durationDays ? Number(durationDays) : 1,
        hours: durationHours ? Number(durationHours) : 0,
      },
      coverImage: coverImage || '',
      pricing: { sedan: price, suv: price + 500, hatchback: price + 200, luxury: price + 1000 },
      discount: req.body.discountPercent ? { percentage: Number(req.body.discountPercent), validFrom: new Date(), validTill: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) } : undefined,
      isActive: true,
    });
    res.status(201).json({
      success: true,
      message: 'Package created successfully',
      data: pkg,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get all packages (admin list)
 */
export const getAdminPackages = async (req, res) => {
  try {
    const { tourCategory } = req.query;
    const query = {};
    if (tourCategory) query.tourCategory = tourCategory;
    const packages = await Package.find(query).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: packages,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get all tour bookings (admin)
 */
export const getAdminTourBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;
    const query = {};
    if (req.query.status) query.status = req.query.status;

    const tourBookings = await TourBooking.find(query)
      .populate('user', 'name email phone')
      .populate('package', 'title coverImage tourCategory location')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await TourBooking.countDocuments(query);

    res.status(200).json({
      success: true,
      data: { tourBookings, pagination: { total, page, pages: Math.ceil(total / limit) } },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update tour booking status (admin)
 */
export const updateTourBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    const booking = await TourBooking.findByIdAndUpdate(
      id,
      { status, ...(adminNotes != null && { adminNotes }) },
      { new: true }
    )
      .populate('user', 'name email phone')
      .populate('package', 'title tourCategory');
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Tour booking not found' });
    }
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update package (admin)
 */
export const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const allowed = ['title', 'description', 'shortDescription', 'tourCategory', 'location', 'basePrice', 'coverImage', 'isActive'];
    const updates = {};
    for (const k of allowed) {
      if (req.body[k] !== undefined) updates[k] = k === 'basePrice' ? Number(req.body[k]) : req.body[k];
    }
    if (req.body.discountPercent !== undefined) {
      updates.discount = {
        percentage: Number(req.body.discountPercent),
        validFrom: new Date(),
        validTill: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      };
    }
    const pkg = await Package.findByIdAndUpdate(id, updates, { new: true });
    if (!pkg) return res.status(404).json({ success: false, message: 'Package not found' });
    res.status(200).json({ success: true, data: pkg });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Delete package (admin)
 */
export const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const pkg = await Package.findByIdAndDelete(id);
    if (!pkg) return res.status(404).json({ success: false, message: 'Package not found' });
    res.status(200).json({ success: true, message: 'Package deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};