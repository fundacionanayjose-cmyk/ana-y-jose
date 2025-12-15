import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/client';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const AdminLayout = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Revisar si ya hay sesión activa al cargar
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Escuchar cambios (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando sistema...</div>;

  // Si no hay sesión, mostramos el Login
  if (!session) {
    return <AdminLogin onLoginSuccess={(s) => setSession(s)} />;
  }

  // Si hay sesión, mostramos el Dashboard
  return <AdminDashboard session={session} onLogout={handleLogout} />;
};

export default AdminLayout;