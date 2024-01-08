// establishing a connection to MongoDB using mongoose

const mongoose =  require('mongoose');

mongoose.connect('mongodb+srv://Ghost:u3C9kOgzc4U5HtHR@cluster0.fewqpdu.mongodb.net/', {
    useNewUrlParser: true,
    UseUnifiedTopology: true,
});

const db =  mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.once( 'open', () => {
    console.log('Connected to MongoDB');
});