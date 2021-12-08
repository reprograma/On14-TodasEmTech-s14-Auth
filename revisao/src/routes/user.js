const express = require("express")
const router = express.Router()

const usercontroller = require("../controller/user")



//@route Post/Api/users/
//@desc lista todos os usuarios
//@acess Public


router.get("/" , usercontroller.getUsers )

//@route Post/Api/users/
//@desc cadastra
//@acess Public

router.post("/register" , usercontroller.register)

//@route Post/Api/users/
//@desc cadastra login
//@acess Public

router.post("/login" ,usercontroller.login )


module.exports = router
