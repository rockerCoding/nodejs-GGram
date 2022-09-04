const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Usuario {

  logar(user, res) {
    const sql = "select nome, descricao, foto from usuarios where nome = ? and password = ?";
    conexao.query(sql, [user.login, user.pass], (error, results) => {
      if(error) res.status(500).send("{'message':'Erro no servidor. Tente novamente mais tarde'}")
      else {
        if(results.length > 0){
          res.status(200).json(results[0])
        } else {
          const erro = {
            "message" : "Usuário ou senha incorreta. Tente novamente"
          }
          res.json(erro)
        }
      }
    })    
  }

  criarUsuario(usuario, res) {
    const sql = "insert into usuarios set ?"

    const dataCriacao = new Date()
    const user = { ...usuario, dataCriacao }

    conexao.query(sql, user, (error, results) => {
      if (error) res.status(400).json(error)
      else {
        res.status(201).send("Usuário cadastrado com sucesso");
      }
    });

  }

  listaUsuarios(res) {
    const sql = "SELECT * from usuarios";

    conexao.query(sql, (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(results);
      }
    })
  }

  buscarUsuario(id, res) {
    const sql = `SELECT * FROM usuarios WHERE idusuarios = ${id}`;

    conexao.query(sql, (error, results) => {
      const usuario = results && results[0];
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(usuario);
      }
    })
  }

  buscaNomeUsuario(id, res){
    const sql = `select nome from usuarios where idusuarios = ${id}`;
    
    conexao.query(sql, (error, results) => {
      if(error) console.log(error)
      else res.send(results[0])
    })
  }


}

module.exports = new Usuario