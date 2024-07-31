import { StyleSheet, Text, View } from "react-native"
import React from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"


const Header = () =>  {
    return (
        <View style={styles.topCont}>
            <View>
                <Text style={styles.text}>Good Afternoon</Text>
            </View>
            <View style={styles.iconCont}>
                <MaterialCommunityIcons style={styles.icon} name="bell-outline" size={30} color={'red'}/>
                <MaterialCommunityIcons style={styles.icon} name="history" size={30} color={'red'}/>
                <MaterialCommunityIcons style={styles.icon} name="cog-outline" size={30} color={'red'}/>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    topCont:{
        flexDirection:"row",
        alignItems:"center",
        paddingTop:40,
        justifyContent: "space-between"
    },
    text:{
        color: "white",
        fontSize: 22,
        fontWeight: "bold"
    },
    iconCont:{
        flexDirection: "row"
    },
    icon:{
        marginLeft:15
    }

})