import { useEffect, useState } from "react";
import { ScrollView, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { getLessons } from "@/lib/supabase-client";

interface Lesson {
  id: number;
  nomi: string;
  tavsifi: string;
  kategoriya: string;
  davomiyligi: string;
  [key: string]: any;
}

/**
 * Learning Screen - O'quv Materiallari
 * Real vaqtda Supabase'dan darslarni yuklash
 */
export default function LearningScreen() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {
    setIsLoading(true);
    setError(null);

    const result = await getLessons();

    if (result.success) {
      setLessons(result.data);
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  const renderLesson = ({ item }: { item: Lesson }) => (
    <TouchableOpacity activeOpacity={0.7} className="mb-4">
      <View className="bg-surface rounded-2xl p-4 border border-border">
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-foreground">{item.nomi}</Text>
            <Text className="text-sm text-muted mt-1">{item.tavsifi}</Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center pt-3 border-t border-border gap-4">
          <View className="flex-1">
            <View className="bg-primary bg-opacity-20 rounded-full px-3 py-1">
              <Text className="text-xs font-semibold text-primary">{item.kategoriya}</Text>
            </View>
          </View>
          <Text className="text-xs text-muted">{item.davomiyligi}</Text>
        </View>

        {/* Progress Bar */}
        <View className="mt-3 h-2 bg-border rounded-full overflow-hidden">
          <View className="h-full w-1/3 bg-success rounded-full" />
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <ScreenContainer className="p-4 justify-center items-center">
        <ActivityIndicator size="large" color="#0a7ea4" />
        <Text className="text-muted mt-4">Darslar yuklanimoqda...</Text>
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
            onPress={loadLessons}
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
        <Text className="text-3xl font-bold text-foreground mb-2">O'quv Materiallari</Text>
        <Text className="text-base text-muted mb-6">Saralangan va tizimli darslar</Text>

        {lessons.length === 0 ? (
          <View className="items-center justify-center py-12">
            <Text className="text-muted text-lg">Darslar topilmadi</Text>
          </View>
        ) : (
          <FlatList
            data={lessons}
            renderItem={renderLesson}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
