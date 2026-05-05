import { useEffect, useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useAuthFanfaster } from "@/hooks/use-auth-fanfaster";
import { getUserProfile } from "@/lib/supabase-client";

interface UserStats {
  darslar: number;
  testlar: number;
  ball: number;
  orin: number;
}

/**
 * Profile Screen - Profil
 * Foydalanuvchi ma'lumotlari va statistikasi
 */
export default function ProfileScreen() {
  const router = useRouter();
  const { student, logout, isLoading: authLoading } = useAuthFanfaster();
  const [stats, setStats] = useState<UserStats>({
    darslar: 0,
    testlar: 0,
    ball: student?.ball || 0,
    orin: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (student) {
      loadProfileData();
    }
  }, [student]);

  const loadProfileData = async () => {
    if (!student?.id) return;

    setIsLoading(true);
    const result = await getUserProfile(student.id);

    if (result.success && result.data) {
      setStats({
        darslar: result.data.darslar_soni || 0,
        testlar: result.data.testlar_soni || 0,
        ball: result.data.ball || 0,
        orin: result.data.orin || 0,
      });
    }

    setIsLoading(false);
  };

  const handleLogout = async () => {
    Alert.alert("Chiqish", "Haqiqatan ham chiqmoqchimisiz?", [
      { text: "Bekor qilish", onPress: () => {} },
      {
        text: "Chiqish",
        onPress: async () => {
          await logout();
          router.replace("/login");
        },
      },
    ]);
  };

  if (authLoading) {
    return (
      <ScreenContainer className="p-4 justify-center items-center">
        <ActivityIndicator size="large" color="#0a7ea4" />
      </ScreenContainer>
    );
  }

  if (!student) {
    return (
      <ScreenContainer className="p-4 justify-center items-center">
        <Text className="text-foreground">Profil ma'lumotlari topilmadi</Text>
      </ScreenContainer>
    );
  }

  const statsData = [
    { label: "Darslar", value: stats.darslar.toString(), icon: "📚" },
    { label: "Testlar", value: stats.testlar.toString(), icon: "✓" },
    { label: "Ballar", value: stats.ball.toString(), icon: "⭐" },
    { label: "O'rin", value: `#${stats.orin}`, icon: "🏆" },
  ];

  const achievements = [
    { id: "1", title: "Birinchi Qadam", description: "Birinchi darsni tugatdi" },
    { id: "2", title: "Test Ustasi", description: "10 ta testni tugatdi" },
    { id: "3", title: "Doimiy O'rganuvchi", description: "7 kun ketma-ket o'rgandi" },
  ];

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="bg-surface rounded-2xl p-6 border border-border mb-6 items-center">
          <View className="w-20 h-20 rounded-full bg-primary items-center justify-center mb-4">
            <Text className="text-4xl">👤</Text>
          </View>
          <Text className="text-2xl font-bold text-foreground">
            {student.ism} {student.familiya}
          </Text>
          <Text className="text-sm text-muted mt-1">{student.email}</Text>
        </View>

        {/* Statistics */}
        <Text className="text-xl font-bold text-foreground mb-4">Statistika</Text>
        <View className="gap-3 mb-6">
          <View className="flex-row gap-3">
            {statsData.slice(0, 2).map((stat, index) => (
              <View key={index} className="flex-1 bg-surface rounded-2xl p-4 border border-border items-center">
                <Text className="text-2xl mb-2">{stat.icon}</Text>
                <Text className="text-2xl font-bold text-primary">{stat.value}</Text>
                <Text className="text-xs text-muted mt-1">{stat.label}</Text>
              </View>
            ))}
          </View>
          <View className="flex-row gap-3">
            {statsData.slice(2, 4).map((stat, index) => (
              <View key={index} className="flex-1 bg-surface rounded-2xl p-4 border border-border items-center">
                <Text className="text-2xl mb-2">{stat.icon}</Text>
                <Text className="text-2xl font-bold text-primary">{stat.value}</Text>
                <Text className="text-xs text-muted mt-1">{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <Text className="text-xl font-bold text-foreground mb-4">Yutuqlar</Text>
        <View className="gap-3 mb-6">
          {achievements.map((achievement) => (
            <View
              key={achievement.id}
              className="bg-surface rounded-2xl p-4 border border-border flex-row items-center gap-4"
            >
              <View className="w-12 h-12 rounded-full bg-primary items-center justify-center">
                <Text className="text-xl">🏅</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">{achievement.title}</Text>
                <Text className="text-sm text-muted mt-1">{achievement.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View className="gap-3 pb-6">
          <TouchableOpacity className="bg-primary rounded-2xl py-3 px-4 items-center">
            <Text className="text-white font-semibold">Profilni Tahrirlash</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-surface rounded-2xl py-3 px-4 items-center border border-border">
            <Text className="text-foreground font-semibold">Sozlamalar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-error rounded-2xl py-3 px-4 items-center opacity-80"
          >
            <Text className="text-white font-semibold">Chiqish</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
