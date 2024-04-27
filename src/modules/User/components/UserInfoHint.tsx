import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';

interface IProps {
  hint: string;
  isVisible: boolean;
  containerStyle?: ViewStyle;
}

export const UserInfoHint = (props: IProps) => {
  return (
    <View
      style={[
        styles.container,
        props.containerStyle,
        {display: props.isVisible ? 'flex' : 'none'},
      ]}>
      <Text style={styles.text}>{props.hint}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
    backgroundColor: '#FFF',
  },
  text: {},
});
