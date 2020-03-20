import messaging from '@react-native-firebase/messaging';

export const MessagesService = {
    async start(){
        try{
            await messaging().registerForRemoteNotifications();
            const granted = await messaging().requestPermission();
            if(granted){

            }
        }catch(error){}
    }
}