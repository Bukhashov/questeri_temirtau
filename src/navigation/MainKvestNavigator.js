import { createDrawerNavigator } from '@react-navigation/drawer';
// Navigator
import KvestNavigator from './KvestNavigator';
import EducationalNavigator from './EducationalNavigator';
// Screen
import TestScreen from '../screen/kvest/testScreen';
import SavedScreen from '../screen/kvest/savedScreen';
import ExitSreen from '../screen/kvest/exitScreen';

const Drawer = createDrawerNavigator();

const MainKvestNavigator = () => {    
    return (
        <Drawer.Navigator initialRouteName="Bastybet">
            <Drawer.Screen name="Bastybet" component={KvestNavigator} />
            <Drawer.Screen name="Oqýoryndar" component={EducationalNavigator} />
            <Drawer.Screen name="Testter" component={TestScreen} />
            <Drawer.Screen name="Saqtalǵan" component={SavedScreen} />
            <Drawer.Screen name="Shyǵý" component={ExitSreen} />
        </Drawer.Navigator>  
    )
}

export default MainKvestNavigator;