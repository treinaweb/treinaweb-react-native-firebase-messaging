var admin = require("firebase-admin");
var serviceAccount = require("./private-keys.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-app-auth-78a32.firebaseio.com"
});

const topic = 'all';

admin.messaging().sendToTopic(topic, {
  data: {
    nome: 'Treinaweb'
  },
  notification:{
    title: 'Atualização do App',
    message: 'Faça a atualização',
    color: 'red'
  }
},
{
  priority: 'high',
  timeToLive: 60 * 60 * 24,
  collapseKey: 'ab'
})
.then((response) => {
  console.log(response);
  process.exit();
})
.catch((error) => {
  console.log('Erro no envio')
})