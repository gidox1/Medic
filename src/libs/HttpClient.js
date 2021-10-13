
const axios = require('axios');
const token = process.env.ZOOM_TOKEN;

const axiosInstance = axios.create({
  timeout: 15000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

module.exports = axiosInstance;