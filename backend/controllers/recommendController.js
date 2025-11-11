const Track = require('../models/Track');
const User = require('../models/User');

exports.getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    let recs;
    if (user && user.likedGenres && user.likedGenres.length) {
      // find top tracks matching liked genres
      recs = await Track.find({ genres: { $in: user.likedGenres } })
                        .sort({ popularity: -1 })
                        .limit(20);
    } else {
      recs = await Track.find().sort({ popularity: -1 }).limit(20);
    }
    res.json(recs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
