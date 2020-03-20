import React from 'react';
import { View, FlatList } from 'react-native';
import AlarmListItem from './AlarmListItem';

export default (props) => {
    const list = sortList(props.list) || [];

    function keyExtractor(item){
        return item.id;
    }

    function onRemove(item){
        props.onRemove(item);
    }

    function sortList(list){
        const newList = [...list].sort((a, b) => {
            return a.body.name > b.body.name ? 1 : -1
        })
        return newList;
    }

    return (
        <View style={{flex: 1}} >
            <FlatList
                data={list}
                keyExtractor={keyExtractor}
                numColumns={1}
                renderItem={({item})=> <AlarmListItem item={item} onRemove={props.onRemove?onRemove:false} onChange={props.onChange} />}
             />
        </View>
    )
}