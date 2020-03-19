import React, {useState} from 'react';
import { View } from 'react-native';

const _list = [{
    id: '23',
    body: {
        name: '11:25',
        time: 1584109540833,
        isOn: true
    }
}]

export default () => {
    const [list, setList] = useState(_list);
    return (
        <View>

        </View>
    )
}