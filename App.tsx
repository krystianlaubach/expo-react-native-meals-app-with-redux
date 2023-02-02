import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colours } from './assets/styles/Colours';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailsScreen from './screens/MealDetailsScreen';
import DrawerNavigator from './navigation/DrawerNavigator';

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
    return (
        <Provider store={ store }>
            <PersistGate persistor={ persistor }>
                <StatusBar style='light' />
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{
                        headerStyle: { backgroundColor: Colours.raspberry },
                        headerTintColor: Colours.white,
                        contentStyle: { backgroundColor: Colours.cappuccino }
                    }}>
                        <Stack.Screen name='DrawerNavigator' component={ DrawerNavigator } options={{ headerShown: false }} />
                        <Stack.Screen name='MealsOverview' component={ MealsOverviewScreen } />
                        <Stack.Screen name='MealDetails' component={ MealDetailsScreen } />
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}
