import React from 'react';
import { Image, View, StyleSheet } from 'react-native';


export default function HeaderLogo() {
return (
<View style={styles.wrap}>
<Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
</View>
);
}


const styles = StyleSheet.create({
wrap: { flex: 1, alignItems: 'center' },
logo: { height: 28, width: 140 }
});