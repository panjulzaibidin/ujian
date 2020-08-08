import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
export default function Header(){
    return (
        <View style={styles.header}>
        <Text style={styles.title}>Aplikasi Menu Makan</Text>
        </View>
    )
}
const styles = StyleSheet.create({
header: {
    height: 80,
    paddingTop: 10,
    backgroundColor: 'black',
    shadowColor:'red',
    shadowRadius:10,
    textShadowColor:'red'

    },
title:{
    textAlign: 'center',
    color: 'yellow',
    fontSize: 40,
    fontWeight: 'bold',
    borderTopColor:'red',
    shadowColor:'red'
}
});
