import messaging from '@react-native-firebase/messaging';

export const MessagesService = {
    async start(){
        try{
            await messaging().registerForRemoteNotifications();
            const granted = await messaging().requestPermission();
            if(granted){
                messaging().getToken().then(console.log);
                //messaging().onTokenRefresh(token => {});
            }
        }catch(error){}
    }
}