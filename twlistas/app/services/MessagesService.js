import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

let unsubscribeList = [];

function setConfigurations(){
    PushNotification.configure({
        // onRegister(token){

        // }
        onNotification(notification){
            console.log('NOTIFICAÇÃO', notification);
            if(notification && notification.userInteraction){
                
            }
        }
    })
}

export const MessagesService = {
    async start(){
        try{
            await messaging().registerForRemoteNotifications();
            const granted = await messaging().requestPermission();
            if(granted){
                messaging().getToken().then(console.log);
                //unsubscribeList.push( messaging().onTokenRefresh(token => {}) );
                unsubscribeList.push( messaging().onMessage(MessagesService.handleMessage) );
                setConfigurations();
            }
        }catch(error){}
    },
    async finish(){
        unsubscribeList.forEach(func => func());
        unsubscribeList = [];
    },
    showNotification(notificationConfig){
        PushNotification.localNotification({
            ...notificationConfig,
            priority: 'high'
        })
    },
    async handleMessage(remoteMessage){
        console.log('Minha Mensagem: ', remoteMessage);
        return true;
    },
    handleBackgroundMessages(){
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Background', remoteMessage);
            
        })
    }
}