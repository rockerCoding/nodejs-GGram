
const Login = require('../models/login')
const Usuarios = require('../models/usuarios')

module.exports = app => {

  app.post('/login', (req, res) => {
    Login.sendLogin(req.body, res)
  })


}