import {
  FlatList,
  NativeEventEmitter,
  NativeModules,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ITodo} from './types/ITodo';
import {TodoItem} from './components/TodoItem';

enum ETodoEvent {
  OnFetchSuccess = 'OnFetchSuccess',
}

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

    NativeModules.TodoModule.fetchTodos();

    return () => {
      onFetchSuccessListener.remove();
    };
  }, []);

  return (
    <SafeAreaView>
      <FlatList data={todos} renderItem={({item}) => <TodoItem {...item} />} />
    </SafeAreaView>
  );
};
