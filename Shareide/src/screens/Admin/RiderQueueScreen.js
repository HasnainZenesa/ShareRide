import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import Button from '../../components/Button';


const sample = [
{ id: 'a1', name: 'Hassan', docs: 'CNIC, License', status: 'pending' },
{ id: 'a2', name: 'Ayesha', docs: 'CNIC, License', status: 'pending' },
{ id: 'a3', name: 'Umer', docs: 'CNIC, License', status: 'pending' }
];


export default function RiderQueueScreen() {
const { colors } = useTheme();
const [items, setItems] = useState(sample);


const decide = (id, status) => {
setItems(prev => prev.map(x => x.id === id ? { ...x, status } : x));
};


return (
<View style={[styles.container, { backgroundColor: colors.background }]}>
<FlatList
data={items}
keyExtractor={i => i.id}
renderItem={({ item }) => (
<View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
<Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
<Text style={{ color: colors.text, opacity: 0.8 }}>Docs: {item.docs}</Text>
<View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
<Button title="Approve" onPress={() => decide(item.id, 'approved')} />
<Button title="Reject" onPress={() => decide(item.id, 'rejected')} />
</View>
<Text style={{ marginTop: 8, color: colors.text }}>Status: {item.status}</Text>
</View>
)}
ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
/>
</View>
);
}


const styles = StyleSheet.create({
container: { flex: 1, padding: 16 },
card: { borderWidth: 1, padding: 12, borderRadius: 12 },
name: { fontSize: 18, fontWeight: '700', marginBottom: 4 }
});