import express from'express';
// import { Router } from 'express';
import {signupController} from "../Controller/signupController.js";
import {loginController} from "../Controller/loginController.js";
const router=express.Router();
console.log("reached to routes");
router.post("/signup",signupController);
router.post("/login",loginController);
export default router;