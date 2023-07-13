const express = require('express');
const morgan = require('morgan');
const app = express();

morgan.token('body', (request, response) => JSON.stringify(request.body));
app.use(express.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time :body')
);

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/', (request, response) => {
  response.send('Hi');
});

app.get('/api/persons', (request, response) => {
  response.send(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = +request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = +request.params.id;

  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.get('/info', (request, response) => {
  const numPersons = persons.length;
  const curDate = new Date();

  response.send(`
    <p>Phonebook has info for ${numPersons} people</p>
    <p>${curDate}</p>
  `);
});

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing',
    });
  }

  if (!isNameUnique(body.name)) {
    return response.status(400).json({
      error: 'name must be unique',
    });
  }

  const person = {
    id: randomId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
});

const isNameUnique = (name) => {
  if (persons.find((person) => person.name === name)) {
    return false;
  }
  return true;
};

const randomId = () => {
  const min = 0;
  const max = 99999;
  return Math.floor(Math.random() * (max - min) + min);
};

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
