const express = require("express")
const auth =require("../middleware/auth")
const {signupHandler,loginHandler} = require("../controllers/signupHandller")
const router = express.Router()
router.post("/login",loginHandler)
router.post("/signup",signupHandler)
router.get("/get",(req,res)=>{
    res.json({"message":"handler"})

})
module.exports=router;