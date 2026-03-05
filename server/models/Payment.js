import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    paymentMethod: {
      type: String,
      enum: ['razorpay', 'cash', 'wallet', 'upi'],
      required: true,
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    status: {
      type: String,
      enum: ['pending', 'success', 'failed', 'refunded'],
      default: 'pending',
    },
    transactionId: {
      type: String,
      unique: true,
    },
    paymentDetails: {
      method: String,
      email: String,
      contact: String,
      bank: String,
      wallet: String,
      vpa: String,
      cardId: String,
      cardNetwork: String,
      cardType: String,
    },
    refund: {
      refundId: String,
      amount: Number,
      reason: String,
      status: {
        type: String,
        enum: ['pending', 'processed', 'failed'],
      },
      processedAt: Date,
    },
    paidAt: Date,
    failureReason: String,
    attempts: {
      type: Number,
      default: 1,
    },
    ipAddress: String,
    userAgent: String,
  },
  {
    timestamps: true,
  }
);

// Generate transaction ID before saving
paymentSchema.pre('save', async function (next) {
  if (!this.transactionId) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    this.transactionId = `TXN${year}${month}${day}${random}`;
  }
  next();
});

// Index for faster queries
paymentSchema.index({ booking: 1 });
paymentSchema.index({ user: 1 });
paymentSchema.index({ transactionId: 1 });
paymentSchema.index({ razorpayPaymentId: 1 });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;