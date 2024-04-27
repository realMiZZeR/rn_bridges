import {Pressable, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {helpers} from '../../../helpers';

interface IProps {
  url: string;
  onPress?(): void;
}

// Компонент аватарки пользователя.
export const UserAvatar = (props: IProps) => {
  const [backgroundColor, setBackgroundColor] = useState('#FFF');
  const [textColor, setTextColor] = useState('#000');

  useEffect(() => {
    const randomColor = helpers.colors.randomColor();
    setBackgroundColor(randomColor);

    const brightness = helpers.colors.getBrightness(randomColor);
    setTextColor(brightness > 150 ? '#000' : '#FFF');
  }, []);

  return (
    <Pressable
      onPress={props.onPress}
      style={[styles.container, {backgroundColor}]}>
      <Text style={[styles.text, {color: textColor}]}>{props.url}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#420bb6',
    overflow: 'hidden',
  },
  text: {},
});
