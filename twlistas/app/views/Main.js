import React from 'react';
import {View, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

export default (props) => {

    function logout(){
        auth().signOut();
        props.onLogout();
    }

    return (
        <View>
            <Button title="Logout" onPress={logout} color="#ff2724" />
        </View>
    )
}