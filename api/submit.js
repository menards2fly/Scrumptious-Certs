const axios = require('axios');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, udid, name, deviceType, deliveryType, revokeProtectionIncluded } = req.body;

  try {
    const response = await axios.post('https://dxsign.cc/api/register-udid', {
      email,
      udid,
      name,
      deviceType,
      deliveryType,
      revokeProtectionIncluded
    }, {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      }
    });

    res.status(200).json({ success: true, signing_id: response.data.signing_id });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false, message: 'API error' });
  }
}
