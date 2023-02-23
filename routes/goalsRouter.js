const express = require('express')
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goals.contoller')
const protect = require('../middleware/protectMiddleware')
const router = express.Router()

router.route('/').get(protect, getGoals).post(protect, setGoal)

router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)


module.exports = router

