import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { Entypo } from 'react-native-vector-icons'

function Header() {
    return (
        <View style={styles.container}>
            <Entypo name="notification" size={30} color="#efefef" />
            <Text style={styles.heading}>Meet and chat!</Text>
            <Entypo name="new-message" size={30} color="#efefef" />
            {/* <Text>Header</Text> */}
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    heading: {
        color: '#efefef',
        fontSize: 20,
        fontWeight: '700',
    }
});