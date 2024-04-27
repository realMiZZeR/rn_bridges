import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TodoList} from './modules/Todo/TodoList';

export default function App() {
  return (
    <View style={styles.container}>
      <TodoList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
});
