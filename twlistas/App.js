import React, {useState} from 'react';
import {  StyleSheet, SafeAreaView} from 'react-native';

import Main from './app/views/Main';
import Login from './app/views/Login';

export default () => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
    
  function onLogin(user){
    if(user){
      setUser(user);
      setIsLogged(true);
    }
  }
  function onLogout(){
    setUser(null);
    setIsLogged(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      {
        isLogged ? 
        <Main user={user} onLogout={onLogout} />
        :
        <Login onLogin={onLogin} />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
