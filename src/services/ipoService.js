
const IPO_SOURCE_URL = "https://ipos.markets/data/issues_index.json";


async function fetchIPOData() {
  const response = await fetch(IPO_SOURCE_URL);

  if (!response.ok) {
    throw new Error(`IPO source failed: ${response.status}`);
  }

  const data = await response.json();

  return data;
}


module.exports = { fetchIPOData };
