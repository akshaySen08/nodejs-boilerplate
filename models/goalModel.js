const { timeStamp } = require('console')
const mongoose = require('mongoose')

const GoalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, "Please add text string"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Goals", GoalSchema)