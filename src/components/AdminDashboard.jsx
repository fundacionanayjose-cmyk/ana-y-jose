import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import { Users, Heart, LogOut, RefreshCw, Download, Search, Filter, Calendar } from 'lucide-react';
import Button from './Button';

const AdminDashboard = ({ session, onLogout }) => {
  const [registros, setRegistros] = useState([]);
  const [stats, setStats] = useState({ voluntarios: 0, donantes: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todos'); // 'todos', 'donantes', 'voluntarios'

  // Función maestra para traer datos
  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Traer TODOS los datos ordenados por fecha (más reciente primero)
      const { data, error } = await supabase
        .from('contactos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setRegistros(data);

      // 2. Calcular estadísticas en el cliente (más rápido)
      const volCount = data.filter(r => r.tipo_ayuda?.toLowerCase().includes('voluntario')).length;
      const donCount = data.length - volCount;
      setStats({ voluntarios: volCount, donantes: donCount });

    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Función para filtrar lo que se ve en la tabla
  const getFilteredData = () => {
    if (filter === 'voluntarios') {
      return registros.filter(r => r.tipo_ayuda?.toLowerCase().includes('voluntario'));
    }
    if (filter === 'donantes') {
      return registros.filter(r => !r.tipo_ayuda?.toLowerCase().includes('voluntario'));
    }
    return registros;
  };

  // Función para exportar a Excel (CSV)
  const downloadCSV = () => {
    const dataToExport = getFilteredData();
    if (dataToExport.length === 0) return;

    // Encabezados del CSV
    const headers = ["Fecha", "Nombre", "Documento", "Email", "Teléfono", "Tipo de Ayuda", "Profesión/Detalle", "Estado"];
    
    // Convertir datos a formato CSV
    const csvRows = [
      headers.join(','), // Fila 1: Encabezados
      ...dataToExport.map(row => [
        new Date(row.created_at).toLocaleDateString(),
        `"${row.nombre || ''}"`, // Comillas para evitar errores con espacios
        `"${row.documento || ''}"`,
        row.email || '',
        row.telefono || row.contacto || '',
        `"${row.tipo_ayuda || ''}"`,
        `"${row.profesion || ''}"`,
        row.estado || 'nuevo'
      ].join(','))
    ];

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `reporte_fundacion_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Renderizado de filas
  const displayedData = getFilteredData();

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-gray-800">
      
      {/* --- NAVBAR --- */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rose-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
            AYJ
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight">Panel Administrativo</h1>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> En línea
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 hidden md:block bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
            {session.user.email}
          </span>
          <button onClick={onLogout} className="flex items-center gap-2 text-sm font-bold text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-lg transition-colors">
            <LogOut size={18} /> <span className="hidden sm:inline">Cerrar Sesión</span>
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        
        {/* --- TARJETAS DE RESUMEN (KPIs) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Registros */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Registros</p>
              <h2 className="text-4xl font-extrabold text-gray-900">{registros.length}</h2>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
              <Users size={24} />
            </div>
          </div>

          {/* Donantes */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between border-b-4 border-b-rose-500">
            <div>
              <p className="text-rose-600 text-xs font-bold uppercase tracking-wider mb-1">Donantes / Padrinos</p>
              <h2 className="text-4xl font-extrabold text-rose-600">{stats.donantes}</h2>
            </div>
            <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-500">
              <Heart size={24} />
            </div>
          </div>

          {/* Voluntarios */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between border-b-4 border-b-blue-500">
            <div>
              <p className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">Voluntarios</p>
              <h2 className="text-4xl font-extrabold text-blue-600">{stats.voluntarios}</h2>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
              <Users size={24} />
            </div>
          </div>
        </div>

        {/* --- BARRA DE HERRAMIENTAS --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          
          {/* Filtros */}
          <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto">
            {['todos', 'donantes', 'voluntarios'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                  filter === f ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Acciones */}
          <div className="flex gap-2 w-full md:w-auto">
            <button 
              onClick={fetchData} 
              className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-transparent hover:border-gray-200"
              title="Recargar datos"
            >
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>
            
            <Button 
              onClick={downloadCSV} 
              variant="outline" 
              className="flex-1 md:flex-none items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Download size={18} /> Exportar Excel
            </Button>
          </div>
        </div>

        {/* --- TABLA DE DATOS --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-bold tracking-wider">
                  <th className="p-4">Fecha</th>
                  <th className="p-4">Nombre / Entidad</th>
                  <th className="p-4">Contacto</th>
                  <th className="p-4">Detalle Ayuda</th>
                  <th className="p-4 text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-400">
                      Cargando información...
                    </td>
                  </tr>
                ) : displayedData.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-400">
                      No se encontraron registros en esta categoría.
                    </td>
                  </tr>
                ) : (
                  displayedData.map((registro) => (
                    <tr key={registro.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          {new Date(registro.created_at).toLocaleDateString()}
                        </div>
                        <span className="text-xs opacity-50 ml-6">
                          {new Date(registro.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </td>
                      
                      <td className="p-4">
                        <div className="font-bold text-gray-900">{registro.nombre}</div>
                        <div className="text-xs text-gray-500">ID: {registro.documento || 'N/A'}</div>
                      </td>
                      
                      <td className="p-4 text-sm">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-700">{registro.telefono || registro.contacto}</span>
                          <span className="text-xs text-blue-500 truncate max-w-[150px]">{registro.email}</span>
                        </div>
                      </td>
                      
                      <td className="p-4">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-bold border ${
                          registro.tipo_ayuda?.includes('Voluntario') 
                            ? 'bg-blue-50 text-blue-700 border-blue-100' 
                            : 'bg-rose-50 text-rose-700 border-rose-100'
                        }`}>
                          {registro.tipo_ayuda || 'Registro General'}
                        </span>
                        {/* Mostrar profesión o detalle si existe */}
                        {(registro.profesion || registro.mensaje) && (
                          <p className="text-xs text-gray-500 mt-1 italic line-clamp-1">
                            {registro.profesion || registro.mensaje}
                          </p>
                        )}
                      </td>
                      
                      <td className="p-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                          registro.estado === 'nuevo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {registro.estado || 'Nuevo'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Footer de la tabla */}
          <div className="p-4 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 text-center">
            Mostrando {displayedData.length} de {registros.length} registros totales.
          </div>
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;