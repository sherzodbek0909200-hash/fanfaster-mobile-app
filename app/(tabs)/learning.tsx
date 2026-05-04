import { ScrollView, Text, View, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

/**
 * Learning Screen - O'quv Materiallari
 * Displays learning materials and courses
 */
export default function LearningScreen() {
  const lessons = [
    {
      id: "1",
      title: "Sun'iy Intellekt Asoslari",
      category: "AI",
      duration: "45 min",
      progress: 75,
    },
    {
      id: "2",
      title: "Mashinali O'rganish Kirish",
      category: "ML",
      duration: "60 min",
      progress: 50,
    },
    {
      id: "3",
      title: "Data Science Fundamentals",
      category: "Data",
      duration: "90 min",
      progress: 25,
    },
    {
      id: "4",
      title: "Python Dasturlash",
      category: "Programming",
      duration: "120 min",
      progress: 0,
    },
  ];

  const renderLesson = ({ item }: any) => (
    <View className="bg-surface rounded-2xl p-4 mb-4 border border-border">
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-foreground">{item.title}</Text>
          <Text className="text-sm text-muted mt-1">{item.category}</Text>
        </View>
        <View className="bg-primary px-3 py-1 rounded-full">
          <Text className="text-xs font-semibold text-white">{item.duration}</Text>
        </View>
      </View>

      <View className="h-2 bg-border rounded-full overflow-hidden">
        <View
          className="h-full bg-primary"
          style={{ width: `${item.progress}%` }}
        />
      </View>
      <Text className="text-xs text-muted mt-2">{item.progress}% tugallangan</Text>
    </View>
  );

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-3xl font-bold text-foreground mb-2">O'quv Materiallari</Text>
        <Text className="text-base text-muted mb-6">Saralangan va tizimlashtirilgan kontent</Text>

        <FlatList
          data={lessons}
          renderItem={renderLesson}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </ScrollView>
    </ScreenContainer>
  );
}
