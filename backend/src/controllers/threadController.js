const Post = require('../model/Threads');

const searchKeyword = async (req, res) => {
  const { keyword } = req.body;
  try {
    const threads = await Threads.find({
      name: { $regex: keyword, $options: 'i' },
      // the line above allows us to find any name containing keyword
    }).limit(5);
    res.json({ threads: threads });
  } catch {
    res.sendStaus(401);
  }
};

module.exports = { searchKeyword };
