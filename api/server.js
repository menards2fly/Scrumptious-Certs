const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });
const apiKey = 'YOUR_API_KEY';  // Replace with your actual DxSign API key

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

app.post('/submit', upload.single('document'), async (req, res) => {
  const email = req.body.email;
  const documentPath = req.file.path;

  try {
    const fileBuffer = fs.readFileSync(documentPath);
    const documentBase64 = fileBuffer.toString('base64');

    const response = await axios.post('https://dxsign.cc/api/sign', {
      document: documentBase64,
      email: email
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    fs.unlinkSync(documentPath); // Cleanup uploaded file
    res.json({ success: true, signing_id: response.data.signing_id });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: 'API request failed.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
