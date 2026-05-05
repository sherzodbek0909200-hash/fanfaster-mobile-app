import { useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginWithCredentials, getUserProfile } from "@/lib/supabase-client";

export interface Student {
  id: number;
  ism: string;
  familiya: string;
  email: string;
  login_id: string;
  ball: number;
  [key: string]: any;
}

interface AuthState {
  student: Student | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const STORAGE_KEY = "fanfaster_student";

/**
 * FanFaster autentifikatsiyasi hook'i
 * Talabalar jadvalidagi login_id va parol orqali kirish
 */
export function useAuthFanfaster() {
  const [state, setState] = useState<AuthState>({
    student: null,
    isLoading: true,
    error: null,
    isAuthenticated: false,
  });

  // Saqlangan sessiyani yuklash
  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession = useCallback(async () => {
    try {
      const savedStudent = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedStudent) {
        const student = JSON.parse(savedStudent);
        setState({
          student,
          isLoading: false,
          error: null,
          isAuthenticated: true,
        });
      } else {
        setState({
          student: null,
          isLoading: false,
          error: null,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      setState({
        student: null,
        isLoading: false,
        error: error instanceof Error ? error.message : "Sessiyani yuklashda xato",
        isAuthenticated: false,
      });
    }
  }, []);

  const login = useCallback(
    async (loginId: string, password: string) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const result = await loginWithCredentials(loginId, password);

        if (result.success && result.data) {
          // Sessiyani saqlash
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(result.data));

          setState({
            student: result.data,
            isLoading: false,
            error: null,
            isAuthenticated: true,
          });

          return { success: true, error: null };
        } else {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: result.error,
          }));

          return { success: false, error: result.error };
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Kirish xatosi";
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));

        return { success: false, error: errorMessage };
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setState({
        student: null,
        isLoading: false,
        error: null,
        isAuthenticated: false,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Chiqishda xato",
      }));
    }
  }, []);

  const updateProfile = useCallback(
    async (updates: Partial<Student>) => {
      if (!state.student) return;

      const updatedStudent = { ...state.student, ...updates };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStudent));

      setState((prev) => ({
        ...prev,
        student: updatedStudent,
      }));
    },
    [state.student]
  );

  return {
    ...state,
    login,
    logout,
    updateProfile,
  };
}
