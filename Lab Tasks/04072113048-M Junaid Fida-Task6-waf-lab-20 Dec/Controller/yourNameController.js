const { City, User } = require('../Model/yourNameModel');

exports.getSignupPage = async (req, res) => {
  const cities = [
    { cityCode: "ISB", cityName: "Islamabad" },
    { cityCode: "RWP", cityName: "Rawalpindi" },
    { cityCode: "LHR" ,cityName:"Lahore"},
    { cityCode: "KHI", cityName: "Karachi" },
 ];
  
  res.render('signup', { cities });
};


exports.postSignup = async (req, res) => {
  const { name, gender, cityCode, dob, occupation } = req.body;
  try {
    const newUser = new User({ name, gender, cityCode, dob, occupation });
    await newUser.save();
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving user data.');
  }
};

exports.getProfile = async (req, res) => {
  const users = await User.find().populate('cityCode');
  res.render('profile', { users });
};

exports.updateProfile = async (req, res) => {
  const { id, name, gender, cityCode, dob, occupation } = req.body;
  try {
    await User.findByIdAndUpdate(id, { name, gender, cityCode, dob, occupation });
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating user data.');
  }
};
