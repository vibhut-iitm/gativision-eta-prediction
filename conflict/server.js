const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'GatiVision backend is running',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/trains', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: '12625', name: 'Karnataka Express', status: 'Running late' },
      { id: '12951', name: 'Mumbai Rajdhani', status: 'On schedule' },
      { id: '12009', name: 'Shatabdi Express', status: 'Delayed' },
    ],
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
