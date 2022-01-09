import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const contactItems = [
    {
        name: 'Tom Holland',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/1200px-Tom_Holland_by_Gage_Skidmore.jpg',
    },
    {
        name: 'Jennifer Keller',
        imageUrl: 'https://static.wikia.nocookie.net/stargate/images/2/20/RepliKeller.jpg/revision/latest?cb=20080831153051',
    },
    {
        name: 'Anakin Skywalker',
        imageUrl: 'https://i.insider.com/56819d57e6183e263a8b5041?width=1000&format=jpeg&auto=webp',
    },
    {
        name: 'Adrien Agreste',
        imageUrl: 'https://static.wikia.nocookie.net/lady-bug/images/9/94/FN_%2878%29.png/revision/latest?cb=20200415222021',
    },
];

function ContactMenu() {
    return (
        <View style={styles.container}>
            <View style={styles.contact}>
                <View style={styles.contactIcon}>
                    <AntDesign
                        name={'star'}
                        size={30}
                        color='#efefef' />
                </View>
                <Text style={styles.contactName}>Starred</Text>
            </View>
            {contactItems.map((contact, i) => (
                <View style={styles.contact} key={i}>
                    <Image
                        source={{ uri: contact.imageUrl }}
                        // source={require(contact.imageUrl)}
                        style={styles.contactImg} />
                    <Text style={styles.contactName}>{contact.name}</Text>
                </View>
            ))}
        </View>
    );
}

export default ContactMenu;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    contact: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
    },
    contactName: {
        color: '#fff',
        paddingLeft: 15,
        fontSize: 18,
    },
    contactIcon: {
        backgroundColor: '#333333',
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    contactImg: {
        width: 55,
        height: 55,
        borderRadius: 20,
    },
});