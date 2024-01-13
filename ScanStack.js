import react from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CamPage from '../Screens/Camera';
import Preview from '../Screens/Preview';
import Results from '../Screens/Results';

{/*This component creates the stack for the disease detection feature. It'll be accessible through the "detect" tab */}
const Stack = createStackNavigator();

const StackScreen = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Camera" component={CamPage} options={{ headerShown: false}}/>
            <Stack.Screen name="Preview" component = {Preview} options={{ headerShown: false}}/>
            <Stack.Screen name="Results" component = {Results} options={{ headerShown: false}}/>
        </Stack.Navigator>
    );
};

export default StackScreen