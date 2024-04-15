import {Text, View} from 'react-native';
import {ITodo} from '../types/ITodo';
import React from 'react';

export const TodoItem = (props: ITodo) => {
  return (
    <View>
      <Text>
        {props.id}. {props.title}
      </Text>
    </View>
  );
};
