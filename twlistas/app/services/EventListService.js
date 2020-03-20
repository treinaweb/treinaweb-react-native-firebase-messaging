import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';

const listKey = '@eventList';
const defaultList = [
    {id: '1', body: {name: 'Atualizações', isOn: true, topic: 'atualizacoes'}},
    {id: '2', body: {name: 'Promoções', isOn: false, topic: 'promocoes'}},
];


export const EventListService = {
    async getList(){
        try{
            const list = await AsyncStorage.getItem(listKey);
            if(list !== null){
                return JSON.parse(list);
            }
            return defaultList;
        }catch(error){}
    },
    async setItem(newItem){
        try{
            const list = await EventListService.getList();
            const newList = list.map(item => item.id !== newItem.id ? item:newItem);
            AsyncStorage.setItem(listKey, JSON.stringify(newList));
            EventListService.updateEventsNotifications();
            return newList;
        }catch(error){}
    },
    async updateEventsNotifications(){
        try{
            const eventList = await EventListService.getList();
            messaging().subscribeToTopic('all');
            eventList.forEach(event => {
                if(event.body.isOn){
                    messaging().subscribeToTopic(event.body.topic);
                }else{
                    messaging().unsubscribeFromTopic(event.body.topic);
                }
            })
        }catch(error){}
    }
}