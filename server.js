const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');

const app = express();
app.use(bodyParser.json());

const port = 3000;
const connectionString = 'postgres://cirsqjiuvrzlkc:d66ab03247b8075ca3368e2f639b7f470bc00b7082cf9d83c84b37e40a9c2961@ec2-23-21-231-58.compute-1.amazonaws.com:5432/d4akc3u81osoqs?ssl=true';


app.get('/', (req, res) => {
  const db = req.app.get('db');
  db.getAllInjuries().then(injuries=>{
    res.send(injuries);
  });
});

app.get('/incidents', (req, res) => {
  const db = req.app.get('db');
  const state = req.query.state;
  if(state){
    db.getIncidentsByState([state]).then(incidents=>{
      res.send(incidents)
    })
  }else{ 
  db.getAllIncidents().then(incidents=>{
    res.send(incidents);
  });
}
});

app.post('/incidents', (req, res) => {
  const incident = req.body;
  const db = req.app.get('db');
  db.createIncident([incident.state, incident.injuryid, incident.causeid]).then(results=>{
    res.send(results);
  })
});



massive(connectionString).then(db=>{
  app.set('db', db);
  app.listen(port, ()=>{
    console.log('Started server on port', port)
  });
});
// app.listen(port, () => {
//   console.log('Started server on port', port);
// });
