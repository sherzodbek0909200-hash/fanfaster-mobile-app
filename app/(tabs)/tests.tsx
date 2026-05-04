import { ScrollView, Text, View, FlatList, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

/**
 * Tests Screen - Mavjud Testlar
 * Displays available tests for knowledge assessment
 */
export default function TestsScreen() {
  const tests = [
    {
      id: "1",
      title: "AI Fundamentals Test",
      questions: 20,
      duration: "30 min",
      score: 85,
      completed: true,
    },
    {
      id: "2",
      title: "Machine Learning Basics",
      questions: 25,
      duration: "45 min",
      score: null,
      completed: false,
    },
    {
      id: "3",
      title: "Python Programming Quiz",
      questions: 30,
      duration: "60 min",
      score: 92,
      completed: true,
    },
    {
      id: "4",
      title: "Data Science Challenge",
      questions: 40,
      duration: "90 min",
      score: null,
      completed: false,
    },
  ];

  const renderTest = ({ item }: any) => (
    <TouchableOpacity activeOpacity={0.7} className="mb-4">
      <View className="bg-surface rounded-2xl p-4 border border-border">
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-foreground">{item.title}</Text>
            <View className="flex-row gap-4 mt-2">
              <Text className="text-sm text-muted">{item.questions} savol</Text>
              <Text className="text-sm text-muted">{item.duration}</Text>
            </View>
          </View>
          {item.completed && (
            <View className="bg-success px-3 py-1 rounded-full">
              <Text className="text-sm font-semibold text-white">{item.score}%</Text>
            </View>
          )}
        </View>

        <View className="pt-3 border-t border-border">
          <TouchableOpacity className="bg-primary rounded-lg py-2 px-4 items-center">
            <Text className="text-white font-semibold text-sm">
              {item.completed ? "Qayta Topshirish" : "Testni Boshlash"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-3xl font-bold text-foreground mb-2">Mavjud Testlar</Text>
        <Text className="text-base text-muted mb-6">Bilimni sinash uchun testlar</Text>

        <FlatList
          data={tests}
          renderItem={renderTest}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </ScrollView>
    </ScreenContainer>
  );
}
