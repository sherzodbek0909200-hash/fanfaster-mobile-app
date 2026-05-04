import axios from 'axios';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://onspace.ai';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

// API endpoint for custom REST calls
export const apiEndpoint = process.env.SUPABASE_API_ENDPOINT || 'https://whwguwpynewmnhzywhwg.backend.onspace.ai/rest/v1';

// Supabase API instance
const supabaseApi = axios.create({
  baseURL: apiEndpoint,
  headers: {
    'apikey': supabaseKey,
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${supabaseKey}`,
  },
});

export type Student = {
  id: number;
  login_id: string;
  parol?: string;
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
 * Login qilish talabalar jadvalidagi login_id va parol orqali
 */
export async function loginStudent(loginId: string, password: string): Promise<LoginResponse> {
  try {
    console.log('[Supabase] Logging in student:', loginId);
    
    // Talabalar jadvalida login_id ni qidirish
    const response = await supabaseApi.get('/talabalar', {
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

    // Parol tekshirish
    if (student.parol !== password) {
      return {
        success: false,
        error: 'Parol noto\'g\'ri',
      };
    }

    // Muvaffaqiyatli login
    return {
      success: true,
      student,
      token: `student_${student.id}_${Date.now()}`,
    };
  } catch (error: any) {
    console.error('[Supabase] Login error:', error.message);
    return {
      success: false,
      error: error.message || 'Login xatosi yuz berdi',
    };
  }
}
