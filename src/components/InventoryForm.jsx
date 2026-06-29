import React, { useState, useEffect } from 'react';

function InventoryForm({ onSave, editingProduct, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    stock: 0
  });
  const [error, setError] = useState('');

  // Efecto por si estamos en modo edición (Criterio 3.1.1)
  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    } else {
      setFormData({ name: '', category: '', stock: 0 });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      // Buenas prácticas de sanitización: si es stock, forzarlo a entero
      [name]: name === 'stock' ? parseInt(value, 10) || 0 : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // --- RECOMENDACIONES DE SEGURIDAD IA (Criterio 3.1.2) ---
    // 1. Sanitización de textos eliminando espacios en blanco innecesarios
    const cleanName = formData.name.trim();
    const cleanCategory = formData.category.trim();

    // 2. Validación robusta de campos obligatorios
    if (!cleanName || !cleanCategory) {
      setError('⚠️ Todos los campos son obligatorios y no pueden contener solo espacios.');
      return;
    }

    // 3. Control de límites lógicos (Evitar stocks negativos o incoherentes)
    if (formData.stock < 0) {
      setError('⚠️ El stock no puede ser un número negativo.');
      return;
    }
    if (formData.stock > 10000) {
      setError('⚠️ El stock ingresado excede el límite permitido por seguridad de almacenamiento.');
      return;
    }

    // Si pasa todas las capas de seguridad, guardamos los datos limpios
    onSave({
      ...formData,
      name: cleanName,
      category: cleanCategory
    });

    // Limpiar formulario si era una creación nueva
    if (!editingProduct) {
      setFormData({ name: '', category: '', stock: 0 });
    }
  };

  return (
    <div className="card shadow-sm border mb-4">
      <div className="card-header bg-light fw-bold text-dark">
        {editingProduct ? '✏️ Modificar Producto' : '➕ Registrar Nuevo Producto'}
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger py-2 fs-6">{error}</div>}
        
        <form onSubmit={handleSubmit} className="row g-3 align-items-end">
          <div className="col-md-4">
            <label className="form-label fw-semibold text-secondary">Nombre del Artículo</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Ej: Polera Heavy Weight"
              maxLength="50" // Control IA: evitar entradas masivas de texto
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold text-secondary">Categoría</label>
            <input
              type="text"
              name="category"
              className="form-control"
              placeholder="Ej: Textil"
              maxLength="30"
              value={formData.category}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <label className="form-label fw-semibold text-secondary">Cantidad Stock</label>
            <input
              type="number"
              name="stock"
              className="form-control"
              min="0"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3 d-flex gap-2">
            <button type="submit" className="btn btn-warning fw-bold text-dark flex-grow-1">
              {editingProduct ? 'Actualizar' : 'Guardar'}
            </button>
            {editingProduct && (
              <button type="button" className="btn btn-secondary flex-grow-1" onClick={onCancel}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default InventoryForm;