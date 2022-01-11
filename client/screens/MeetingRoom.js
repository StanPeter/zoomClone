import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { io } from 'socket.io-client';
import { API_URL } from '../utils/constants';

let socket;

function MeetingRoom() {
    const [name, setName] = useState('');
    const [roomId, setRoomId] = useState(null);
    const [activeUsers, setActiveUsers] = useState([]);

    useEffect(() => {
        // const socket = io("ws://example.com/my-namespace", {
        //     reconnectionDelayMax: 10000,
        //     auth: {
        //         token: "123"
        //     },
        //     query: {
        //         "my-key": "my-value"
        //     }
        // });

        socket = io(API_URL);
        // const socket = io('ws://localhost:3001');
        console.log('connecting FE');

        // socket.on('connect', d => {
        //     socket.send('connected', socket.id, socket.connected);
        // });

        socket.on('error', error => console.log(error, 'error'));

        socket.on('all-users', users => {
            console.log(users);
            setActiveUsers(users);
        });

        // socket.emit("hello", "world");
        // socket.emit("with-binary", 1, "2", { 3: "4", 5: Buffer.from([6, 7, 8]) });
    }, []);

    const meetingBtnHandler = () => {
        console.log('clicked');

        if (roomId && name) {
            socket.emit('join-room', roomId, name);
        } else {
            Alert.alert(
                "Missing information",
                "Either the room Id or username was not set",
                [
                    {
                        text: "Cancel",
                        // onPress: () => Alert.alert("Cancel Pressed"),
                        style: "cancel",
                    },
                ],
                {
                    cancelable: true,
                    // onDismiss: () =>
                    //     Alert.alert(
                    //         "This alert was dismissed by tapping outside of the alert dialog."
                    //     ),
                }
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.meetingContainer}>
                <View style={styles.inputField}>
                    <TextInput
                        value={name}
                        onChangeText={(d) => setName(d)}
                        placeholder='Enter name'
                        placeholderTextColor={'#767476'}
                        style={styles.textInput} />
                </View>
                <View style={styles.inputField}>
                    <TextInput
                        value={roomId}
                        onChangeText={(d) => setRoomId(d)}
                        placeholder='Enter Room ID'
                        placeholderTextColor={'#767476'}
                        style={styles.textInput} />
                </View>
                <View style={styles.meetingBtnContainer}>
                    <TouchableOpacity
                        onPress={meetingBtnHandler}
                        style={styles.meetingBtn}
                    >
                        <Text style={styles.meetingBtnText}>Start Meeting</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default MeetingRoom;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1c1c1c',
        flex: 1,
    },
    meetingContainer: {},
    inputField: {
        width: '100%',
        backgroundColor: '#373538',
        height: 50,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#484648',
        padding: 12,
        justifyContent: 'center',
    },
    textInput: {
        color: '#fff',
        fontSize: 18,
    },
    meetingBtnContainer: {
        alignItems: 'center',
    },
    meetingBtn: {
        width: 350,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0470DC',
        height: 50,
        borderRadius: 15,
    },
    meetingBtnText: {
        color: '#fff',
        fontWeight: 'bold',
    }
});