import React, { useState, useEffect } from 'react';

const BibliotecaApp = () => {
  const [library, setLibrary] = useState([]);
  const [loanRecords, setLoanRecords] = useState([]);
  const [formData, setFormData] = useState({});
  const [bookData, setBookData] = useState({});

  // Cargar libros disponibles al iniciar
  useEffect(() => {
    fetch('http://localhost:5000/libros_disponibles')
      .then((res) => res.json())
      .then((data) => setLibrary(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  // Función para registrar un usuario
  const registerUser = async () => {
    const response = await fetch('http://localhost:5000/registrar_usuario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    alert(result.mensaje);
    setFormData({}); // Limpiar formulario
  };

  // Función para agregar un libro a la biblioteca
  const addBook = async () => {
    const response = await fetch('http://localhost:5000/crear_libro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    alert(result.mensaje);
    setLibrary([...library, formData]); // Actualizar localmente
    setFormData({}); // Limpiar formulario
  };

  // Función para registrar un préstamo
  const lendBook = async () => {
    const newLoan = {
      id_usuario: formData.id_usuario,
      nombre: formData.nombre,
      email: formData.email,
      id_libro: bookData.id_libro,
      fecha_prestamo: new Date().toLocaleString(),
      id_prestamo: `prestamo${loanRecords.length + 1}`,
    };

    const response = await fetch('http://localhost:5000/registrar_prestamo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLoan),
    });

    const result = await response.json();
    alert(result.mensaje);
    setLoanRecords([...loanRecords, newLoan]); // Actualizar localmente
    setFormData({}); // Limpiar formulario
  };

  // Función para modificar un usuario
  const updateUser = async (id_usuario) => {
    const response = await fetch(`http://localhost:5000/modificar_usuario/${id_usuario}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    alert(result.mensaje);
    setFormData({}); // Limpiar formulario
  };

  // Función para eliminar un usuario
  const deleteUser = async (id_usuario) => {
    const response = await fetch(`http://localhost:5000/eliminar_usuario/${id_usuario}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    alert(result.mensaje);
  };

  return (
    <div>
      <h1>Biblioteca</h1>

      {/* Formulario para registrar usuario */}
      <div>
        <h2>Registrar Usuario</h2>
        <input
          type="text"
          placeholder="ID Usuario"
          value={formData.id_usuario || ''}
          onChange={(e) => setFormData({ ...formData, id_usuario: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nombre"
          value={formData.nombre || ''}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={formData.contraseña || ''}
          onChange={(e) => setFormData({ ...formData, contraseña: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email || ''}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <button onClick={registerUser}>Registrar Usuario</button>
      </div>

      {/* Formulario para agregar libro */}
      <div>
        <h2>Agregar Libro</h2>
        <input
          type="text"
          placeholder="ID Libro"
          value={formData.id_libro || ''}
          onChange={(e) => setFormData({ ...formData, id_libro: e.target.value })}
        />
        <input
          type="text"
          placeholder="Autor"
          value={formData.autor || ''}
          onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
        />
        <input
          type="text"
          placeholder="Título"
          value={formData.titulo || ''}
          onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Editorial"
          value={formData.editorial || ''}
          onChange={(e) => setFormData({ ...formData, editorial: e.target.value })}
        />
        <input
          type="checkbox"
          checked={formData.disponible || false}
          onChange={(e) => setFormData({ ...formData, disponible: e.target.checked })}
        />
        Disponible
        <button onClick={addBook}>Agregar Libro</button>
      </div>

      {/* Formulario para registrar préstamo */}
      <div>
        <h2>Registrar Préstamo</h2>
        <input
          type="text"
          placeholder="ID Usuario"
          value={formData.id_usuario || ''}
          onChange={(e) => setFormData({ ...formData, id_usuario: e.target.value })}
        />
        <input
          type="text"
          placeholder="ID Libro"
          value={bookData.id_libro || ''}
          onChange={(e) => setBookData({ ...bookData, id_libro: e.target.value })}
        />
        <button onClick={lendBook}>Registrar Préstamo</button>
      </div>

      {/* Mostrar libros disponibles */}
      <div>
        <h2>Libros Disponibles</h2>
        <ul>
          {library.map((libro, index) => (
            <li key={index}>
              {libro.Título} - {libro.Autor} ({libro.Editorial}) {libro.Disponible ? 'Disponible' : 'No Disponible'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BibliotecaApp;
