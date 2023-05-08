import React from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const ExitSreen = () => {
    useFocusEffect(
        React.useCallback(()=>{
            setTimeout(() => {
                BackHandler.exitApp();
             }, 10);
        }, [])
    ); 
}

export default ExitSreen;