import React, {useState} from 'react';
import * as Location from 'expo-location'
import { View, Text, Dimensions } from "react-native";
import MapView ,{Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

const MapScreen = ({navigation}) => {
    const [ locationResult, setLocation ] = useState( null )
    const [ mapRegion, setRegion ] = useState( null )
    const [ hasLocationPermissions, setLocationPermission ] = useState( false )

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if ( 'granted' !== status ) setLocation( 'Permission to access location was denied' )
        else setLocationPermission( true );
        
        let { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({})
        setLocation( JSON.stringify( { latitude, longitude } ) )
        
        // Center the map on the location we just fetched.
        setRegion( { latitude, longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } );
    }

    useFocusEffect(
        React.useCallback(()=>{
            getLocation()
        }, [])
    )
    
    if ( locationResult === null ) {
        return <Text>Finding your current location...</Text>
    }

    if ( hasLocationPermissions === false ) {
        return <Text>Location permissions are not granted.</Text>
    }

    if ( mapRegion === null ) {
        return <Text>Map region doesn't exist.</Text>
    }

    return (
        <MapView
            style={{flex: 1}}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
        >
        </MapView>
    )
}

export default MapScreen;