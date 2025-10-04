import React, { useState, useRef, useEffect } from 'react';
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
  Animated,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const COURSES = ['Starters', 'Mains', 'Desserts', 'Beverages'] as const;
type Course = typeof COURSES[number];

type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
};

export default function App() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | ''>('');
  const [price, setPrice] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const addedAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(addedAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(addedAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, [menuItems]);

  const validateAndAddItem = () => {
    if (!name.trim()) {
      Alert.alert('Validation', "Dish name can't be empty");
      return;
    }
    if (!description.trim()) {
      Alert.alert('Validation', "Description can't be empty");
      return;
    }
    if (!selectedCourse) {
      Alert.alert('Validation', 'Please select a course');
      return;
    }
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      Alert.alert('Validation', 'Please enter a valid non-negative price');
      return;
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      course: selectedCourse as Course,
      price: parsedPrice,
    };

    setMenuItems(prev => [newItem, ...prev]);
    setName('');
    setDescription('');
    setSelectedCourse('');
    setPrice('');
  };

  const removeItem = (id: string) => {
    setMenuItems(prev => prev.filter(i => i.id !== id));
  };

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.dishName}>{item.name}</Text>
        <Text style={styles.course}>{item.course} • R{item.price.toFixed(2)}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <TouchableOpacity style={styles.removeBtn} onPress={() => removeItem(item.id)}>
        <Text style={styles.removeBtnText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1 }}>
            <Animated.View
              style={[
                styles.header,
                {
                  transform: [
                    {
                      translateY: addedAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -6],
                      }),
                    },
                  ],
                  opacity: addedAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.6] }),
                },
              ]}
            >
              <Text style={styles.title}>Christoffel's Menu</Text>
              <Text style={styles.sub}>Total items: {menuItems.length}</Text>
            </Animated.View>

            <View style={styles.form}>
              <Text style={styles.label}>Dish name</Text>
              <TextInput value={name} onChangeText={setName} placeholder="e.g. Pan-seared hake" style={styles.input} />

              <Text style={styles.label}>Description</Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Short description of the dish"
                style={[styles.input, { height: 80 }]}
                multiline
              />

              <Text style={styles.label}>Select course</Text>
              <View style={styles.pickerWrap}>
                <Picker
                  selectedValue={selectedCourse as any}
                  onValueChange={(value) => setSelectedCourse(value as Course | '')}
                >
                  <Picker.Item label="-- choose course --" value="" />
                  {COURSES.map(c => (
                    <Picker.Item key={c} label={c} value={c} />
                  ))}
                </Picker>
              </View>

              <Text style={styles.label}>Price (R)</Text>
              <TextInput
                value={price}
                onChangeText={setPrice}
                placeholder="e.g. 120.00"
                keyboardType="numeric"
                style={styles.input}
              />

              <TouchableOpacity style={styles.addBtn} onPress={validateAndAddItem}>
                <Text style={styles.addBtnText}>Add Menu Item</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.listWrap}>
              <Text style={styles.sectionTitle}>Prepared Menu</Text>
              {menuItems.length === 0 ? (
                <Text style={styles.emptyText}>No items yet — add dishes using the form above.</Text>
              ) : (
                <FlatList
                  data={menuItems}
                  keyExtractor={i => i.id}
                  renderItem={renderItem}
                  contentContainerStyle={{ paddingBottom: 120 }}
                />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 16 },
  header: { marginBottom: 8 },
  title: { fontSize: 22, fontWeight: '700' },
  sub: { color: '#666', marginTop: 4 },
  form: { backgroundColor: '#fafafa', padding: 12, borderRadius: 8, marginBottom: 12 },
  label: { fontSize: 12, color: '#333', marginTop: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 6,
    padding: 8,
    marginTop: 6,
    backgroundColor: '#fff',
  },
  pickerWrap: { borderWidth: 1, borderColor: '#e1e1e1', borderRadius: 6, marginTop: 6 },
  addBtn: { backgroundColor: '#222', padding: 12, borderRadius: 8, marginTop: 12, alignItems: 'center' },
  addBtnText: { color: '#fff', fontWeight: '600' },
  listWrap: { flex: 1, marginTop: 6 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 6 },
  emptyText: { color: '#666' },
  card: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  dishName: { fontSize: 16, fontWeight: '700' },
  course: { color: '#444', marginTop: 4 },
  description: { color: '#666', marginTop: 6 },
  removeBtn: { justifyContent: 'center', paddingHorizontal: 12 },
  removeBtnText: { color: '#d9534f' },
});
