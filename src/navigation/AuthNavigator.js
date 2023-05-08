import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from '../navigation/TabNavigator';
import SingupScreen from '../screen/auth/singupScreen';
import SinginScreen from '../screen/auth/singinScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {    
    return (
        <Stack.Navigator initialRouteName="tabNavigator">
            <Stack.Screen name="tabNavigator" options={{ headerShown: false }} component={TabNavigator} />
            <Stack.Screen name="singin" options={{ headerShown: false }} component={SinginScreen} />
            <Stack.Screen name="singup" options={{ headerShown: false }} component={SingupScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigator;