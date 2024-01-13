import react from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IDCam from '../Screens/Identify_Camera';
import IDResults from '../Screens/ID_Results';

{/*This Component creates a stack for navigation. It'll be accesible through the "Identify" tab*/}

const Stack = createStackNavigator();

const StackIdentity = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Camera" component={IDCam} options={{ headerShown: false}}/>
            <Stack.Screen name="ID Results" component = {IDResults} options={{ headerShown: false}}/>
        </Stack.Navigator>
    );
};

export default StackIdentity