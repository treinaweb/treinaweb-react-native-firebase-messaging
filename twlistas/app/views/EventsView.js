import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AlarmList from '../components/AlarmList';
import {EventListService} from '../services/EventListService';

export default () => {
    const [list, setList] = useState([]);

    useEffect(()=>{
        EventListService.getList().then(setList);
    }, [])

    function update(item){
        EventListService.setItem(item).then(setList);
    }

    return (
        <View>
            <Text style={styles.title} >Eventos</Text>
            <AlarmList list={list} onChange={update} />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        color: 'white',
        textAlign: 'center'
    }
})