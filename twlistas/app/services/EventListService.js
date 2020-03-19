import AsyncStorage from '@react-native-community/async-storage';

const listKey = '@eventList';
const defaultList = [
    {id: '1', body: {name: 'Atualizações', isOn: true}},
    {id: '2', body: {name: 'Promoções', isOn: false}},
]

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
            return newList;
        }catch(error){}
    }
}