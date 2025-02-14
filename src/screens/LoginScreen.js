import React, {useState, useContext} from 'react';
import {View, StyleSheet, Alert, Text, Image} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {AuthContext} from '../context/AuthContext';
import {loginApi} from '../api/authApi';
import {validateEmail, validatePassword} from '../utils/validation';
import {theme} from '../constants/theme';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const {signIn} = useContext(AuthContext);

  const validate = () => {
    const newErrors = {};
    if (!validateEmail(email)) newErrors.email = 'Email không hợp lệ';
    if (!validatePassword(password))
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      const response = await loginApi(email, password);
      if (response.token) {
        signIn(response.token);
      }
    } catch (error) {
      Alert.alert('Thông báo', 'Đăng nhập thất bại. Vui lòng thử lại!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.welcomeSection}>
        <Image 
            source={require('../assets/images/logo_sunhouse.png')}
            style={styles.welcomeImage}
            resizeMode="contain"
          />
      </View>
      <CustomInput
        value={email}
        onChangeText={setEmail}
        placeholder="Tên đăng nhập"
        error={errors.email}
        style={styles.inputCustom}
      />
      <CustomInput
        value={password}
        onChangeText={setPassword}
        placeholder="Mật khẩu"
        secureTextEntry
        error={errors.password}
        style={styles.inputCustom}
      />
      <CustomButton 
        title="Đăng nhập" 
        onPress={handleLogin} 
        style={styles.buttonCustom}
        />
      <CustomButton
        title="Quên mật khẩu?"
        onPress={() => navigation.navigate('ForgotPassword')}
        style={styles.linkButton}
        textStyle={styles.linkText}
      />
      <CustomButton
        title="Chưa có tài khoản? Đăng ký"
        onPress={() => navigation.navigate('Register')}
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
    backgroundColor: theme.colors.background,
  },
  buttonCustom: {
    borderRadius: 22,
  },
  linkButton: {
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  linkText: {
    color: theme.colors.primary,
  },
  inputCustom: {
    borderColor: 'transparent',
    borderRadius: 22
  },
  welcomeSection: {
    alignItems: 'center',
  },
  welcomeImage: {
    width: 150,
    height: 150,
  },
});

export default LoginScreen;
