import axios from 'axios';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://whwguwpynewmnhzywhwg.backend.onspace.ai';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3Nzc2MjQ2MjksImV4cCI6MjA5Mjk4NDYyOSwicmVmIjoid2h3Z3V3cHluZXdtbmh6eXdod2ciLCJyb2xlIjoiYW5vbiIsImlzcyI6Im9uc3BhY2UifQ.qyXh3SaSQA85I3GqQI75kAeDnTK0di7__F3_rXTI8rQ';

// API endpoint for custom REST calls
export const apiEndpoint = process.env.SUPABASE_API_ENDPOINT || `${supabaseUrl}/rest/v1`;

// Supabase API instance
const supabaseApi = axios.create({
  baseURL: apiEndpoint,
  headers: {
    apikey: supabaseKey,
    'Content-Type': 'application/json',
    Authorization: `Bearer ${supabaseKey}`,
  },
});

export type Student = {
  id: number;
  login_id: string;
  password?: string;
  ism?: string;
  familiya?: string;
  email?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
};

export type LoginResponse = {
  success: boolean;
  student?: Student;
  token?: string;
  error?: string;
};

/**
 * Login qilish talabalar jadvalidagi login_id va password orqali
 */
export async function loginStudent(loginId: string, password: string): Promise<LoginResponse> {
  try {
    console.log('[Supabase] Logging in student:', loginId);

    const response = await supabaseApi.get('/students', {
      params: {
        select: '*',
        login_id: `eq.${loginId}`,
      },
    });

    const students = response.data;
    if (!students || students.length === 0) {
      return {
        success: false,
        error: 'Login ID topilmadi',
      };
    }

    const student = students[0];
    if (student.password !== password) {
      return {
        success: false,
        error: 'Parol noto‘g‘ri',
      };
    }

    return {
      success: true,
      student,
      token: `student_${student.id}_${Date.now()}`,
    };
  } catch (error: any) {
    console.error('[Supabase] Login error:', error?.message || error);
    return {
      success: false,
      error: error?.message || 'Login xatosi yuz berdi',
    };
  }
}
