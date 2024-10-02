const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// Create an Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Adjust to your frontend URL if different
}));
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static files from the uploads directory

// MongoDB connection (Replace with your actual MongoDB URI)
mongoose.connect('mongodb://localhost:27017/events')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Define the Event schema
const eventSchema = new mongoose.Schema({
    title: String,
    date: String,
    category: String,
    description: String,
    img: String,
});

// Create a model from the schema, using the 'loader' collection
const Event = mongoose.model('Event', eventSchema, 'loader');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    },
});

const upload = multer({ storage });

// Endpoint to fetch all events
app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching events' });
    }
});

// Updated endpoint to fetch an event by '_id'
app.get('/api/events/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id); // Use findById to fetch by MongoDB's _id
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching event' });
    }
});

// Endpoint to create a new event
app.post('/api/events', upload.single('eventImage'), async (req, res) => {
    try {
        const { title, date, category, description } = req.body;
        const img = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null; // Full URL to the image

        const newEvent = new Event({ title, date, location, description, img });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating event' });
    }
});

// General error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
