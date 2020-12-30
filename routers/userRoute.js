const router = require('express').Router()
const { loginPostController, registerPostController } = require('../controllers/userController')

//Registation
router.post('/register', registerPostController)

router.post('/login', loginPostController)

module.exports = router