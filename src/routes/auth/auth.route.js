import express from "express";
const router = express.Router();

import { signUp, signIn } from "../../controllers/auth.controller.js"

router.post('/sign-up',signUp)
router.post('/sign-in',signIn)

export default router;