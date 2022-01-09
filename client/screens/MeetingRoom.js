import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Header from 'components/Header';

function MeetingRoom() {
    const [name, setName] = useState('');
    const [roomId, setRoomId] = useState(null);

    const meetingBtnHandler = () => {
        console.log('clicked');
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
                        placeholder='Enter something'
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