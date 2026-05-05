# FanFaster Mobil Ilova - API Integratsiyasi Qo'llanmasi

## Umumiy Ma'lumot

FanFaster mobil ilovasi OnSpace.AI platformasida qurilgan Supabase backend'i bilan bog'langan. Barcha ma'lumotlar real vaqtda Supabase'dan yuklaniadi.

## Supabase Konfiguratsiyasi

### Environment Variables

Ilovada quyidagi environment variables ishlatiladi:

```
VITE_SUPABASE_URL=https://whwguwpynewmnhzywhwg.backend.onspace.ai
VITE_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3Nzc2MjQ2MjksImV4cCI6MjA5Mjk4NDYyOSwicmVmIjoid2h3Z3V3cHluZXdtbmh6eXdod2ciLCJyb2xlIjoiYW5vbiIsImlzcyI6Im9uc3BhY2UifQ.qyXh3SaSQA85I3GqQI75kAeDnTK0di7__F3_rXTI8rQ
```

Bu ma'lumotlar `.env` faylida saqlangan va ilovani ishga tushirganda avtomatik yuklaniadi.

## Autentifikatsiya Tizimi

### Login Mexanizmi

Ilovada standart Supabase Auth emas, balki **Talabalar jadvalidagi login_id va parol** orqali autentifikatsiya qilinadi.

#### Login Jarayoni

1. Foydalanuvchi login ekraniga login_id va parol kiritadi
2. `loginWithCredentials()` funksiyasi talabalar jadvalidagi ma'lumotlarni tekshiradi
3. Agar ma'lumotlar to'g'ri bo'lsa, foydalanuvchi ma'lumotlari AsyncStorage'da saqlaniadi
4. Bosh ekranga o'tish sodir bo'ladi

#### Login Kodi

```typescript
import { useAuthFanfaster } from "@/hooks/use-auth-fanfaster";

export default function LoginScreen() {
  const { login, isLoading, error } = useAuthFanfaster();

  const handleLogin = async () => {
    const result = await login(loginId, password);
    if (result.success) {
      router.replace("/(tabs)");
    }
  };

  return (
    // Login form UI
  );
}
```

## API Endpoint'lari

### 1. Darslarni Olish

```typescript
import { getLessons } from "@/lib/supabase-client";

const result = await getLessons();
// result.data - Darslar ro'yxati
// result.success - Muvaffaqiyat holati
// result.error - Xato xabari
```

**Jadval**: `darslar`

**Ustunlar**:
- `id` - Dars ID
- `nomi` - Dars nomi
- `tavsifi` - Dars tavsifi
- `kategoriya` - Kategoriya
- `davomiyligi` - Dars davomiyligi (masalan: "45 min")

### 2. Savollarni Olish

```typescript
import { getQuestions } from "@/lib/supabase-client";

const result = await getQuestions();
```

**Jadval**: `savollar`

**Ustunlar**:
- `id` - Savol ID
- `savol` - Savol matni
- `kategoriya` - Kategoriya
- `qiynchilik` - Qiynchilik darajasi (Oson, O'rta, Qiyin)

### 3. Testlarni Olish

```typescript
import { getTests } from "@/lib/supabase-client";

const result = await getTests();
```

**Jadval**: `testlar`

**Ustunlar**:
- `id` - Test ID
- `nomi` - Test nomi
- `tavsifi` - Test tavsifi
- `savol_soni` - Savol soni
- `davomiyligi` - Test davomiyligi

### 4. Kazuslarni Olish

```typescript
import { getCases } from "@/lib/supabase-client";

const result = await getCases();
```

**Jadval**: `kazuslar`

**Ustunlar**:
- `id` - Kaza ID
- `nomi` - Kaza nomi
- `tavsifi` - Kaza tavsifi
- `qiynchilik` - Qiynchilik darajasi

### 5. Foydalanuvchi Profilini Olish

```typescript
import { getUserProfile } from "@/lib/supabase-client";

const result = await getUserProfile(studentId);
```

**Jadval**: `talabalar`

**Ustunlar**:
- `id` - Talaba ID
- `ism` - Ism
- `familiya` - Familiya
- `email` - Email
- `login_id` - Login ID
- `parol` - Parol (hash qilingan bo'lishi kerak)
- `ball` - Jami ballar
- `darslar_soni` - Tugatilgan darslar soni
- `testlar_soni` - Tugatilgan testlar soni

### 6. Test Natijasini Saqlash

```typescript
import { submitTestResult } from "@/lib/supabase-client";

const result = await submitTestResult(
  studentId,
  testId,
  score,
  answers
);
```

**Jadval**: `test_natijalari`

**Ustunlar**:
- `id` - Natija ID
- `talaba_id` - Talaba ID
- `test_id` - Test ID
- `ball` - Ball
- `javoblar` - Javoblar (JSON)
- `sana` - Sana

### 7. Reyting Olish

```typescript
import { getLeaderboard } from "@/lib/supabase-client";

const result = await getLeaderboard(limit);
```

**Qaytaradi**: Eng yaxshi talabalarning ro'yxati

## Supabase Client Fayllar

### `/lib/supabase-client.ts`

Barcha API funksiyalari bu faylda joylashgan. Har bir funksiya quyidagi struktura bilan qaytaradi:

```typescript
{
  success: boolean;
  data: any;
  error: string | null;
}
```

### `/hooks/use-auth-fanfaster.ts`

Autentifikatsiya hook'i. Quyidagi funksiyalarni taqdim etadi:

- `login(loginId, password)` - Kirish
- `logout()` - Chiqish
- `updateProfile(updates)` - Profilni yangilash

## Ekranlar va API Integratsiyasi

### Login Ekrani (`/app/login.tsx`)
- `loginWithCredentials()` - Foydalanuvchi kirishi

### O'quv Materiallari Ekrani (`/app/(tabs)/learning.tsx`)
- `getLessons()` - Darslar ro'yxatini yuklash

### Savol-Javoblar Ekrani (`/app/(tabs)/qna.tsx`)
- `getQuestions()` - Savollar ro'yxatini yuklash

### Testlar Ekrani (`/app/(tabs)/tests.tsx`)
- `getTests()` - Testlar ro'yxatini yuklash

### Kazuslar Ekrani (`/app/(tabs)/cases.tsx`)
- `getCases()` - Kazuslar ro'yxatini yuklash

### Profil Ekrani (`/app/(tabs)/profile.tsx`)
- `getUserProfile()` - Profil ma'lumotlarini yuklash
- `logout()` - Chiqish

## Xatolar Bilan Ishlash

Barcha API funksiyalari xatolarni qayta ishlaydi va foydalanuvchiga tushunarli xabari beradi:

```typescript
if (result.success) {
  // Ma'lumotlarni ishlatish
} else {
  // Xato xabari ko'rsatish
  Alert.alert("Xato", result.error);
}
```

## Offline Qo'llab-Quvvatlash

Foydalanuvchi ma'lumotlari AsyncStorage'da saqlaniadi:

- Foydalanuvchi sessiyasi - `fanfaster_student`
- Lokal ma'lumotlar - Kerak bo'lganda qo'shilishi mumkin

## Keyingi Qadamlar

1. **Real-time Subscriptions** - Supabase real-time subscriptions qo'shish
2. **Offline Mode** - Offline rejimda ma'lumotlarni saqlash
3. **Push Notifications** - Xabarnomalar yuborish
4. **Analytics** - Foydalanuvchi xatti-harakatini tahlil qilish

## Tez Ko'chma Referensi

| Funksiya | Jadval | Maqsad |
|----------|--------|--------|
| `loginWithCredentials()` | talabalar | Kirish |
| `getLessons()` | darslar | Darslar yuklash |
| `getQuestions()` | savollar | Savollar yuklash |
| `getTests()` | testlar | Testlar yuklash |
| `getCases()` | kazuslar | Kazuslar yuklash |
| `getUserProfile()` | talabalar | Profil yuklash |
| `submitTestResult()` | test_natijalari | Natija saqlash |
| `getLeaderboard()` | talabalar | Reyting yuklash |

## Muammolarni Hal Qilish

### "Login xatosi" xabari
- Login ID va parol to'g'ri ekanligini tekshiring
- Supabase ulanishini tekshiring
- Browser konsolida xatolarni ko'ring

### "Ma'lumotlarni yuklashda xato"
- Internet ulanishini tekshiring
- Supabase API kalitini tekshiring
- Jadval nomlarini tekshiring

### Sessiya yo'qoldi
- AsyncStorage ruxsatlarini tekshiring
- Browser cache'ni tozalang
- Ilovani qayta ishga tushiring
