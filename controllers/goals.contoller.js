const asyncHandler = require('express-async-handler')
const GoalsSchema = require('../models/goalModel')

// @desc        Get goals
// @route       GET api/goals
// @acess       Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await GoalsSchema.find({ user: req.user.id });
    return res.status(200).json({ message: "Goals are here", data: goals })
})

// @desc        Set goal
// @route       POST api/goals
// @acess       Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await GoalsSchema.create({
        user: req.user.id,
        text: req.body.text
    })

    return res.status(200).json({ message: "Goal is created", goal })
})


// @desc        Update goal
// @route       PUT api/goals/:id
// @acess       Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await GoalsSchema.findById(req.params.id);

    if (!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }

    // make sure the logged in user matches the goal user
    if (goal.user !== req.user.id) {
        res.status(401)

        throw new Error("User not authorised")
    }

    const updatedGoal = await GoalsSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });

    return res.status(200).json({ message: `Goal is updated id is: ${req.params.id}`, goal: updatedGoal })
})

// @desc        Set goal
// @route       DELETE api/goals/:id
// @acess       Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await GoalsSchema.findById(req.params.id);

    if (!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }

    // make sure the logged in user matches the goal user
    if (goal.user !== req.user.id) {
        res.status(401)

        throw new Error("User not authorised")
    }

    await goal.remove()

    return res.status(200).json({ message: `Goal is deleted id is: ${req.params.id}` })
})


module.exports = {
    getGoals,
    setGoal,
    deleteGoal,
    updateGoal
}