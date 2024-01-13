import React from "react"
import Home from "../Screens/Home"
import StackScreen from "./ScanStack.js"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons'; 
import StackIdentity from "./ScanIdentify.js"
import { FontAwesome5 } from '@expo/vector-icons'; 

{/*Tab navigation to be displayed*/}
const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator 
        screenOptions={{
            tabBarActiveTintColor: 'green', 
            tabBarInactiveTintColor: 'grey',
            headerStyle: {
                backgroundColor: '#93c7a1'
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 40,
                top: 5,
                color: 'white',
                right: 130,

            }
        }}>
            
            <Tab.Screen name={'Home'} component = {Home} options={{ headerShown: false, tabBarIcon: ({ focused }) => 
                <FontAwesome5 name="home" size={24} color={focused ? 'green' : 'grey'}/>}}/>  

            <Tab.Screen name={'Identify'} component = {StackIdentity} options={{ headerShown: false, tabBarIcon: ({ focused }) => 
                <Foundation name="magnifying-glass" size={30} color={focused ? 'green' : 'grey'}/>}}/>

            <Tab.Screen name={'Detect'} component = {StackScreen} options={{ headerShown: false, tabBarIcon: ({ focused }) => 
                <MaterialCommunityIcons name="bacteria-outline" size={30} color={focused ? 'green' : 'grey'}/>}}/>
              
        </Tab.Navigator>
    )
}

export default Tabs
