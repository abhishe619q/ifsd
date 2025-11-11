require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/recommendations', require('./routes/recommendRoutes'));

// simple seed endpoint (optional) to add sample tracks
app.post('/api/seed', async (req, res) => {
  const Track = require('./models/Track');
  const sample = [
    { title: 'Sunshine', artist: 'Artist A', genres: ['pop'], popularity: 50 },
    { title: 'Night Drive', artist: 'Artist B', genres: ['electronic','dance'], popularity: 80 },
    { title: 'Rock Anthem', artist: 'Artist C', genres: ['rock'], popularity: 60 }
  ];
  await Track.deleteMany({});
  await Track.insertMany(sample);
  res.json({ message: 'seeded' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
