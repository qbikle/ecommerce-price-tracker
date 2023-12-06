const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://shubham:I6Z64WHDSaS08HrY@cluster0.5tl5lzf.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI)
    .then(() => console.log('connected to mongodb'))
    .catch((err) =>
    console.log('error connecting to mongodb', err))

module.exports = mongoose;

