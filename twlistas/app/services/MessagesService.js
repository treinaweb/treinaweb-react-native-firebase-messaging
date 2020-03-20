import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {AlarmService} from './AlarmService';
let unsubscribeList = [];

function setConfigurations(){
    PushNotification.configure({
        // onRegister(token){

        // }
        onNotification(notification){
            console.log('NOTIFICAÇÃO', notification);
            if(notification && notification.userInteraction){
                if(notification.action){
                    MessagesService.handleAction(notification.action, notification);
                }
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
    cancelAll(){
        PushNotification.cancelAllLocalNotifications();
    },
    scheduleNotification(date, notificationConfig){
        PushNotification.localNotificationSchedule({
            ...notificationConfig,
            date,
            priority: 'high'
        })
    },
    async handleMessage(remoteMessage){
        console.log('Minha Mensagem: ', remoteMessage);
        return true;
    },
    async handleAction(action, notification){
        if(action === 'Desativar'){
            const alarm = (await AlarmService.list())
                .find(item => item.id === notification._id);
            if(alarm){
                alarm.body.isOn = false;
                AlarmService.update(alarm);
            }
        }
    },
    handleBackgroundMessages(){
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Background', remoteMessage);
            
        })
    }
}