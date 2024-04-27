import React, {useEffect, useState} from 'react';
import {NativeModules, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {ITodo} from '../types/ITodo';
import {UserAvatar} from '../../User/components/UserAvatar';
import {UserInfoHint} from '../../User/components/UserInfoHint';
import {IUser} from '../../User/types/IUser';

interface IProps {
  todo: ITodo;
  containerStyle: ViewStyle;
}

// Компонент карточки задачи.
export const TodoItem = ({todo, containerStyle}: IProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isHintVisible, setIsHintVisible] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await NativeModules.UserModule.getUser(todo.userId);
      const data = JSON.parse(response) as IUser[];
      setUser(data[0]);
    };

    fetchUser();
  }, [todo.userId]);

  const onUserAvatarPress = async () => {
    setIsHintVisible(prev => !prev);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <UserAvatar url={todo.userId.toString()} onPress={onUserAvatarPress} />
      <Text style={styles.text}>{todo.title}</Text>
      <UserInfoHint
        hint={user?.name ?? ''}
        isVisible={isHintVisible}
        containerStyle={styles.hint}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  text: {
    marginLeft: 12,
  },
  hint: {
    position: 'absolute',
    left: 8,
    bottom: -10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
