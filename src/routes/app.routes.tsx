import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../pages/Home/index';
import { AllSubscriptions } from '../pages/AllSubscriptions/index';
import { AllSubscriptionsPaid } from '../pages/AllSubscriptionsPaid/index';
import { AllSubscriptionsNotPaid } from '../pages/AllSubscriptionsNotPaid/index';
 
const Stack = createNativeStackNavigator();
export default function AppRouter(){

    return(
        <Stack.Navigator
            screenOptions={{headerShown: false}} 
        >
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="AllSubscriptions" component={AllSubscriptions}/>
            <Stack.Screen name="AllSubscriptionsPaid" component={AllSubscriptionsPaid}/>
            <Stack.Screen name="AllSubscriptionsNotPaid" component={AllSubscriptionsNotPaid}/>
        </Stack.Navigator>
    )
}