import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { Fontisto } from 'react-native-vector-icons';

function SearchBar() {
    return (
        <View style={styles.container}>
            <Fontisto name='search' size={20} color={'#858585'} />
            <Text style={styles.searchBar}>Search</Text>
        </View>
    );
}
 
export default SearchBar;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333333',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 40,
        borderRadius: 10,
    },
    searchBar: {
        marginLeft: 10,
        color: '#858585',
        fontSize: 20,
    },
})