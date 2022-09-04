
const Posts = require('../models/posts');
const Usuarios = require('../models/posts')

module.exports = app => {

  app.post("/posts/buscartodos", (req, res) => {
    var ids = req.body;
    Posts.buscarPostsByIds(ids, res);
  })


}