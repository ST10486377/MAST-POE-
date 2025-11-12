// components/MenuCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MenuItem } from '../context/MenuContext';

type Props = {
  item: MenuItem;
  onRemove?: (id: string) => void; // optional
  showRemove?: boolean;
};

export default function MenuCard({ item, onRemove, showRemove = false }: Props) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.meta}>{item.course} • R{item.price.toFixed(2)}</Text>
        <Text style={styles.desc}>{item.description}</Text>
      </View>

      {showRemove && onRemove ? (
        <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.removeBtn}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 8,
    flexDirection: 'row',
  },
  title: { fontWeight: '700', fontSize: 16 },
  meta: { marginTop: 4, color: '#444' },
  desc: { marginTop: 6, color: '#666' },
  removeBtn: { justifyContent: 'center', paddingLeft: 12 },
  removeText: { color: '#d9534f' },
});
