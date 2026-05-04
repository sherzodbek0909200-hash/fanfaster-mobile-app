import { ScrollView, Text, View, TouchableOpacity, Pressable } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

/**
 * FanFaster Home Screen
 *
 * Displays the main features and quick access to learning materials,
 * Q&A, tests, and cases.
 */
export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();

  const features = [
    {
      title: "O'quv Materiallari",
      description: "Saralangan va tizimlashtirilgan kontent",
      icon: "book.fill" as const,
      color: "#0a7ea4",
      route: "learning" as const,
    },
    {
      title: "Savol–Javoblar",
      description: "Intellektual duellar va tayyorgarlik",
      icon: "questionmark.circle.fill" as const,
      color: "#9333ea",
      route: "qna" as const,
    },
    {
      title: "Mavjud Testlar",
      description: "Bilimni sinash uchun testlar",
      icon: "checkmark.circle.fill" as const,
      color: "#16a34a",
      route: "tests" as const,
    },
    {
      title: "Mavjud Kazuslar",
      description: "Analitik tahlil va amaliy masalalar",
      icon: "chart.bar.fill" as const,
      color: "#ea580c",
      route: "cases" as const,
    },
  ];

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className="bg-primary px-6 pt-8 pb-12">
          <Text className="text-4xl font-bold text-white mb-2">FanFaster</Text>
          <Text className="text-base text-white opacity-90">
            Intellektual ta'lim platformasi
          </Text>
        </View>

        {/* Features Grid */}
        <View className="px-4 py-8">
          <Text className="text-2xl font-bold text-foreground mb-6 px-2">
            Asosiy Bo'limlar
          </Text>

          <View className="gap-4">
            {features.map((feature, index) => (
              <Pressable
                key={index}
                onPress={() => router.push(feature.route as any)}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <View className="bg-surface rounded-2xl p-4 border border-border flex-row items-center gap-4">
                  <View
                    className="w-14 h-14 rounded-xl items-center justify-center"
                    style={{ backgroundColor: feature.color + "20" }}
                  >
                    <IconSymbol
                      name={feature.icon as any}
                      size={28}
                      color={feature.color}
                    />
                  </View>

                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-foreground">
                      {feature.title}
                    </Text>
                    <Text className="text-sm text-muted mt-1">
                      {feature.description}
                    </Text>
                  </View>

                  <IconSymbol
                    name="chevron.right"
                    size={20}
                    color={colors.muted}
                  />
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Quick Stats */}
        <View className="px-4 py-8">
          <Text className="text-2xl font-bold text-foreground mb-6 px-2">
            Sizning Yutuqlaringiz
          </Text>

          <View className="flex-row gap-4">
            <View className="flex-1 bg-surface rounded-2xl p-4 border border-border items-center">
              <Text className="text-3xl font-bold text-primary">0</Text>
              <Text className="text-sm text-muted mt-2">Darslar</Text>
            </View>

            <View className="flex-1 bg-surface rounded-2xl p-4 border border-border items-center">
              <Text className="text-3xl font-bold text-primary">0</Text>
              <Text className="text-sm text-muted mt-2">Testlar</Text>
            </View>

            <View className="flex-1 bg-surface rounded-2xl p-4 border border-border items-center">
              <Text className="text-3xl font-bold text-primary">0</Text>
              <Text className="text-sm text-muted mt-2">Ballar</Text>
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <View className="px-4 py-8 pb-12">
          <TouchableOpacity
            className="bg-primary rounded-2xl py-4 px-6 items-center"
            onPress={() => router.push("/(tabs)/learning" as any)}
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold text-lg">
              BILIM OLISHNI BOSHLASH
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
