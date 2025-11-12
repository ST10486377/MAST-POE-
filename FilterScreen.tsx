// screens/FilterScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMenu, COURSES, Course } from '../context/MenuContext';
import MenuCard from '../components/MenuCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Filter'>;

export default function FilterScreen({ navigation }: Props) {
  const { menuItems } = useMenu();
  const [filter, setFilter] = useState<Course | 'All'>('All');

  const filtered =
    filter === 'All' ? menuItems : menuItems.filter(i => i.course === filter);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Filter Menu by Course</Text>

        <View style={styles.pickerWrap}>
          <Picker
            selectedValue={filter as any}
            onValueChange={(v) => setFilter(v as Course | 'All')}
          >
            <Picker.Item label="All" value="All" />
            {COURSES.map(c => <Picker.Item key={c} label={c} value={c} />)}
          </Picker>
        </View>

        <View style={{ marginTop: 12 }}>
          {filtered.length === 0 ? (
            <Text style={{ color: '#666' }}>No items in this category.</Text>
          ) : (
            <FlatList
              data={filtered}
              keyExtractor={i => i.id}
              renderItem={({ item }) => <MenuCard item={item} />}
              scrollEnabled={false} // scroll handled by ScrollView
              contentContainerStyle={{ paddingBottom: 100 }}
            />
          )}
        </View>

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.backText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: '#fff', padding: 16 },
  container: { flex: 1 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  pickerWrap: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  backBtn: { marginTop: 12, alignItems: 'center' },
  backText: { color: '#222', fontWeight: '600' },
});
