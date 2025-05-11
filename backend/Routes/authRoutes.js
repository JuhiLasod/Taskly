import express from'express';
// import { Router } from 'express';
import {signupController} from "../Controller/signupController.js";
const router=express.Router();
console.log("reached to routes");
router.post("/signup",signupController);
export default router;