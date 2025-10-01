import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';


export default function Button({ title, onPress, style, disabled }) {
const { colors } = useTheme();
return (
<Pressable
onPress={onPress}
disabled={disabled}
style={({ pressed }) => [
styles.base,
{ backgroundColor: disabled ? '#CFCFCF' : colors.tint },
pressed && { opacity: 0.85 },
style
]}
>
<Text style={styles.text}>{title}</Text>
</Pressable>
);
}


const styles = StyleSheet.create({
base: {
paddingVertical: 14,
paddingHorizontal: 18,
borderRadius: 12,
alignItems: 'center'
},
text: {
color: '#000',
fontWeight: '700',
fontSize: 16
}
});