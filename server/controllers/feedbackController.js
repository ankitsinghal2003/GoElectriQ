import Feedback from '../models/Feedback.js';

export const submitFeedback = async (req, res) => {
  try {
    const { name, mobile, feedback, rating } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }
    if (!mobile || !mobile.trim()) {
      return res.status(400).json({ success: false, message: 'Mobile number is required' });
    }
    if (!feedback || !feedback.trim()) {
      return res.status(400).json({ success: false, message: 'Feedback is required' });
    }

    const fb = await Feedback.create({
      name: name.trim(),
      mobile: mobile.trim().replace(/\s/g, ''),
      feedback: feedback.trim(),
      rating: rating && rating >= 1 && rating <= 5 ? Number(rating) : null,
    });

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      data: { _id: fb._id },
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const msg = Object.values(err.errors)[0]?.message || 'Validation failed';
      return res.status(400).json({ success: false, message: msg });
    }
    console.error('Submit feedback error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to submit feedback' });
  }
};
