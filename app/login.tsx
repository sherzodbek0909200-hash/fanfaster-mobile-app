import { useState } from "react";
import { ScrollView, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useAuthFanfaster } from "@/hooks/use-auth-fanfaster";

/**
 * Login Screen - Foydalanuvchi Kirishi
 * Talabalar jadvalidagi login_id va parol orqali autentifikatsiya
 */
export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading } = useAuthFanfaster();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!loginId.trim() || !password.trim()) {
      setError("Login ID va parol kiritish majburiy");
      return;
    }

    const result = await login(loginId, password);

    if (result.success) {
      // Kirish muvaffaqiyatli - bosh ekranga o'tish
      router.replace("/(tabs)");
    } else {
      setError(result.error || "Kirish xatosi");
      Alert.alert("Xato", result.error || "Kirish xatosi");
    }
  };

  return (
    <ScreenContainer className="p-6 justify-center">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
        <View className="gap-8">
          {/* Header */}
          <View className="items-center gap-2 mb-4">
            <Text className="text-4xl font-bold text-foreground">FanFaster</Text>
            <Text className="text-base text-muted">Intellektual ta'lim platformasi</Text>
          </View>

          {/* Login Form */}
          <View className="gap-4">
            {/* Login ID Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Login ID</Text>
              <TextInput
                className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
                placeholder="Login ID'ingizni kiriting"
                placeholderTextColor="#687076"
                value={loginId}
                onChangeText={(text) => {
                  setLoginId(text);
                  setError(null);
                }}
                editable={!isLoading}
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Parol</Text>
              <TextInput
                className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
                placeholder="Parolingizni kiriting"
                placeholderTextColor="#687076"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setError(null);
                }}
                secureTextEntry
                editable={!isLoading}
              />
            </View>

            {/* Error Message */}
            {error && (
              <View className="bg-error bg-opacity-10 rounded-lg p-3">
                <Text className="text-error text-sm">{error}</Text>
              </View>
            )}

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              className="bg-primary rounded-lg py-4 px-6 items-center mt-4"
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text className="text-white font-semibold text-lg">Kirish</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Info Section */}
          <View className="bg-surface rounded-2xl p-4 border border-border gap-3">
            <Text className="text-sm font-semibold text-foreground">Test Credentials</Text>
            <Text className="text-xs text-muted">
              Test uchun: Login ID va parol sifatida talabalar jadvalidagi ma'lumotlarni ishlatish mumkin
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
