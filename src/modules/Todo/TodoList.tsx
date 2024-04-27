import {
  FlatList,
  NativeEventEmitter,
  NativeModules,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ITodo} from './types/ITodo';
import {TodoItem} from './components/TodoItem';

enum ETodoEvent {
  OnFetchSuccess = 'OnFetchSuccess',
}

// Компонент, извлекающий и выводящий список задач.
export const TodoList = () => {
  const [todos, setTodos] = useState<ITodo[] | undefined>(undefined);

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.TodoModule);
    let onFetchSuccessListener = eventEmitter.addListener(
      ETodoEvent.OnFetchSuccess,
      response => {
        const data = JSON.parse(response.data) as ITodo[];
        setTodos(data);
      },
    );

    NativeModules.TodoModule.fetch();

    return () => {
      onFetchSuccessListener.remove();
    };
  }, []);

  return (
    <SafeAreaView>
      <Text style={styles.hintText}>
        Представим, что это админка с тудушками
      </Text>
      <FlatList
        data={todos}
        renderItem={({item}) => (
          <TodoItem todo={item} containerStyle={styles.flatListItem} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  hintText: {
    color: '#a9a9a9',
    textAlign: 'center',
    marginBottom: 4,
    fontSize: 12,
  },
  flatListItem: {
    marginBottom: 6,
  },
});
