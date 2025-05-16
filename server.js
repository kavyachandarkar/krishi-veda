const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/krishi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    submission_date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('data', contactSchema); // 'data' is your collection name

// Handle form submission
app.post('/submit_form', (req, res) => {
    const { name, email, message } = req.body;

    const newContact = new Contact({ name, email, message });

    newContact.save()
        .then(() => res.send('Message received!'))
        .catch(err => res.status(400).send('Error saving message: ' + err));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
