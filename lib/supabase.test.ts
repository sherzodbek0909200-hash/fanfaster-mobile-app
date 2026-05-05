import { describe, it, expect } from "vitest";

describe("Supabase Configuration", () => {
  it("should have required environment variables", () => {
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

    expect(supabaseUrl).toBeDefined();
    expect(supabaseKey).toBeDefined();
    expect(supabaseUrl).toMatch(/^https:\/\//);
    expect(supabaseKey).toBeTruthy();
  });

  it("should have valid JWT token format", () => {
    const token = process.env.VITE_SUPABASE_ANON_KEY;
    const parts = token?.split(".");

    expect(parts).toHaveLength(3);
    expect(parts?.[0]).toBeTruthy();
    expect(parts?.[1]).toBeTruthy();
    expect(parts?.[2]).toBeTruthy();
  });

  it("should be able to create Supabase client", async () => {
    const { createClient } = await import("@supabase/supabase-js");

    const supabaseUrl = process.env.VITE_SUPABASE_URL!;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;

    const client = createClient(supabaseUrl, supabaseKey);

    expect(client).toBeDefined();
    expect(client.auth).toBeDefined();
  });
});
