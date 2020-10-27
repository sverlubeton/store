const {Router} = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = Router()

router.get('/' , auth, async(req,res) => {
    try {
        const users = await User.find({})
        const filter = users.filter((user) => user.role != true)
        res.render('users', {
            isUsers: true,
            title: 'Users',
            users: filter,
            role: req.user.role
        })
    } catch(e){
        console.log(e)
    }   
})

router.delete('/remove/:id',  async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    const users = await User.find({role: false})
    res.status(200).json({user, users})
  })


module.exports = router

