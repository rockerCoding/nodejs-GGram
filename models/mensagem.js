const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Mensagem {

  buscaMensagensUsuarioById(id, res) {
    const sql = "select * from usuarios_has_conversas where idPessoaA = ? or idPessoaB = ?";
    conexao.query(sql, [id, id], (error, results) => {
      if(error) res.status(500).send("{'message':'Erro no servidor. Tente novamente mais tarde'}")
      else {
        res.status(200).send(results)
      }
    })     
  }

  buscaConversaByIdConversa(id, res){
    //const sql = "select * from mensagens where idConversa = ?"
    const sql = "select * from mensagens where idConversa = ? order by idMensagem desc" 

    conexao.query(sql, [id], (error, results) => {
      if(error) console.log(error)
      else {
        res.status(200).send(results)
      }
    })
  }

  inserirMensagem(body, res){
    const sql = `INSERT INTO mensagens (idConversa, idUsuarioEnvio, mensagem, visto) VALUES (${body.idConversa}, ${body.idUsuarioEnvio}, '${body.mensagem}', ${body.visto});`
    //console.log(sql)
    conexao.query(sql, (error, results) => {
      console.log(results)
      if(error) console.log(error)
      else res.status(201).send(results)
    })
  }

  apagarConversa(id, res){
    console.log(id)
    const sqlMensagens = `DELETE from mensages where idConversa = ${id}`
    conexao.query(sqlMensagens, (error, results) => {
      console.log("Mensagens da conversa " + id + " apagadas")
    })

    const sqlConversa = `DELETE from usuarios_has_conversas where idConversa = ${id}`;
    conexao.query(sqlConversa, (error, results) => {
      console.log(`Conversa ${id} apagada`)
    })

  }


  consultaExistenciaConversa(body, res){
    
    const sql = `SELECT * FROM usuarios_has_conversas where (idPessoaA = ${body.idUsuario} or idPessoaB = ${body.idUsuario}) and (idPessoaA = ${body.idAmigo} or idPessoaB = ${body.idAmigo})`
    conexao.query(sql, (error, results) => {
      console.log(results)
      if(error) res.send(null)
      else{
        if(results.length == 0) res.send(null)
        else res.send(results[0])
      }
    })
  }

  criaConversa(body, res){

    console.log(body)

    const sql = `insert into usuarios_has_conversas (idPessoaA, idPessoaB, ativoA, ativoB) VALUES (${body.idUsuario}, ${body.idAmigo}, null, null)`
    conexao.query(sql, (error, results) => {
      if(error) console.log(error)
      else res.send(results)
    })

  }

}

module.exports = new Mensagem