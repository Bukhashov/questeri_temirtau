import { View } from "react-native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EducationalsScreen from "../screen/educational/educationalsScreen";
import EducationalScreen from "../screen/educational/educationalScreen";

const Stack = createNativeStackNavigator();

const EducationalNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Educationals">
            <Stack.Screen name="Educationals" options={{ headerShown: false }} component={EducationalsScreen} />
            <Stack.Screen name="Educational" options={{ headerShown: false }} component={EducationalScreen} />
        </Stack.Navigator>
    )
}

export default EducationalNavigator;