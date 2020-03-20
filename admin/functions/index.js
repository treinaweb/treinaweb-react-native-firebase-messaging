var admin = require("firebase-admin");
var serviceAccount = require("./private-keys.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-app-auth-78a32.firebaseio.com"
});

const token = '';

admin.messaging().sendToDevice(token, {
  data: {
    nome: 'Treinaweb'
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