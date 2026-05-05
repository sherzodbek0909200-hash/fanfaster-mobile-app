import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL || "https://whwguwpynewmnhzywhwg.backend.onspace.ai";
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3Nzc2MjQ2MjksImV4cCI6MjA5Mjk4NDYyOSwicmVmIjoid2h3Z3V3cHluZXdtbmh6eXdod2ciLCJyb2xlIjoiYW5vbiIsImlzcyI6Im9uc3BhY2UifQ.qyXh3SaSQA85I3GqQI75kAeDnTK0di7__F3_rXTI8rQ";

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL va key kerak");
}

/**
 * Supabase client - FanFaster backend'i bilan bog'lanish
 */
export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Foydalanuvchi autentifikatsiyasi - talabalar jadvalidagi login_id va parol orqali
 */
export async function loginWithCredentials(loginId: string, password: string) {
  try {
    // Talabalar jadvalidagi foydalanuvchini topish
    const { data: student, error: fetchError } = await supabase
      .from("talabalar")
      .select("*")
      .eq("login_id", loginId)
      .eq("parol", password)
      .single();

    if (fetchError || !student) {
      return {
        success: false,
        error: "Login ID yoki parol noto'g'ri",
        data: null,
      };
    }

    return {
      success: true,
      error: null,
      data: student,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Xato yuz berdi",
      data: null,
    };
  }
}

/**
 * Barcha darslarni olish
 */
export async function getLessons() {
  try {
    const { data, error } = await supabase
      .from("darslar")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;

    return {
      success: true,
      data: data || [],
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : "Darslarni yuklashda xato",
    };
  }
}

/**
 * Barcha savollarni olish
 */
export async function getQuestions() {
  try {
    const { data, error } = await supabase
      .from("savollar")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;

    return {
      success: true,
      data: data || [],
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : "Savollarni yuklashda xato",
    };
  }
}

/**
 * Barcha testlarni olish
 */
export async function getTests() {
  try {
    const { data, error } = await supabase
      .from("testlar")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;

    return {
      success: true,
      data: data || [],
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : "Testlarni yuklashda xato",
    };
  }
}

/**
 * Barcha kazuslarni olish
 */
export async function getCases() {
  try {
    const { data, error } = await supabase
      .from("kazuslar")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;

    return {
      success: true,
      data: data || [],
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : "Kazuslarni yuklashda xato",
    };
  }
}

/**
 * Foydalanuvchi profilini olish
 */
export async function getUserProfile(studentId: number) {
  try {
    const { data, error } = await supabase
      .from("talabalar")
      .select("*")
      .eq("id", studentId)
      .single();

    if (error) throw error;

    return {
      success: true,
      data: data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Profilni yuklashda xato",
    };
  }
}

/**
 * Test natijasini saqlash
 */
export async function submitTestResult(
  studentId: number,
  testId: number,
  score: number,
  answers: Record<string, string>
) {
  try {
    const { data, error } = await supabase
      .from("test_natijalari")
      .insert([
        {
          talaba_id: studentId,
          test_id: testId,
          ball: score,
          javoblar: answers,
          sana: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data: data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Natijani saqlashda xato",
    };
  }
}

/**
 * Reyting olish (eng yaxshi talabalar)
 */
export async function getLeaderboard(limit: number = 10) {
  try {
    const { data, error } = await supabase
      .from("talabalar")
      .select("id, ism, familiya, email, ball")
      .order("ball", { ascending: false })
      .limit(limit);

    if (error) throw error;

    return {
      success: true,
      data: data || [],
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : "Reyting yuklashda xato",
    };
  }
}
