import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

/**
 * Profile Screen - Profil
 * Displays user profile, achievements, and statistics
 */
export default function ProfileScreen() {
  const stats = [
    { label: "Darslar", value: "12", icon: "📚" },
    { label: "Testlar", value: "8", icon: "✓" },
    { label: "Ballar", value: "2,450", icon: "⭐" },
    { label: "O'rin", value: "#42", icon: "🏆" },
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
          <Text className="text-2xl font-bold text-foreground">Foydalanuvchi</Text>
          <Text className="text-sm text-muted mt-1">user@fanfaster.uz</Text>
        </View>

        {/* Statistics */}
        <Text className="text-xl font-bold text-foreground mb-4">Statistika</Text>
        <View className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, index) => (
            <View key={index} className="bg-surface rounded-2xl p-4 border border-border items-center">
              <Text className="text-2xl mb-2">{stat.icon}</Text>
              <Text className="text-2xl font-bold text-primary">{stat.value}</Text>
              <Text className="text-xs text-muted mt-1">{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Achievements */}
        <Text className="text-xl font-bold text-foreground mb-4">Yutuqlar</Text>
        <View className="gap-3 mb-6">
          {achievements.map((achievement) => (
            <View key={achievement.id} className="bg-surface rounded-2xl p-4 border border-border flex-row items-center gap-4">
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
          <TouchableOpacity className="bg-error rounded-2xl py-3 px-4 items-center opacity-80">
            <Text className="text-white font-semibold">Chiqish</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
