import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import AlarmView from './AlarmView';
import EventsView from './EventsView';
import {MessagesService} from '../services/MessagesService';

export default (props) => {
    const [view, setView] = useState('alarm');

    useEffect(() => {
        MessagesService.start();
        return ()=>{
            MessagesService.finish();
        }
    }, [])

    function logout(){
        auth().signOut();
        props.onLogout();
    }

    return (
        <View style={styles.container} >
            <View style={styles.viewContainer} >
                {view === 'alarm' && <AlarmView />}
                {view === 'events' && <EventsView />}
            </View>
            <View style={styles.buttonContainer} >
                <Button title="Alarmes" onPress={()=>setView('alarm')} color="#ff2724" />
                <Button title="Eventos" onPress={()=>setView('events')} color="#ff2724" />
                <Button title="Logout" onPress={logout} color="#ff2724" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4c11b0',
        width: '100%'
    },
    viewContainer: {
        flex: 1
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingTop: 8,
        paddingRight: 16,
        paddingBottom: 8,
        paddingLeft: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, .3)'
    }
})