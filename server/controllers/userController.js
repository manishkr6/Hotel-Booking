// GET / api/user

export const getUserData = async (req, res) => {
  try {
    const role = req.user.role;
    const recentSearchedCity = req.user.recentSearchedCity;

    res.json({ success: true, role, recentSearchedCity });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
