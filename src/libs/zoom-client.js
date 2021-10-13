const axiosInstance = require('./HttpClient');
const baseUrl = process.env.ZOOM_BASE_URL;

module.exports = {
  generateNurseMeetingUrl: async (email) => {
    email = 'gidox04@gmail.com'// test email
    return await axiosInstance.get(`${baseUrl}/v2/users/${email}`)
      .then(async(resp) => { 
        return resp.data 
      })
      .catch((error) => { throw error });
  }
}