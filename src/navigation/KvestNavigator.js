import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screen
import KvestterScreen from '../screen/kvest/kvestterScreen';
import KvestScreen from '../screen/kvest/main/kvestScreen';

const Stack = createNativeStackNavigator();

const KvestNavigator = () => {    
    return (
        <Stack.Navigator initialRouteName="kvestter">
            <Stack.Screen name="kvestter" options={{ headerShown: false }} component={KvestterScreen} />
            <Stack.Screen name="kvest" options={{ headerShown: false }} component={KvestScreen} />
        </Stack.Navigator>
    )
}

export default KvestNavigator;