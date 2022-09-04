const Mensagem = require('../models/mensagem')

module.exports = app => {

  app.post('/mensagens/listamensagensusuario', (req, res) => {
    const id = req.body.id;
    Mensagem.buscaMensagensUsuarioById(id, res)
  })

  app.post('/mensagens/conversa', (req, res) => {
    const id = req.body.id;
    Mensagem.buscaConversaByIdConversa(id, res)
  })

  app.post('/mensagens/inserir', (req, res) => {
    const body = req.body
    Mensagem.inserirMensagem(body, res)    
  })

  app.delete('/conversa/apagar/:id', (req, res) => {
    Mensagem.apagarConversa(req.params.id, res)
  })

  app.post("/conversa/usuario", (req, res) => {
    const body = req.body
    Mensagem.consultaExistenciaConversa(body, res)
  })

  app.post("/conversa/criar", (req, res) => {
    const body = req.body
    Mensagem.criaConversa(body, res)
  })
}