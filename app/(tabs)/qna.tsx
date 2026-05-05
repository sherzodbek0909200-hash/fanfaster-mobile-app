import { useEffect, useState } from "react";
import { ScrollView, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { getQuestions } from "@/lib/supabase-client";

interface Question {
  id: number;
  savol: string;
  kategoriya: string;
  qiynchilik: string;
  [key: string]: any;
}

/**
 * Q&A Screen - Savol-Javoblar
 * Real vaqtda Supabase'dan savollarni yuklash
 */
export default function QnaScreen() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setIsLoading(true);
    setError(null);

    const result = await getQuestions();

    if (result.success) {
      setQuestions(result.data);
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case "oson":
        return "#16a34a";
      case "o'rta":
        return "#f59e0b";
      case "qiyin":
        return "#ef4444";
      default:
        return "#0a7ea4";
    }
  };

  const renderQuestion = ({ item }: { item: Question }) => (
    <TouchableOpacity activeOpacity={0.7} className="mb-4">
      <View className="bg-surface rounded-2xl p-4 border border-border">
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-foreground">{item.savol}</Text>
            <Text className="text-sm text-muted mt-1">{item.kategoriya}</Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center">
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: getDifficultyColor(item.qiynchilik) + "20" }}
          >
            <Text
              className="text-xs font-semibold"
              style={{ color: getDifficultyColor(item.qiynchilik) }}
            >
              {item.qiynchilik}
            </Text>
          </View>
          <Text className="text-xs text-muted">Javob berish →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <ScreenContainer className="p-4 justify-center items-center">
        <ActivityIndicator size="large" color="#0a7ea4" />
        <Text className="text-muted mt-4">Savollar yuklanimoqda...</Text>
      </ScreenContainer>
    );
  }

  if (error) {
    return (
      <ScreenContainer className="p-4 justify-center">
        <View className="bg-error bg-opacity-10 rounded-2xl p-6 items-center gap-4">
          <Text className="text-error font-semibold text-lg">Xato yuz berdi</Text>
          <Text className="text-error text-sm text-center">{error}</Text>
          <TouchableOpacity
            onPress={loadQuestions}
            className="bg-error rounded-lg px-6 py-2 mt-2"
          >
            <Text className="text-white font-semibold">Qayta Urinish</Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-3xl font-bold text-foreground mb-2">Savol-Javoblar</Text>
        <Text className="text-base text-muted mb-6">Intellektual duellar va tayyorgarlik</Text>

        {questions.length === 0 ? (
          <View className="items-center justify-center py-12">
            <Text className="text-muted text-lg">Savollar topilmadi</Text>
          </View>
        ) : (
          <FlatList
            data={questions}
            renderItem={renderQuestion}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
