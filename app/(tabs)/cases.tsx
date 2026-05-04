import { ScrollView, Text, View, FlatList, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";

/**
 * Cases Screen - Mavjud Kazuslar
 * Displays analytical cases and practical problems
 */
export default function CasesScreen() {
  const cases = [
    {
      id: "1",
      title: "E-commerce Platforma Analitikasi",
      description: "Katta e-commerce platformasining ma'lumotlarini tahlil qiling",
      difficulty: "O'rta",
      solved: true,
    },
    {
      id: "2",
      title: "Sotuvni Prognozlash",
      description: "Tarihiy ma'lumotlar asosida sotuvni prognozlang",
      difficulty: "Qiyin",
      solved: false,
    },
    {
      id: "3",
      title: "Foydalanuvchi Xatti-Harakati Tahlili",
      description: "Mobil ilova foydalanuvchilarining xatti-harakatini tahlil qiling",
      difficulty: "O'rta",
      solved: true,
    },
    {
      id: "4",
      title: "Bozor Segmentatsiyasi",
      description: "Mijozlarni turli segmentlarga ajrating",
      difficulty: "Oson",
      solved: false,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Oson":
        return "#16a34a";
      case "O'rta":
        return "#f59e0b";
      case "Qiyin":
        return "#ef4444";
      default:
        return "#0a7ea4";
    }
  };

  const renderCase = ({ item }: any) => (
    <TouchableOpacity activeOpacity={0.7} className="mb-4">
      <View className="bg-surface rounded-2xl p-4 border border-border">
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-foreground">{item.title}</Text>
            <Text className="text-sm text-muted mt-1">{item.description}</Text>
          </View>
          {item.solved && (
            <View className="bg-success px-2 py-1 rounded">
              <Text className="text-xs font-semibold text-white">✓</Text>
            </View>
          )}
        </View>

        <View className="flex-row justify-between items-center pt-3 border-t border-border">
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: getDifficultyColor(item.difficulty) + "20" }}
          >
            <Text
              className="text-xs font-semibold"
              style={{ color: getDifficultyColor(item.difficulty) }}
            >
              {item.difficulty}
            </Text>
          </View>
          <Text className="text-xs text-muted">Ochish →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-3xl font-bold text-foreground mb-2">Mavjud Kazuslar</Text>
        <Text className="text-base text-muted mb-6">Analitik tahlil va amaliy masalalar</Text>

        <FlatList
          data={cases}
          renderItem={renderCase}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </ScrollView>
    </ScreenContainer>
  );
}
