import messaging from '@react-native-firebase/messaging';

let unsubscribeList = [];

export const MessagesService = {
    async start(){
        try{
            await messaging().registerForRemoteNotifications();
            const granted = await messaging().requestPermission();
            if(granted){
                messaging().getToken().then(console.log);
                //unsubscribeList.push( messaging().onTokenRefresh(token => {}) );
                unsubscribeList.push( messaging().onMessage(MessagesService.handleMessage) );
            }
        }catch(error){}
    },
    async finish(){
        unsubscribeList.forEach(func => func());
        unsubscribeList = [];
    },
    async handleMessage(remoteMessage){
        console.log('Minha Mensagem: ', remoteMessage);
        return true;
    }
}