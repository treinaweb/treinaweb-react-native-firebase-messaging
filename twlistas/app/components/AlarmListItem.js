import React from 'react';
import { TouchableHighlight, View, Text, Switch, Alert, StyleSheet } from 'react-native';

export default (props) => {
    const item = props.item || {};
    const onRemove = props.onRemove;
    const onChange = props.onChange || (()=>{});


    function toggleIsOn(){
        item.body.isOn = !item.body.isOn;
        onChange(item);
    }

    function askRemove(){
        Alert.alert(
            item.body.name,
            'Deseja apagar este alarme?',
            [
                {text: 'Sim', onPress: () => onRemove(item)},
                {text: 'Não', style: 'cancel'}
            ]
        )
    }

    return (
        <TouchableHighlight onLongPress={askRemove}  underlayColor="rgba(0,0,0,.2)" >
            <View style={styles.view}>
                <Text style={[styles.text, !item.body.isOn && styles.disabledText]} >{item.body.name}</Text>
                <Switch value={item.body.isOn} onChange={toggleIsOn} thumbColor="white" trackColor={{false: '#0a35c7', true: '#099bbd'}} />
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 8,
        paddingRight: 16,
        paddingBottom: 8,
        paddingLeft: 16,
        marginTop: 4,
        marginBottom: 4,
        backgroundColor:  'rgba(255, 255, 255, .1)'
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 32
    },
    disabledText: {
        color: 'rgba(255, 255, 255, .5)'
    }
})