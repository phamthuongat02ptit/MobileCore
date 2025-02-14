import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

const CustomInput = ({ value, onChangeText, placeholder, secureTextEntry, error, style }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, error && styles.inputError, style]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={theme.colors.gray}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    marginTop: 5,
  },
});

export default CustomInput;