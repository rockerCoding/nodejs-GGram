const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Posts {

  buscarPostsByIds(ids, res) {
    
    const sql = `select * from posts where idUsuario in (${ids.toString()})`

    conexao.query(sql, (error, results) => {
      if(error){
        console.log(erro)
        const error = {
          "message" : "Erro ao buscar posts do usuário"
        }
        res.status(400).send(error);
      } else {
        res.status(200).send(results)
      }
      

    })
  }


}

module.exports = new Posts