
const { fetchIPOData } = require("../services/ipoService");

async function getIPOListings(req, res) {
  try {
    const data = await fetchIPOData();
    const issues = data.issues || [];

    const today = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const open = issues.filter((ipo) => {
      return (
        ipo.open &&
        ipo.close &&
        ipo.open <= today &&
        ipo.close >= today
      );
    });

    const upcoming = issues.filter((ipo) => {
      return ipo.open && ipo.open > today;
    });

    res.status(200).json({
      success: true,
      open,
      upcoming,
    });
  } catch (error) {
    console.error("IPO listing error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch IPO listings",
    });
  }
}

module.exports = { getIPOListings };
