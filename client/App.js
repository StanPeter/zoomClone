import Home from "screens/Home";
import MeetingRoom from "screens/MeetingRoom";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

export default function App() {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={Home}>
                <Stack.Screen
                    name='Home'
                    options={{
                        headerShown: false,
                    }}
                    component={Home} />
                <Stack.Screen
                    name='MeetingRoom'
                    options={{
                        title: 'Start a Meeting',
                        // headerShown: false,
                        headerStyle: {
                            backgroundColor: '#1c1c1c',
                            // shadowOpacity: 0,
                        },
                        headerTintColor: '#fff'
                    }}
                    component={MeetingRoom} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
