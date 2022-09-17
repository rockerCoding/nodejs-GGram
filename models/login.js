const moment = require('moment');
const conexao = require('../infraestrutura/conexao');

class Login {

  constructor(identifier, password) {
    this.identifier = identifier,
    this.password = password
  }

  sendLogin(login, res) {
    const sql = "select idusuario, nome, descricao, foto, dataCriacao, ultimaLocalizacao, identifier, email from usuarios where (identifier = ? or email = ?) and password = ?";
    conexao.query(sql, [login.identifier, login.identifier, login.password], (error, results) => {
      if(error) res.status(500).send("{'message':'Erro no servidor. Tente novamente mais tarde'}")
      else {
        if(results.length > 0){
          res.status(200).json(results[0])
        } else {
          const erro = {
            "message" : "Usuário ou senha incorreta. Tente novamente"
          }
          res.status(403).json(erro)
        }
      }
    })    
  }



}

module.exports = new Login