const moment = require('moment');
const conexao = require('../infraestrutura/conexao')

class Usuario {

  constructor(id, nome, foto, descricao) {
    this.id = id,
    this.nome = nome,
    this.foto = foto, 
    this.descricao = descricao
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
    const sql = `SELECT nome, descricao, foto, ultimaLocalizacao FROM usuarios WHERE idusuarios = ${id}`;

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

  buscaAmigos(id, res) {
    console.log(id)
    const sql = `select * from usuarios_has_amigos where idusuario = ? or idamigo = ?`
    
    conexao.query(sql,[id, id], (error, results) => {
      if(error) console.log(error)
      else res.status(200).send(results)
    })
  }


}

module.exports = new Usuario