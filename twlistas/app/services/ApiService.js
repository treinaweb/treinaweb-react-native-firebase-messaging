import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

const db = firebase.firestore(),
    auth = firebase.auth();

export class DataStore{
    constructor(collectionName){
        auth.onAuthStateChanged(user => {
            if(user){
                this.collection = db.collection(collectionName).doc(user.uid).collection('Items');
            }
        })
    }
    formatList(querySnapshot){
        if(querySnapshot){
            return querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
        }
        return [];
    }
    async list(){
        const querySnapshot = await this.collection.get();
        return this.formatList(querySnapshot);
    }
    watch(callback){
        return this.collection.onSnapshot((querySnapshot) => {
            callback(this.formatList(querySnapshot));
        });
    }
    async create(item){
        const newItem = await this.collection.add({body: item});
        const doc = await newItem.get();
        const newDoc = {...doc.data(), id: doc.id};
        return newDoc;
    }
    async update(doc){
        const {id} = doc;
        delete doc.id;

        await this.collection.doc(id).update(doc);
        return {id, ...doc};
    }
    async remove(id){
        await this.collection.doc(id).delete();
        return id;
    }
}