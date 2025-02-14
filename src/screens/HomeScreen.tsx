import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import CustomButton from '../components/CustomButton';
import { theme } from '../constants/theme';

const HomeScreen = () => {
  const { signOut } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Chào mừng bạn đến với ứng dụng!</Text>
        <Text style={styles.descriptionText}>
          Bạn đã đăng nhập thành công. Đây là màn hình chính của ứng dụng.
        </Text>
      </View>
      
      <View style={styles.footer}>
        <CustomButton
          title="Đăng xuất"
          onPress={handleLogout}
          style={styles.logoutButton}
          textStyle={{ color: theme.colors.text }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  footer: {
    padding: 20,
  },
  logoutButton: {
    backgroundColor: theme.colors.error,
  },
});

export default HomeScreen;