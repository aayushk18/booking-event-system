import express from 'express'
import { checkAuth, login, logout, signup } from '../controllers/auth.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/login', login)
router.get("/check", protectRoute, checkAuth)
router.post('/logout', logout)
router.post('/signup', signup)


export default router;