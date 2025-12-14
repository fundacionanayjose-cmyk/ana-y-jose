import { createClient } from '@supabase/supabase-js';

// Aquí Vite lee las variables que pusimos en el archivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validamos que las claves existan para evitar errores silenciosos
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("⚠️ Faltan las credenciales de Supabase en el archivo .env");
}

// Creamos y exportamos la conexión
export const supabase = createClient(supabaseUrl, supabaseAnonKey);