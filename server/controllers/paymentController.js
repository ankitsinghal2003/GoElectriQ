import { createRazorpayOrder } from '../config/razorpay.js';
import Payment from '../models/Payment.js';
import Booking from '../models/Booking.js';

export const createPaymentOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }
    
    const order = await createRazorpayOrder(
      booking.pricing.totalFare,
      bookingId
    );
    
    const payment = await Payment.create({
      booking: bookingId,
      user: req.user._id,
      amount: booking.pricing.totalFare,
      razorpayOrderId: order.id,
      paymentMethod: 'razorpay',
      status: 'pending',
    });
    
    res.status(200).json({
      success: true,
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};