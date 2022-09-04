class Tabelas {
  init(conexao){
    this.conexao = conexao;
    
    this.criarTabelaUsuarios()
  }

  criarTabelaUsuarios(){

    const sql = "CREATE TABLE IF NOT EXISTS guigram.usuarios ("+
      "idusuarios INT NOT NULL AUTO_INCREMENT, " +
      "nome VARCHAR(70) NOT NULL, " +
      "descricao VARCHAR(256) NOT NULL, " +
      "foto BLOB NULL, " +
      "PRIMARY KEY (idusuarios));"

    this.conexao.query(sql, (error) => {
      if(error) console.log(error)
      else{
        console.log("Tabela usuários criada com sucesso")
      }
    })

  }
}

module.exports = new Tabelas;