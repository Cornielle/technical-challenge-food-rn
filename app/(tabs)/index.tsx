import { FoodDishesProps, FoodsProps } from '@/app/(tabs)/index.type';
import { foods } from '@/constants/Foods';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SectionList, StyleSheet, Text, TextInput, View } from 'react-native';
import { foodsFilter, sortFoods } from './index.helpers';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  // Since I'm using a mock data I'm using a loading state to represent the ActivityIndicator component.
  // It will keep listening the searchQuery variable to represent a query search if the input were connected
  // To the backend.

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 400)
  }, [searchQuery])

  const formatForSectionList = (foods: FoodsProps[]): FoodDishesProps[] => {
    let formattedFood: Record<string, FoodsProps[]> = {}

    const formattedData = foods.map((food:FoodsProps) => ({
      ...food,
      dishes: food.dishes || []
    }))

    formattedData.forEach((item) => {
      if (!formattedFood[item.category]) {
        formattedFood[item.category] = []
      }
      formattedFood[item.category].push(item)
    });

    return Object.keys(formattedFood).map((category: string) => ({
      title: category,
      data: formattedFood[category],
    }));
  };
  
  const foodsFormatted = formatForSectionList(foods);
  const filteredFoods = foodsFilter(foodsFormatted, searchQuery)
  const foodsSorted = sortFoods(filteredFoods)

  return (
    <View style={styles.container}>
      <TextInput
        style={{ padding: 10, backgroundColor: '#f2f2f2', marginBottom: 10, borderRadius: 5 }}
        placeholder="Search meals..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
      <SectionList
        sections={foodsSorted}
        keyExtractor={(item) => item.id} 
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.name}</Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{section.title}</Text> 
          </View>
        )}
      />)}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 20,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerContainer: {
    padding: 10,
  },
  headerText: {
    fontWeight: 'bold',
  },
});
