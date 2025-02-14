import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { forgotPasswordApi } from '../api/authApi';
import { validateEmail } from '../utils/validation';
import { theme } from '../constants/theme';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!validateEmail(email)) newErrors.email = 'Email không hợp lệ';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleForgotPassword = async () => {
    if (!validate()) return;

    try {
      const response = await forgotPasswordApi(email);
      if (response.success) {
        Alert.alert(
          'Thành công',
          'Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login'),
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Yêu cầu thất bại. Vui lòng thử lại!');
    }
  };

  return (
    <View style={styles.container}>
      <CustomInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        error={errors.email}
      />
      <CustomButton title="Gửi yêu cầu" onPress={handleForgotPassword} />
      <CustomButton
        title="Quay lại đăng nhập"
        onPress={() => navigation.navigate('Login')}
        style={styles.linkButton}
        textStyle={styles.linkText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  linkButton: {
    backgroundColor: 'transparent',
  },
  linkText: {
    color: theme.colors.primary,
  },
});

export default ForgotPasswordScreen;