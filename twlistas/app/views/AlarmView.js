import React, {useState, useEffect} from 'react';
import { View, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AlarmList from '../components/AlarmList';
import {AlarmService} from '../services/AlarmService';
import {MessagesService} from '../services/MessagesService';

export default () => {
    const [list, setList] = useState([]);
    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);

    useEffect(() => {
        const alarmUnsubscribe = AlarmService.watch(setList);
        return ()=>{
            alarmUnsubscribe();
        }
    }, [])

    useEffect(() => {
        // MessagesService.cancelAll();
        list.forEach(item => {
            MessagesService.scheduleNotification( getScheduleTime(item.body.time),{
                id: item.body.name.replace(':', ''),
                title: item.body.name,
                message: 'Chegou a Hora'
            });
        })
    }, [list])

    function getScheduleTime(time){
        let currentDate = new Date();
        let futureDate = new Date(time);
        if(currentDate.getTime() < futureDate.getTime()){
            return futureDate;
        }
        currentDate.setHours(futureDate.getHours());
        currentDate.setMinutes(futureDate.getMinutes());
        currentDate.setDate(currentDate.getDate() + 1);
        return currentDate;
    }

    function formatTime(time){
        const hour = time.getHours().toString().padStart(2, '0');
        const minute = time.getMinutes().toString().padStart(2, '0');
        return `${hour}:${minute}`;
    }

    function create(time){
        const name = formatTime(time);
        time.setSeconds(0);
        if(!list.find(item => item.body.name === name)){
            AlarmService.create({
                name,
                isOn: true,
                time: time.getTime()
            })
        }
    }

    function remove(item){
        AlarmService.remove(item.id);
    }

    function update(item){
        AlarmService.update(item);
    }

    function onChangeDate(event, selectedDate){
        if(selectedDate){
            setDate(selectedDate || date);
            create(selectedDate);
        }
        setShowDate(false);
    }

    return (
        <View>
            <Button title="Novo Alarme" onPress={()=>setShowDate(true)} color="#099bbd" />
            <AlarmList list={list} onRemove={remove} onChange={update} />
            {showDate && (
                <DateTimePicker 
                    value={date}
                    is24Hour={true}
                    mode={'time'}
                    display={'spinner'}
                    onChange={onChangeDate}
                />
            )}
        </View>
    )
}