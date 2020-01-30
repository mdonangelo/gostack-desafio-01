const express = require('express');
const server = express();

server.use(express.json());

let aux = 0; 

// Middlewares
server.use((req, res, next) => {
  next();
  aux++;
  console.log(`Total de requisições: ${aux}`);
});

function verifyId(req, res, next){
  const { id } = req.params;
  for(let i = 0; i < projects.length; i++){
    if(projects[i].id == id){
      return next();
    }
  }
  return res.json({message: "Id does not exist."});
}

// CRUD
const projects = [
  {
    "id": 1,
    "title": "Terceira :)",
    "tasks": []
  },
  {
    "id": 2,
    "title": "Terceira :)",
    "tasks": []
  },
  {
    "id": 3,
    "title": "Terceira :)",
    "tasks": []
  }
];

server.get('/projects', (req, res) =>{
  return res.json(projects);
});

server.post('/projects', (req, res) => {
  let { id, title } = req.body;
  projects.push(
    {
      id,
      title,
      tasks: []
    }
  );
  return res.json({id, title});
});

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

server.delete('/projects/:id', verifyId, (req, res) => {
 const { id } = req.params;
 for(let i = 0; i < projects.length; i++){
    if(projects[i]['id'] == id){
      projects.splice(i, 1);
    }
  }
  return res.json(projects);
});

server.listen(3333);