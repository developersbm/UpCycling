import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserMenu = () => {
    const navigation = useNavigation(); 
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleMenuSettings = () => {
        console.log('Clicked on Settings');
    };

    const handleMenuPreferences = () => {
        console.log('Clicked on Preferences');
    };

    const handleMenuLogOut = async () => {
        console.log("Log Out.");
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleMenu}>
                <Image
                    source={require('../assets/icons/profile.png')}
                    style={{ width: 150, height: 50, resizeMode: 'contain'}}
                />
            </TouchableOpacity>
            {menuVisible && (
                <View style={styles.dropdown}>
                    <TouchableOpacity onPress={handleMenuSettings}>
                        <Text style={styles.menuItem}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleMenuPreferences}>
                        <Text style={styles.menuItem}>Preferences</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleMenuLogOut}>
                        <Text style={styles.menuItem2}>Logout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -20,
        marginRight: -25,
    },
    dropdown: {
        position: 'absolute',
        top: 50,
        right: 30,
        backgroundColor: 'white',
        // borderColor: 'black',
        // borderWidth: 1,
        borderRadius: 5,
        elevation: 3,
        padding: 10,
    },
    menuItem: {
        fontSize: 16,
        marginBottom: 5,
    },
    menuItem2: {
        fontSize: 16,
        marginBottom: 5,
        color: 'red',
    },
});

export default UserMenu;
