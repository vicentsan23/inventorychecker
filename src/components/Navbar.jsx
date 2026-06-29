import React from 'react';

function Navbar({ activeTab, setActiveTab }) {
  const brandColor = '#1a434d'; 

  return (
    <header className="shadow" style={{ backgroundColor: brandColor }}>
      {/* Fila Superior: Título Centrado y Perfil (Con position-relative para el centrado absoluto) */}
      <div className="container-fluid py-3 px-4 d-flex justify-content-between align-items-center position-relative border-bottom border-secondary border-opacity-25">
        
        {/* Espaciador invisible a la izquierda para equilibrar el flexbox */}
        <div style={{ width: '90px' }} className="d-none d-sm-block"></div>

        {/* Título de la App: Centrado perfectamente en la pantalla */}
        <h1 
          className="h3 mb-0 fw-bold text-white tracking-tight position-absolute start-50 translate-middle-x" 
          style={{ fontFamily: 'sans-serif' }}
        >
          inventoryChecker
        </h1>
        
        {/* Perfil Admin (Se mantiene a la derecha) */}
        <div 
          className="d-flex align-items-center border border-white border-opacity-25 p-2 rounded bg-white bg-opacity-10" 
          style={{ cursor: 'pointer', zIndex: 2 }}
        >
          <span className="fs-6 me-2 d-none d-sm-inline text-white fw-medium">Admin</span>
          <span className="fs-5 text-white-50">👤</span>
        </div>
      </div>

      {/* Fila Inferior: Menú de Pestañas */}
      <nav className="container-fluid px-4" style={{ backgroundColor: '#14353d' }}>
        <div className="d-flex flex-wrap text-center">
          <button
            onClick={() => setActiveTab('resumen')}
            className={`btn py-3 px-4 rounded-0 border-0 fw-medium fs-6 flex-grow-1 flex-md-grow-0 text-white ${
              activeTab === 'resumen' ? 'border-bottom border-3 border-warning fw-bold' : 'text-white-50 opacity-75'
            }`}
            style={{ 
              backgroundColor: activeTab === 'resumen' ? '#1a434d' : 'transparent',
              transition: 'all 0.2s ease'
            }}
          >
            📊 Resumen Rápido
          </button>

          <button
            onClick={() => setActiveTab('inventario')}
            className={`btn py-3 px-4 rounded-0 border-0 fw-medium fs-6 flex-grow-1 flex-md-grow-0 text-white ${
              activeTab === 'inventario' ? 'border-bottom border-3 border-warning fw-bold' : 'text-white-50 opacity-75'
            }`}
            style={{ 
              backgroundColor: activeTab === 'inventario' ? '#1a434d' : 'transparent',
              transition: 'all 0.2s ease'
            }}
          >
            📦 Ver Inventario / Productos
          </button>

          <button
            onClick={() => setActiveTab('proveedores')}
            className={`btn py-3 px-4 rounded-0 border-0 fw-medium fs-6 flex-grow-1 flex-md-grow-0 text-white ${
              activeTab === 'proveedores' ? 'border-bottom border-3 border-warning fw-bold' : 'text-white-50 opacity-75'
            }`}
            style={{ 
              backgroundColor: activeTab === 'proveedores' ? '#1a434d' : 'transparent',
              transition: 'all 0.2s ease'
            }}
          >
            🏭 Ver Proveedores
          </button>

          <button
            onClick={() => setActiveTab('administracion')}
            className={`btn py-3 px-4 rounded-0 border-0 fw-medium fs-6 flex-grow-1 flex-md-grow-0 text-white ${
              activeTab === 'administracion' ? 'border-bottom border-3 border-warning fw-bold' : 'text-white-50 opacity-75'
            }`}
            style={{ 
              backgroundColor: activeTab === 'administracion' ? '#1a434d' : 'transparent',
              transition: 'all 0.2s ease'
            }}
          >
            ⚙️ Panel de Administración
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;