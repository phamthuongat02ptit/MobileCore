import React, { useState, useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { AuthContext } from '../context/AuthContext';
import { registerApi } from '../api/authApi';
import { validateEmail, validatePassword } from '../utils/validation';
import { theme } from '../constants/theme';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { signIn } = useContext(AuthContext);

  const validate = () => {
    const newErrors = {};
    if (!validateEmail(email)) newErrors.email = 'Email không hợp lệ';
    if (!validatePassword(password)) newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Mật khẩu không khớp';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      const response = await registerApi(email, password);
      if (response.token) {
        Alert.alert('Thành công', 'Đăng ký thành công!');
        signIn(response.token);
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Đăng ký thất bại. Vui lòng thử lại!');
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
      <CustomInput
        value={password}
        onChangeText={setPassword}
        placeholder="Mật khẩu"
        secureTextEntry
        error={errors.password}
      />
      <CustomInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Xác nhận mật khẩu"
        secureTextEntry
        error={errors.confirmPassword}
      />
      <CustomButton title="Đăng ký" onPress={handleRegister} />
      <CustomButton
        title="Đã có tài khoản? Đăng nhập"
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

export default RegisterScreen;