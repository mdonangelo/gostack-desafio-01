// Importações
const express = require('express');

// Informações do servidor
const server = express();
server.use(express.json());

// Middleware: Contar número de requisições
server.use((req, res, next) => {
  console.count("Número de requisições");
  return next();
});

// Middleware: Verificar existência do ID requisitado 
function verifyId(req, res, next){
  const { id } = req.params;
  for(let i = 0; i < projects.length; i++){
    if(projects[i].id == id){
      return next();
    }
  }
  return res.status(400).json({error: "ID does not exist."});
}

// CRUD
const projects = [];

// Selecionar todos os projetos
server.get('/projects', (req, res) =>{
  return res.json(projects);
});

// Inserir novos projetos
server.post('/projects', (req, res) => {
  let { id, title } = req.body;
  
  const project = {
    id,
    title,
    tasks: []
  } 
  projects.push(project);

  return res.json(project);
});

// Inserir novas tasks nos projetos
server.post('/projects/:id/tasks', verifyId, (req, res) =>{
  const { id } = req.params;
  const { title } = req.body;

  for(let i = 0; i < projects.length; i++){
    if(projects[i]['id'] == id){
      projects[i]['tasks'].push(title);
    }
  }

  return res.send();
});

// Inserir novos projetos
server.put('/projects/:id', verifyId, (req, res) => {
  const { id } = req.params;
  
  let project = null;
  
  for(let i = 0; i < projects.length; i++){
    if(projects[i]['id'] == id){
      const { title } = req.body;
      project = projects[i];

      project.title = title;

    }
  }

  return res.json(project);
});

// Deletar projetos
server.delete('/projects/:id', verifyId, (req, res) => {
 const { id } = req.params;
 for(let i = 0; i < projects.length; i++){
    if(projects[i]['id'] == id){
      projects.splice(i, 1);
    }
  }
  return res.json(projects);
});

// Porta do servidor
server.listen(3333);