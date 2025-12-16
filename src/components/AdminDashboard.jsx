import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import { Users, Heart, LogOut, RefreshCw, Download, Calendar, UserPlus, Phone } from 'lucide-react';
import Button from './Button';

const AdminDashboard = ({ session, onLogout }) => {
  // Estado de datos
  const [registros, setRegistros] = useState([]); // Contactos (Donantes/Voluntarios)
  const [inscripciones, setInscripciones] = useState([]); // Abuelos Inscritos
  
  // Estado de interfaz
  const [stats, setStats] = useState({ voluntarios: 0, donantes: 0, abuelos: 0 });
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('contactos'); // 'contactos' o 'inscripciones'
  const [filter, setFilter] = useState('todos'); // Para contactos: 'todos', 'donantes', 'voluntarios'

  // --- 1. FUNCIÓN DE CARGA DE DATOS ---
  const fetchData = async () => {
    setLoading(true);
    try {
      // A. Traer CONTACTOS
      const { data: dataContactos, error: errorContactos } = await supabase
        .from('contactos')
        .select('*')
        .order('created_at', { ascending: false });

      if (errorContactos) throw errorContactos;

      // B. Traer INSCRIPCIONES
      const { data: dataInscripciones, error: errorInscripciones } = await supabase
        .from('inscripciones')
        .select('*')
        .order('created_at', { ascending: false });

      // Manejo silencioso si la tabla inscripciones aún no tiene datos
      const safeInscripciones = dataInscripciones || [];
      if (errorInscripciones && errorInscripciones.code !== 'PGRST116') {
        console.warn("Nota: Tabla inscripciones vacía o no existe aún.");
      }

      setRegistros(dataContactos);
      setInscripciones(safeInscripciones);

      // C. Calcular Estadísticas
      const volCount = dataContactos.filter(r => r.tipo_ayuda?.toLowerCase().includes('voluntario')).length;
      const donCount = dataContactos.length - volCount;
      
      setStats({ 
        voluntarios: volCount, 
        donantes: donCount,
        abuelos: safeInscripciones.length
      });

    } catch (error) {
      console.error("Error general cargando datos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- 2. FUNCIÓN PARA ACTUALIZAR ESTADO ---
  const updateStatus = async (id, newStatus) => {
    // Determinamos qué tabla actualizar según la vista actual
    const tableName = view === 'contactos' ? 'contactos' : 'inscripciones';
    
    try {
      // A. Actualizar en Supabase
      const { error } = await supabase
        .from(tableName)
        .update({ estado: newStatus })
        .eq('id', id);

      if (error) throw error;

      // B. Actualizar interfaz localmente (Optimistic UI)
      if (view === 'contactos') {
        setRegistros(prev => prev.map(item => item.id === id ? { ...item, estado: newStatus } : item));
      } else {
        setInscripciones(prev => prev.map(item => item.id === id ? { ...item, estado: newStatus } : item));
      }

    } catch (error) {
      console.error("Error al actualizar estado:", error);
      alert("No se pudo actualizar el estado. Verifica tu conexión.");
    }
  };

  // --- 3. EXPORTAR A EXCEL ---
  const downloadCSV = () => {
    let dataToExport = [];
    let headers = [];
    let fileName = '';

    if (view === 'contactos') {
        dataToExport = filter === 'todos' ? registros : 
                       filter === 'voluntarios' ? registros.filter(r => r.tipo_ayuda?.toLowerCase().includes('voluntario')) :
                       registros.filter(r => !r.tipo_ayuda?.toLowerCase().includes('voluntario'));
        
        headers = ["Fecha", "Nombre", "Documento", "Email", "Teléfono", "Tipo", "Estado"];
        fileName = 'reporte_contactos';
        
        dataToExport = dataToExport.map(row => [
            new Date(row.created_at).toLocaleDateString(),
            `"${row.nombre}"`,
            `"${row.documento || ''}"`,
            row.email,
            row.telefono,
            row.tipo_ayuda,
            row.estado || 'nuevo'
        ]);

    } else {
        dataToExport = inscripciones;
        headers = ["Fecha", "Abuelo", "Documento", "Edad", "EPS", "Acudiente", "Tel. Acudiente", "Programas", "Estado"];
        fileName = 'reporte_inscripciones';

        dataToExport = dataToExport.map(row => [
            new Date(row.created_at).toLocaleDateString(),
            `"${row.nombres} ${row.apellidos}"`,
            row.numero_documento,
            row.fecha_nacimiento,
            row.eps,
            `"${row.nombre_acudiente}"`,
            row.telefono_acudiente,
            `"${(row.programas_interes || []).join(', ')}"`,
            row.estado || 'nuevo'
        ]);
    }

    if (dataToExport.length === 0) return;

    const csvRows = [headers.join(','), ...dataToExport.map(r => r.join(','))];
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${fileName}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtrado visual de contactos
  const getFilteredContactos = () => {
    if (filter === 'voluntarios') return registros.filter(r => r.tipo_ayuda?.toLowerCase().includes('voluntario'));
    if (filter === 'donantes') return registros.filter(r => !r.tipo_ayuda?.toLowerCase().includes('voluntario'));
    return registros;
  };

  // Helper para estilos del selector de estado
  const getStatusColor = (status) => {
    switch (status) {
      case 'contactado': return 'bg-blue-100 text-blue-800 focus:ring-blue-500';
      case 'gestionado': return 'bg-green-100 text-green-800 focus:ring-green-500';
      case 'aprobado': return 'bg-emerald-100 text-emerald-800 focus:ring-emerald-500';
      case 'rechazado': return 'bg-red-100 text-red-800 focus:ring-red-500';
      case 'pendiente': return 'bg-yellow-100 text-yellow-800 focus:ring-yellow-500';
      default: return 'bg-gray-100 text-gray-800 focus:ring-gray-500'; // nuevo
    }
  };

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
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> En línea
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
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between border-b-4 border-b-purple-500">
            <div>
              <p className="text-purple-600 text-xs font-bold uppercase tracking-wider mb-1">Abuelos Inscritos</p>
              <h2 className="text-4xl font-extrabold text-purple-600">{stats.abuelos}</h2>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-500">
              <UserPlus size={24} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between border-b-4 border-b-rose-500">
            <div>
              <p className="text-rose-600 text-xs font-bold uppercase tracking-wider mb-1">Donantes</p>
              <h2 className="text-4xl font-extrabold text-rose-600">{stats.donantes}</h2>
            </div>
            <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-500">
              <Heart size={24} />
            </div>
          </div>

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

        {/* --- SELECTOR DE VISTA (TABS) --- */}
        <div className="flex gap-4 mb-6 border-b border-gray-200 pb-1">
          <button 
            onClick={() => setView('contactos')}
            className={`pb-3 px-4 text-sm font-bold flex items-center gap-2 transition-all ${
              view === 'contactos' 
              ? 'text-rose-600 border-b-2 border-rose-600' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Users size={18} /> Contactos Web
          </button>
          <button 
            onClick={() => setView('inscripciones')}
            className={`pb-3 px-4 text-sm font-bold flex items-center gap-2 transition-all ${
              view === 'inscripciones' 
              ? 'text-purple-600 border-b-2 border-purple-600' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <UserPlus size={18} /> Inscripciones Abuelos
          </button>
        </div>

        {/* --- BARRA DE HERRAMIENTAS --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          
          {view === 'contactos' ? (
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
          ) : (
             <div className="text-sm font-bold text-gray-500 px-4">
                Listado Oficial de Solicitudes de Ingreso
             </div>
          )}

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
              className="flex-1 md:flex-none items-center gap-2 bg-green-600 text-white hover:bg-green-700 shadow-sm border border-transparent transition-all"
            >
              <Download size={18} /> Exportar Excel
            </Button>
          </div>
        </div>

        {/* --- TABLA: CONTACTOS --- */}
        {view === 'contactos' && (
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
                    <tr><td colSpan="5" className="p-8 text-center text-gray-400">Cargando...</td></tr>
                  ) : getFilteredContactos().length === 0 ? (
                    <tr><td colSpan="5" className="p-8 text-center text-gray-400">Sin registros.</td></tr>
                  ) : (
                    getFilteredContactos().map((reg) => (
                      <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 text-sm text-gray-500">
                           {new Date(reg.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-4 font-bold text-gray-900">{reg.nombre}</td>
                        <td className="p-4 text-sm">
                           <div className="flex flex-col">
                             <span>{reg.telefono}</span>
                             <span className="text-blue-500 text-xs">{reg.email}</span>
                           </div>
                        </td>
                        <td className="p-4">
                           <span className={`inline-block px-2 py-1 rounded text-xs font-bold border ${
                             reg.tipo_ayuda?.toLowerCase().includes('voluntario') 
                               ? 'bg-blue-50 text-blue-700 border-blue-100' 
                               : 'bg-rose-50 text-rose-700 border-rose-100'
                           }`}>
                             {reg.tipo_ayuda}
                           </span>
                           {reg.profesion && <div className="text-xs text-gray-500 mt-1">{reg.profesion}</div>}
                        </td>
                        
                        {/* SELECTOR DE ESTADO CONTACTOS */}
                        <td className="p-4 text-center">
                          <select
                            value={reg.estado || 'nuevo'}
                            onChange={(e) => updateStatus(reg.id, e.target.value)}
                            className={`cursor-pointer text-xs font-bold py-1.5 px-3 rounded-full border-0 focus:ring-2 focus:ring-offset-1 transition-all outline-none appearance-none text-center shadow-sm ${getStatusColor(reg.estado || 'nuevo')}`}
                          >
                            <option value="nuevo">✨ Nuevo</option>
                            <option value="contactado">📞 Contactado</option>
                            <option value="gestionado">✅ Gestionado</option>
                            <option value="rechazado">❌ Rechazado</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TABLA: INSCRIPCIONES (ABUELOS) --- */}
        {view === 'inscripciones' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-purple-50 border-b border-purple-100 text-xs uppercase text-purple-800 font-bold tracking-wider">
                    <th className="p-4">Fecha</th>
                    <th className="p-4">Adulto Mayor</th>
                    <th className="p-4">Edad / EPS</th>
                    <th className="p-4">Acudiente</th>
                    <th className="p-4">Intereses</th>
                    <th className="p-4 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr><td colSpan="6" className="p-8 text-center text-gray-400">Cargando inscripciones...</td></tr>
                  ) : inscripciones.length === 0 ? (
                    <tr><td colSpan="6" className="p-8 text-center text-gray-400">No hay abuelos inscritos aún.</td></tr>
                  ) : (
                    inscripciones.map((abuelo) => (
                      <tr key={abuelo.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 text-sm text-gray-500">
                           {new Date(abuelo.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                           <div className="font-bold text-gray-900">{abuelo.nombres} {abuelo.apellidos}</div>
                           <div className="text-xs text-gray-500">CC: {abuelo.numero_documento}</div>
                        </td>
                        <td className="p-4 text-sm">
                           <div className="flex flex-col gap-1">
                             <span className="font-medium">Nac: {abuelo.fecha_nacimiento}</span>
                             <span className="text-xs bg-gray-100 px-2 py-0.5 rounded w-fit text-gray-600">EPS: {abuelo.eps}</span>
                           </div>
                        </td>
                        <td className="p-4">
                           <div className="flex items-center gap-2">
                              <Phone size={14} className="text-green-600"/>
                              <span className="font-bold text-gray-800">{abuelo.telefono_acudiente}</span>
                           </div>
                           <div className="text-xs text-gray-500">
                              {abuelo.nombre_acudiente} ({abuelo.parentesco})
                           </div>
                        </td>
                        <td className="p-4">
                           <div className="flex flex-wrap gap-1">
                             {abuelo.programas_interes && abuelo.programas_interes.map((prog, idx) => (
                               <span key={idx} className="bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                                 {prog}
                               </span>
                             ))}
                           </div>
                        </td>
                        
                        {/* SELECTOR DE ESTADO ABUELOS */}
                        <td className="p-4 text-center">
                          <select
                            value={abuelo.estado || 'pendiente'}
                            onChange={(e) => updateStatus(abuelo.id, e.target.value)}
                            className={`cursor-pointer text-xs font-bold py-1.5 px-3 rounded-full border-0 focus:ring-2 focus:ring-offset-1 transition-all outline-none appearance-none text-center shadow-sm ${getStatusColor(abuelo.estado || 'pendiente')}`}
                          >
                            <option value="pendiente">⏳ Pendiente</option>
                            <option value="contactado">📞 Contactado</option>
                            <option value="aprobado">✅ Aprobado</option>
                            <option value="rechazado">❌ Rechazado</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;