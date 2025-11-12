// screens/ChefScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMenu, COURSES, Course } from '../context/MenuContext';
import MenuCard from '../components/MenuCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Chef'>;

export default function ChefScreen({ navigation }: Props) {
  const { menuItems, addItem, removeItem } = useMenu();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | ''>('');
  const [price, setPrice] = useState('');

  const validateAndAdd = () => {
    if (!name.trim()) return Alert.alert('Validation', "Dish name can't be empty");
    if (!description.trim()) return Alert.alert('Validation', "Description can't be empty");
    if (!selectedCourse) return Alert.alert('Validation', 'Please select a course');
    const parsed = parseFloat(price);
    if (isNaN(parsed) || parsed < 0) return Alert.alert('Validation', 'Enter a valid non-negative price');

    addItem({ name: name.trim(), description: description.trim(), course: selectedCourse, price: parsed });
    setName('');
    setDescription('');
    setSelectedCourse('');
    setPrice('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.container}>
          <Text style={styles.heading}>Add Menu Item</Text>

          <Text style={styles.label}>Dish name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholder="e.g. Pan-seared hake"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            style={[styles.input, { height: 80 }]}
            multiline
          />

          <Text style={styles.label}>Course</Text>
          <View style={styles.pickerWrap}>
            <Picker
              selectedValue={selectedCourse as any}
              onValueChange={(v) => setSelectedCourse(v as Course | '')}
            >
              <Picker.Item label="-- choose course --" value="" />
              {COURSES.map(c => <Picker.Item key={c} label={c} value={c} />)}
            </Picker>
          </View>

          <Text style={styles.label}>Price (R)</Text>
          <TextInput
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={styles.input}
            placeholder="120.00"
          />

          <TouchableOpacity style={styles.addBtn} onPress={validateAndAdd}>
            <Text style={styles.addBtnText}>Add Menu Item</Text>
          </TouchableOpacity>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.sectionTitle}>Manage existing items</Text>
            {menuItems.length === 0 ? (
              <Text style={{ color: '#666' }}>No items yet.</Text>
            ) : (
              <FlatList
                data={menuItems}
                keyExtractor={i => i.id}
                renderItem={({ item }) => (
                  <MenuCard item={item} showRemove onRemove={removeItem} />
                )}
                scrollEnabled={false} // handled by ScrollView
              />
            )}
          </View>

          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.backText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, padding: 16 },
  container: { flex: 1, backgroundColor: '#fff' },
  heading: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  label: { marginTop: 8, fontSize: 12, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#fff',
    marginTop: 6,
  },
  pickerWrap: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 6,
    marginTop: 6,
    overflow: 'hidden',
  },
  addBtn: {
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  addBtnText: { color: '#fff', fontWeight: '600' },
  sectionTitle: { fontWeight: '700', marginBottom: 8 },
  backBtn: { marginTop: 12, alignItems: 'center' },
  backText: { color: '#222', fontWeight: '600' },
});

