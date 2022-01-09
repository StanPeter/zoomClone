import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const btnItems = [
    {
        id: 0,
        name: 'video-camera',
        title: 'New Meeting',
        onPress: (navigation) => navigation.navigate('MeetingRoom'),
        color: '#FF751F',
    },
    {
        id: 1,
        name: 'plus-square',
        title: 'Join',
        color: '#1178e4',
    },
    {
        id: 2,
        name: 'calendar',
        title: 'Schedule',
        color: '#1178e4',
    },
    {
        id: 3,
        name: 'upload',
        title: 'Share Screens',
        color: '#1178e4',
    },
];

function MenuButtons(props) {
    return (
        <View style={styles.container}>
            {btnItems.map(btn => (
                <View style={styles.btnContainer} key={btn.id}>
                    <TouchableOpacity
                        onPress={btn.onPress ? () => btn.onPress(props.navigation) : undefined}
                        style={{
                            ...styles.btn,
                            backgroundColor: btn.color || '#1178e4'
                        }}>
                        <FontAwesome
                            name={btn.name}
                            size={23}
                            color={'#efefef'} />
                    </TouchableOpacity>
                    <Text style={styles.btnText}>{btn.title}</Text>
                </View>
            ))}
        </View>
    );
}

export default MenuButtons;

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        paddingBottom: 10,
        borderBottomColor: '#1F1F1F',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnContainer: {
        alignItems: 'center',
        flex: 1,
    },
    btn: {
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',

    },
    btnText: {
        color: '#858585',
        fontSize: 12,
        paddingTop: 10,
        fontWeight: '600',
    },
});