
function getDateRange(query) {
  const { startDate, endDate } = query;

  if (startDate && Number.isNaN(Date.parse(startDate))) {
    const error = new Error("Invalid startDate");
    error.statusCode = 400;
    throw error;
  }

  if (endDate && Number.isNaN(Date.parse(endDate))) {
    const error = new Error("Invalid endDate");
    error.statusCode = 400;
    throw error;
  }

  if (
    startDate &&
    endDate &&
    new Date(startDate) > new Date(endDate)
  ) {
    const error = new Error("startDate cannot be after endDate");
    error.statusCode = 400;
    throw error;
  }

  const dateFilter = {};

  if (startDate) {
    dateFilter.$gte = new Date(startDate);
  }

  if (endDate) {
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    dateFilter.$lte = end;
  }

  return startDate || endDate ? dateFilter : null;
}

module.exports = getDateRange;
