const express = require('express');
const { Pool } = require('pg')

const app = express();
const PORT = 5000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'harybb',
  password: 'ds564',
  port: 5432,
});


app.use(express.json());



// Área de bruxos

app.get('/bruxos', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM bruxos')
    res.json({
      total: resultado.rowCount,
      bruxos: resultado.rows,
    })
  } catch (error) {
    console.error('Erro ao obter todos os bruxos', error);
    res.status(500).send('Erro ao obter todos os bruxos')
  }
})


app.post('/bruxos', async (req, res) => {
  try {

    let casaArr = ["sonserina", "lufa-lufa", "grifinória", "corvinal"]
    let sangueArr = ["puro", "mestiço", "trouxa"]
    const { nome, idade, casa, habilidade, sangue, patrono } = req.body;

    if (!casaArr.includes(casa)) {
      console.error('Essa casa não existe');
      res.status(500).send('Essa casa não existe')
    }
    if (!sangueArr.includes(sangue)) {
      console.error('Esse sangue não existe');
      res.status(500).send('Esse sangue não existe')
    } if (idade <= 0) {
      console.error('Idade inválida');
      res.status(500).send('Idade inválida')
    } else {
      await pool.query('INSERT INTO bruxos (nome, idade, casa, habilidade, sangue, patrono) VALUES ($1, $2, $3, $4, $5, $6)', [nome, idade, casa, habilidade, sangue, patrono])
      res.status(201).send({ mensagem: 'Bruxo criado com sucesso' })
    }
  } catch (error) {
    console.error('Erro ao inserir o bruxo', error);
    res.status(500).send('Erro ao inserir o bruxo')
  }
})


app.delete('/bruxos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query('DELETE FROM bruxos WHERE id = $1', [id]);
    if (resultado.rowCount === 0) {
      res.status(400).send({
        error: `Bruxo com id: ${id} não encontrado`
      })
    }
    res.status(200).send({ mensagem: 'Bruxo excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir bruxo:', error);
    res.status(500).send('Erro ao excluir bruxo');
  }
});


app.put('/bruxos/:id', async (req, res) => {
    try {
      const { id } = req.params;
      let casaArr = ["sonserina", "lufa-lufa", "grifinória", "corvinal"]
    let sangueArr = ["puro", "mestiço", "trouxa"]
    const { nome, idade, casa, habilidade, sangue, patrono } = req.body;

    if (!casaArr.includes(casa)) {
      console.error('Essa casa não existe');
      res.status(500).send('Essa casa não existe')
    }
    if (!sangueArr.includes(sangue)) {
      console.error('Esse sangue não existe');
      res.status(500).send('Esse sangue não existe')
    } if (idade <= 0) {
      console.error('Idade inválida');
      res.status(500).send('Idade inválida')
    } else {
      await pool.query('UPDATE bruxos SET nome = $1, idade = $2, casa = $3, habilidade = $4, sangue = $5, patrono = $6 WHERE id = $7', [nome, idade, casa, habilidade, sangue, patrono, id]);
      res.status(200).send({ mensagem: 'Bruxo atualizado com sucesso'});
    }
      
    } catch (error) {
      console.error('Erro ao atualizar bruxo:', error);
      res.status(500).send('Erro ao atualizar bruxo');
    }
  });


  app.get('/bruxos/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM bruxos WHERE id = $1', [id]);
      if (result.rowCount === 0) {
        res.status(404).send({ mensagem: 'Bruxo não encontrado' });
      } else {
        res.json(result.rows[0]);
      }
    } catch (error) {
      console.error('Erro ao obter bruxo por ID:', error);
      res.status(500).send('Erro ao obter bruxo por ID');
    }
  });

  app.get('/bruxos/nome/:nome', async (req, res) => {
    const { nome } = req.params;
    try {
      const result = await pool.query('SELECT * FROM bruxos WHERE nome = $1', [nome]);
      if (result.rowCount === 0) {
        res.status(404).send({ mensagem: 'Bruxo não encontrado' });
      } else {
        res.json(result.rows[0]);
      }
    } catch (error) {
      console.error('Erro ao obter bruxo por nome:', error);
      res.status(500).send('Erro ao obter bruxo por nome');
    }
  });


// Área de varinhas



app.get('/varinhas', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM varinhas')
    res.json({
      total: resultado.rowCount,
      varinhas: resultado.rows,
    })
  } catch (error) {
    console.error('Erro ao obter todas as varinhas', error);
    res.status(500).send('Erro ao obter todas as varinhas')
  }
})


app.post('/varinhas', async (req, res) => {
  try {

    const { material, comprimento, nucleo, fabricacao } = req.body;

    await pool.query('INSERT INTO varinhas (material, comprimento, nucleo, fabricacao) VALUES ($1, $2, $3, $4)', [material, comprimento, nucleo, fabricacao])
    res.status(201).send({ mensagem: 'Varinha criada com sucesso' })

  } catch (error) {
    console.error('Erro ao inserir a varinha', error);
    res.status(500).send('Erro ao inserir a varinha')
  }
})


app.delete('/varinhas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query('DELETE FROM varinhas WHERE id = $1', [id]);
    if (resultado.rowCount === 0) {
      res.status(400).send({
        error: `Varinha com id: ${id} não encontrada`
      })
    }
    res.status(200).send({ mensagem: 'Varinha excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir varinha:', error);
    res.status(500).send({ error: 'Erro ao excluir varinha' });
  }
});


app.put('/varinhas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { material, comprimento, nucleo, fabricacao } = req.body;

  
    await pool.query('UPDATE varinhas SET material = $1, comprimento = $2, nucleo = $3, fabricacao = $4 WHERE id = $5', [material, comprimento, nucleo, fabricacao, id]);
    res.status(200).send({ mensagem: 'Varinha atualizada com sucesso'});
  
    
  } catch (error) {
    console.error('Erro ao atualizar varinha:', error);
    res.status(500).send('Erro ao atualizar varinha');
  }
});


app.get('/varinhas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM varinhas WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      res.status(404).send({ mensagem: 'Varinha não encontrada' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Erro ao obter varinha por ID:', error);
    res.status(500).send('Erro ao obter varinha por ID');
  }
});














app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}🚀`);
})


app.get('/', (req, res) => {
  res.send('A rota está funcionando!')
})

