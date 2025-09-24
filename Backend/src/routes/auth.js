const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user._id, email: user.email } });
});



// Get logged-in user info
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});




// // PUT /api/auth/me  --> update current logged-in user
// router.put("/me", authMiddleware, async (req, res) => {
//   try {
//     // Only allow certain fields to be updated
//     const allowed = ["phone", "location", "bio"];
//     const updates = {};
//     for (const key of allowed) {
//       if (req.body[key] !== undefined) updates[key] = req.body[key];
//     }

//     if (Object.keys(updates).length === 0) {
//       return res.status(400).json({ message: "No valid fields to update." });
//     }

//     const userId = req.user?.id; // auth middleware must set req.user
//     if (!userId) return res.status(401).json({ message: "Unauthorized" });

//     const updated = await User.findByIdAndUpdate(
//       userId,
//       { $set: updates },
//       { new: true, runValidators: true, select: "-password" }
//     );

//     if (!updated) return res.status(404).json({ message: "User not found" });

//     return res.json(updated);
//   } catch (err) {
//     console.error("PUT /api/auth/me error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });


// PUT /api/auth/me  --> update current logged-in user
router.put("/me", authMiddleware, async (req, res) => {
  try {
    // Allow name, dob, phone, location, bio to be updated (email remains read-only)
    const allowed = ["name", "dob", "phone", "location", "bio"];
    const updates = {};
    
    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields to update." });
    }

    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const updated = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true, select: "-password" }
    );

    if (!updated) return res.status(404).json({ message: "User not found" });

    // Return the updated user object
    return res.json({ user: updated }); // Wrap in user object for consistency
  } catch (err) {
    console.error("PUT /api/auth/me error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});




module.exports = router;
