import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Header from 'components/Header';
import SearchBar from 'components/SearchBar';
import MenuButtons from 'components/MenuButtons';
import ContactMenu from 'components/ContactMenu';

//props.navigation passed automatically by navigation
function Home(props) {
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Header />
                <SearchBar />
                <MenuButtons navigation={props.navigation} />
                <ContactMenu />
            </SafeAreaView>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1e1d20",
        padding: 20,
        marginTop: 40
    }
});