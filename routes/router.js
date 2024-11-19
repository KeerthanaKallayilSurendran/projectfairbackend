const express = require('express')
// import the userController 
const userController = require('../controllers/userController')
const projectController = require('../controllers/projectController')
const jwtMiddlware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddlware')
// create object for Router class in express to set the path
const router = new express.Router()

router.post('/register', userController.registerController)
router.post('/login', userController.loginController)
router.post('/add-project', jwtMiddlware, multerMiddleware.single("projectImg"), projectController.addProjectController)
router.get('/home-project', projectController.homePageProjectController)
router.get('/all-project', jwtMiddlware, projectController.allProjectController)
router.get('/user-project', jwtMiddlware, projectController.userProjectController)




module.exports = router 