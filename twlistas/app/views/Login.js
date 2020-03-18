import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

export default (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const auth = firebase.auth(),
            currentUser = auth.currentUser;
        if(currentUser !== null){
            props.onLogin(currentUser);
        }
    }, [])

    async function login(){
        const auth = firebase.auth();
        try{
            const response = await auth.signInWithEmailAndPassword(email, password);
            props.onLogin(response);
        }catch(error){}
    }

    return (
        <View style={styles.view} >
            <View style={styles.loginBox} >
                <TextInput
                    style={styles.loginInput}
                    placeholder="Email"
                    keyboardType={'email-address'}
                    autoCapitalize={'none'}
                    onChangeText={setEmail}
                 />
                 <TextInput
                    style={styles.loginInput}
                    placeholder="Senha"
                    secureTextEntry={true}
                    autoCapitalize={'none'}
                    onChangeText={setPassword}
                 />
                 <Button title="Login" onPress={login} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginBox: {
        width: '90%',
        borderWidth: 2,
        padding: 15
    },
    loginInput: {
        fontSize: 18,
        margin: 5
    }
})