// screens/HomeScreen.tsx
import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { useMenu, COURSES } from '../context/MenuContext';
import MenuCard from '../components/MenuCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { menuItems } = useMenu();

  const averages = useMemo(() => {
    const map: Record<string, number | null> = {};
    COURSES.forEach(c => {
      const items = menuItems.filter(i => i.course === c);
      if (items.length === 0) {
        map[c] = null;
      } else {
        const sum = items.reduce((s, it) => s + it.price, 0);
        map[c] = sum / items.length;
      }
    });
    return map;
  }, [menuItems]);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Complete Menu</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate('Chef')}
            >
              <Text style={styles.btnText}>Chef (Manage)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.ghost]}
              onPress={() => navigation.navigate('Filter')}
            >
              <Text style={[styles.btnText, { color: '#222' }]}>Filter</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.averages}>
          <Text style={styles.sectionTitle}>Average price per course</Text>
          <View style={styles.avgGrid}>
            {COURSES.map(c => (
              <View key={c} style={styles.avgCard}>
                <Text style={styles.avgCourse}>{c}</Text>
                <Text style={styles.avgValue}>
                  {averages[c] === null ? '—' : `R${averages[c]!.toFixed(2)}`}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.listWrap}>
          {menuItems.length === 0 ? (
            <Text style={styles.empty}>
              No items yet — chef can add items in the Chef screen.
            </Text>
          ) : (
            <FlatList
              data={menuItems}
              keyExtractor={i => i.id}
              renderItem={({ item }) => <MenuCard item={item} />}
              scrollEnabled={false} // let ScrollView handle scrolling
              contentContainerStyle={{ paddingBottom: 120 }}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: '#fff', padding: 16 },
  container: { flex: 1 },
  header: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { fontSize: 22, fontWeight: '700' },
  headerButtons: { flexDirection: 'row', gap: 8 },
  btn: {
    backgroundColor: '#222',
    padding: 8,
    borderRadius: 6,
    marginLeft: 8,
  },
  btnText: { color: '#fff', fontWeight: '600' },
  ghost: { backgroundColor: '#f0f0f0' },
  averages: { marginBottom: 12 },
  sectionTitle: { fontWeight: '700', marginBottom: 8 },
  avgGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  avgCard: {
    width: '47%',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 8,
  },
  avgCourse: { fontWeight: '600' },
  avgValue: { marginTop: 6 },
  listWrap: { flex: 1 },
  empty: { color: '#666' },
});
