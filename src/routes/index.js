const { Router } = require('express');
const ContatoController = require('../controllers/ContatoController');
const FolhaController = require('../controllers/FolhaController');
const amqp = require("amqplib");

var channel, connection;

connectQueue() // call connectQueue function

async function connectQueue() {
  try {

      connection = await amqp.connect("amqp://localhost:5672");
      channel = await connection.createChannel()
      
      // connect to 'test-queue', create one if doesnot exist already
      await channel.assertQueue("folha-pagamento", { durable: false })
      console.log("TESTE")
      
      channel.consume("folha-pagamento", data => {
          console.log(data)
          console.log("Data received : ", `${Buffer.from(data.content)}` );
          channel.ack(data)
      })

  } catch (error) {
      console.log(error)
  }
}



const routes = Router();

routes.get('/folha/listar', FolhaController.list);
routes.get('/folha/total', FolhaController.total);
routes.get('/folha/media', FolhaController.media);

module.exports = routes;