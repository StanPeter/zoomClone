import React, { Component, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Pressable,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function Chat(props) {
    const [messageText, setMessageText] = useState('')

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ height: '100%' }}>
                {/* <KeyboardAvoidingView> */}
                {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} /> */}
                <View style={styles.chatHeader}>
                    <Pressable onPress={() => props.setModalVisible(false)}>
                        <Text style={styles.chatHeaderText}>Close</Text>
                    </Pressable>
                    <Text style={styles.heading}>Chat</Text>
                    <Entypo name='bell' size={25} color={'#efefef'} />
                </View>
                <View style={styles.chatMessages}>

                </View>
                <View style={styles.chatFormContainer}>
                    <Text style={{ color: '#fff' }}>Send to Everyone</Text>
                    <View style={styles.chatForm}>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Tap here to chat'
                            placeholderTextColor={'#595859'}
                            value={messageText}
                            onChangeText={(text) => setMessageText(text)}
                        />
                        <TouchableOpacity
                            style={{
                                ...styles.chatBtn,
                                backgroundColor: messageText ? '#0B71EB' : '#373838',
                            }}>
                            <FontAwesome
                                name={'send'}
                                size={18}
                                color={'#efefef'} />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* </KeyboardAvoidingView> */}
            </SafeAreaView>
        </View>
    );
}

export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c1c1c',
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    chatHeaderText: {
        color: '#fff',
        fontSize: 20,
    },
    heading: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
    },
    chatMessages: {
        flex: 1,
    },
    chatFormContainer: {
        borderColor: '#2f2f2f',
        borderTopWidth: 1,
        padding: 12,
    },
    chatForm: {
        flexDirection: 'row',
    },
    chatBtn: {
        height: 40,
        width: 40,
        marginTop: 12,
        marginLeft: 12,
        backgroundColor: '#373838',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textInput: {
        flex: 1,
        height: 40,
        color: '#efefef',
        borderColor: '#595859',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 12,
    },
});
