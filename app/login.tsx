import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import { router } from 'expo-router';
import { loginStudent } from '@/lib/_core/supabase';
import * as Auth from '@/lib/_core/auth';
import { useColors } from '@/hooks/use-colors';

export default function LoginScreen() {
  const colors = useColors();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!loginId.trim() || !password.trim()) {
      Alert.alert('Xato', 'Login ID va parolni kiriting');
      return;
    }

    try {
      setLoading(true);
      
      const result = await loginStudent(loginId, password);

      if (result.success && result.student && result.token) {
        // Session token'ni saqlash
        await Auth.setSessionToken(result.token);
        
        // Foydalanuvchi ma'lumotlarini saqlash
        const userInfo: Auth.User = {
          id: result.student.id,
          openId: `student_${result.student.id}`,
          name: `${result.student.ism || ''} ${result.student.familiya || ''}`.trim(),
          email: result.student.email || null,
          loginMethod: 'student_table',
          lastSignedIn: new Date(),
        };
        
        await Auth.setUserInfo(userInfo);
        
        // Bosh sahifaga yo'naltirish
        router.replace('/(tabs)/');
      } else {
        Alert.alert('Kirish xatosi', result.error || 'Noma\'lum xato');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert('Xato', error.message || 'Kirish urinishida xato');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.background,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          marginBottom: 30,
          color: colors.text,
        }}
      >
        FanFaster
      </Text>

      <View
        style={{
          width: '100%',
          maxWidth: 300,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 8,
            color: colors.text,
          }}
        >
          Login ID
        </Text>
        <TextInput
          placeholder="Login ID'ni kiriting"
          value={loginId}
          onChangeText={setLoginId}
          editable={!loading}
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 8,
            padding: 12,
            marginBottom: 20,
            color: colors.text,
            backgroundColor: colors.background,
          }}
          placeholderTextColor={colors.tabIconDefault}
        />

        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 8,
            color: colors.text,
          }}
        >
          Parol
        </Text>
        <TextInput
          placeholder="Parolni kiriting"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 8,
            padding: 12,
            marginBottom: 30,
            color: colors.text,
            backgroundColor: colors.background,
          }}
          placeholderTextColor={colors.tabIconDefault}
        />

        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          style={{
            backgroundColor: loading ? colors.tabIconDefault : colors.tint,
            padding: 14,
            borderRadius: 8,
            alignItems: 'center',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? (
            <ActivityIndicator color={colors.background} />
          ) : (
            <Text
              style={{
                color: colors.background,
                fontSize: 16,
                fontWeight: '600',
              }}
            >
              Kirish
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
