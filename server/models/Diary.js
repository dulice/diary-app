const mongoose = require('mongoose');
const diarySchema = new mongoose.Schema({
    mood: {
        type: String,
        default: 'Happy',
    },
    date: {
        type: Date,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        photo: {type: String},
        public_id: {type: String},
    },
},{timestamps: true});

const Diary = mongoose.model('Diary', diarySchema);
module.exports = Diary;