import { useEffect, useState } from "react";
import { ScrollView, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { getTests } from "@/lib/supabase-client";

interface Test {
  id: number;
  nomi: string;
  tavsifi: string;
  savol_soni: number;
  davomiyligi: string;
  [key: string]: any;
}

/**
 * Tests Screen - Mavjud Testlar
 * Real vaqtda Supabase'dan testlarni yuklash
 */
export default function TestsScreen() {
  const [tests, setTests] = useState<Test[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    setIsLoading(true);
    setError(null);

    const result = await getTests();

    if (result.success) {
      setTests(result.data);
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  const renderTest = ({ item }: { item: Test }) => (
    <TouchableOpacity activeOpacity={0.7} className="mb-4">
      <View className="bg-surface rounded-2xl p-4 border border-border">
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-foreground">{item.nomi}</Text>
            <Text className="text-sm text-muted mt-1">{item.tavsifi}</Text>
            <View className="flex-row gap-4 mt-2">
              <Text className="text-sm text-muted">{item.savol_soni} savol</Text>
              <Text className="text-sm text-muted">{item.davomiyligi}</Text>
            </View>
          </View>
        </View>

        <View className="pt-3 border-t border-border">
          <TouchableOpacity className="bg-primary rounded-lg py-2 px-4 items-center">
            <Text className="text-white font-semibold text-sm">Testni Boshlash</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <ScreenContainer className="p-4 justify-center items-center">
        <ActivityIndicator size="large" color="#0a7ea4" />
        <Text className="text-muted mt-4">Testlar yuklanimoqda...</Text>
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
            onPress={loadTests}
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
        <Text className="text-3xl font-bold text-foreground mb-2">Mavjud Testlar</Text>
        <Text className="text-base text-muted mb-6">Bilimni sinash uchun testlar</Text>

        {tests.length === 0 ? (
          <View className="items-center justify-center py-12">
            <Text className="text-muted text-lg">Testlar topilmadi</Text>
          </View>
        ) : (
          <FlatList
            data={tests}
            renderItem={renderTest}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
