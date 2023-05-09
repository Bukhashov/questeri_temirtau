import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Navigator
import MainKvestNavigator from './MainKvestNavigator';
// Screens
import MapScreen from '../screen/map/mapScreen';
import ChatScreen from '../screen/chat/chatScreen';
import ProfileScreen from '../screen/auth/profileScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = ({navigation}) => {

    const authControl = async () => {
        await AsyncStorage.getItem("uid").then((data) => {
            if(data == "" || data == null) navigation.navigate('singin');
        })
    }

    useFocusEffect(React.useCallback(()=> {
            authControl();
        }, [])
    )

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
            headerShown: true,
            tabBarIcon: ({ focused, color, size }) => {
                if(route.name === "Kvestter") {
                    return <Ionicons 
                        name={ focused ? 'ios-information-circle' : 'ios-information-circle-outline' 
                    }
                        size={size} 
                        color={color} 
                    />
                } 
                else if(route.name === "Sóılesý") {
                    return <Ionicons 
                        name={ focused  ? 'ios-information-circle' : 'ios-information-circle-outline' 
                    } 
                        size={size} 
                        color={color} 
                    />
                }
                else if(route.name === "Karta") {
                    return <Ionicons 
                        name={ focused ? 'map' : 'map-outline' 
                    } 
                        size={size} 
                        color={color} 
                    />
                } 
                else if(route.name === "Akkaýnt") {
                    return <Ionicons 
                        name={ focused ? 'person-circle' : 'person-circle-outline' 
                    } 
                        size={size} 
                        color={color} 
                    />
                }
            },
            tabBarInactiveTintColor: 'black',
            tabBarActiveTintColor: 'black',
        })}
      >
        <Tab.Screen name="Kvestter" options={{ headerShown: false }} component={MainKvestNavigator} />
        <Tab.Screen name="Sóılesý" component={ChatScreen} />
        <Tab.Screen name="Karta" component={MapScreen} />
        <Tab.Screen name="Akkaýnt" component={ProfileScreen} />
      </Tab.Navigator>
    )
}

export default MainTabNavigator;