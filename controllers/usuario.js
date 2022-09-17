const Usuarios = require('../models/usuarios')

module.exports = app => {

  app.post('/usuarios/login', (req, res) => {
    const user = req.body;
    Usuarios.logar(user, res)
  })

  app.get('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Usuarios.buscarUsuario(id, res);  
  })

  app.get('/usuarios/', (req, res) => {
    Usuarios.listaUsuarios(res);
  })

  app.post('/usuarios/criar', (req, res) => {
    const usuario = req.body;
    Usuarios.criarUsuario(usuario, res);
  })

  app.post("/usuarios/buscanomeusuario", (req, res) => {
    const id = req.body.id;    
    Usuarios.buscaNomeUsuario(id, res);
  })

  app.get("/usuarios/amigos/:id", (req, res) => {
    const id = req.params.id
    Usuarios.buscaAmigos(id, res)
  })



}