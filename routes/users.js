const {Router} = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = Router()

router.get('/' , auth, async(req,res) => {
    try {
        const users = await User.find({})
        res.render('users', {
            isUsers: true,
            title: 'Users',
            users,
            role: req.user.role
        })
    } catch(e){
        console.log(e)
    }   
})



module.exports = router

