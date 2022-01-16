import React, { useEffect, useState } from 'react';
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions,
    Modal,
} from 'react-native'
import { io } from 'socket.io-client';
import { API_URL } from '../utils/constants';
import { Camera } from 'expo-camera';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Chat from '../components/Chat';

let socket;

const cameraMenuIcons = [
    {
        id: 0,
        name: 'microphone',
        title: 'Mute',
        customColor: '#efefef',
    },
    {
        id: 1,
        name: 'video-camera',
        title: 'Stop Video',
    },
    {
        id: 2,
        name: 'upload',
        title: 'Share Content',
    },
    {
        id: 3,
        name: 'group',
        title: 'Participants',
    },
];

function MeetingRoom() {
    const [name, setName] = useState('');
    const [roomId, setRoomId] = useState(null);
    const [activeUsers, setActiveUsers] = useState([]);
    const [cameraActive, setCameraActive] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

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
            console.log(users), ' USERS';

            // const filteredUsers = users.filter(user => user !== 'Stan05');
            setActiveUsers(users);
        });

        // socket.emit("hello", "world");
        // socket.emit("with-binary", 1, "2", { 3: "4", 5: Buffer.from([6, 7, 8]) });
    }, []);

    const startCamera = async () => {
        //permissions
        const { status } = await Camera.requestCameraPermissionsAsync();

        console.log(status, ' status permission');

        if (status === 'granted') setCameraActive(true);
        else Alert.alert('Access denied');
    };

    const meetingBtnHandler = () => {
        console.log('clicked');

        if (roomId && name) {
            startCamera();
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
            {cameraActive
                ? (
                    <SafeAreaView style={{ flex: 1 }}>
                        <Modal
                            animationType='slide'
                            transparent={false}
                            presentationStyle={'fullScreen'}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}>
                            <Chat
                                modalVisible={modalVisible}
                                setModalVisible={setModalVisible} />
                        </Modal>
                        <View style={styles.allUsersContainer}>
                            <View style={styles.cameraContainer}>
                                <Camera
                                    type={'front'}
                                    style={{
                                        width: activeUsers.length === 1
                                            ? '100%'
                                            : '50%',
                                        height: activeUsers.length === 1
                                            ? Dimensions.get('window').height * 0.67
                                            : Dimensions.get('window').height * 0.3,
                                    }}
                                ></Camera>
                                {activeUsers
                                    .filter(user => user.userName !== name)
                                    .map((user, i) => (
                                        <View style={styles.activeUserContainer} key={i}>
                                            <Text style={{
                                                color: '#fff',

                                            }}>{user.userName}</Text>
                                        </View>
                                    ))}
                            </View>
                        </View>
                        <View style={styles.cameraMenuIconsContainer}>
                            {cameraMenuIcons.map(icon => (
                                <TouchableOpacity
                                    key={icon.id}
                                    style={styles.cameraIconContainer}>
                                    <FontAwesome
                                        name={icon.name}
                                        size={24}
                                        color={icon.customColor || '#efefef'}
                                    />
                                    <Text style={styles.cameraIconText}>{icon.title}</Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity
                                onPress={() => setModalVisible(true)}
                                style={styles.cameraIconContainer}>
                                <FontAwesome
                                    name={'comment'}
                                    size={24}
                                    color={'#efefef'}
                                />
                                <Text style={styles.cameraIconText}>Chat</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                )
                : (
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

                )}
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
    },
    cameraContainer: {
        // flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'black',
    },
    allUsersContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraMenuIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    cameraIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginTop: 15,
        marginBottom: 30,
    },
    cameraIconText: {
        color: '#fff',
        marginTop: 10,
    },
    activeUserContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        width: '50%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
});