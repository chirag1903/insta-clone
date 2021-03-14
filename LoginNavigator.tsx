import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/AuthScreens/Login'
import Signup from '../screens/AuthScreens/Signup'
import Welcome from '../screens/AuthScreens/Welcome'
import StackNavigator from './StackNavigator'
import ProfilePicture from '../screens/AuthScreens/ProfilePicture'

const Stack = createStackNavigator();

export default function App(){
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Welcome' component={Welcome} options={{headerShown:false}}/>
                <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
                <Stack.Screen name='Signup' component={Signup} options={{
                    headerStyle:{
                        backgroundColor:'#f5f5dc'
                    }
                }}/>
                <Stack.Screen name='ProfilePicture' component={ProfilePicture} options={{
                    headerStyle:{
                        backgroundColor:'#f5f5dc'
                    }
                }}/>
                <Stack.Screen name='StackNavigator' component={StackNavigator} options={{headerShown:false}} />
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}

