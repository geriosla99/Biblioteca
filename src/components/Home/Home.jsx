import { Boton, Container } from './Home';
import React, { useState } from "react";

const Home = () => {
  const [action, setAction] = useState(""); // Estado para controlar qué acción está activa
  const [bookData, setBookData] = useState(null); // Datos del libro que se buscan
  const [formData, setFormData] = useState({}); // Estado dinámico para campos del formulario
  const [library, setLibrary] = useState([]); // Almacena todos los libros
  const [loanRecords, setLoanRecords] = useState([]); // Almacena los préstamos

  // Función para manejar los cambios dinámicos en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para manejar la búsqueda del libro en la biblioteca
  const searchBook = () => {
    const foundBook = library.find(
      (book) => book.titulo.toLowerCase() === formData.searchBook.toLowerCase()
    );
    if (foundBook) {
      setBookData(foundBook);
    } else {
      alert("El libro no se encontró.");
      setBookData(null);
    }
  };

  // Función para agregar un libro a la biblioteca
  const addBook = () => {
    const newBook = { ...formData, prestamos: [], disponibilidad: true };
    setLibrary([...library, newBook]);
    alert(`Libro "${formData.titulo}" agregado correctamente.`);
    setFormData({});
  };

  // Función para prestar un libro
  const lendBook = () => {
    if (bookData && bookData.disponibilidad) {
      const newLoan = {
        id_usuario: formData.id_usuario,
        nombre: formData.nombre,
        email: formData.email,
        id_libro: bookData.id_libro,
        fecha_prestamo: new Date().toLocaleString(),
        id_prestamo: `prestamo${loanRecords.length + 1}`,
      };

      // Actualizar libro con préstamo
      const updatedLibrary = library.map((book) =>
        book.id_libro === bookData.id_libro
          ? { ...book, disponibilidad: false, prestamos: [...book.prestamos, newLoan.id_prestamo] }
          : book
      );

      // Actualizar registros de préstamo
      setLoanRecords([...loanRecords, newLoan]);
      setLibrary(updatedLibrary);
      alert(`El libro "${bookData.titulo}" ha sido prestado a ${formData.nombre}.`);
      setFormData({});
    } else {
      alert("El libro no está disponible para préstamo.");
    }
  };

  // Función para devolver un libro
  const returnBook = () => {
    if (bookData && !bookData.disponibilidad) {
      const updatedLibrary = library.map((book) =>
        book.id_libro === bookData.id_libro
          ? { ...book, disponibilidad: true }
          : book
      );
      setLibrary(updatedLibrary);
      alert(`El libro "${bookData.titulo}" ha sido devuelto.`);
    } else {
      alert("El libro no está prestado.");
    }
    setFormData({});
  };

  // Generar dinámicamente los inputs según la acción seleccionada
  const renderFields = () => {
    switch (action) {
      case "buscar":
        return (
          <>
            <input
              type="text"
              name="searchBook"
              value={formData.searchBook || ""}
              onChange={handleInputChange}
              placeholder="Nombre del libro"
            />
            <Boton onClick={searchBook}>Buscar</Boton>
            {bookData && (
              <div>
                <p><strong>Autor:</strong> {bookData.autor}</p>
                <p><strong>Disponibilidad:</strong> {bookData.disponibilidad.toString()}</p>
                <p><strong>Editorial:</strong> {bookData.editorial}</p>
                <p><strong>ID Libro:</strong> {bookData.id_libro}</p>
                <p><strong>Título:</strong> {bookData.titulo}</p>
                <p><strong>Préstamos:</strong> {bookData.prestamos.join(", ")}</p>
              </div>
            )}
          </>
        );
      case "agregar":
        return (
          <>
            <input
              type="text"
              name="autor"
              value={formData.autor || ""}
              onChange={handleInputChange}
              placeholder="Autor"
            />
            <input
              type="text"
              name="editorial"
              value={formData.editorial || ""}
              onChange={handleInputChange}
              placeholder="Editorial"
            />
            <input
              type="text"
              name="id_libro"
              value={formData.id_libro || ""}
              onChange={handleInputChange}
              placeholder="ID del libro"
            />
            <input
              type="text"
              name="titulo"
              value={formData.titulo || ""}
              onChange={handleInputChange}
              placeholder="Título"
            />
            <Boton onClick={addBook}>Agregar Libro</Boton>
          </>
        );
      case "prestar":
        return (
          <>
            <input
              type="text"
              name="searchBook"
              value={formData.searchBook || ""}
              onChange={handleInputChange}
              placeholder="Nombre del libro"
            />
            <Boton onClick={searchBook}>Buscar</Boton>
            {bookData && bookData.disponibilidad && (
              <>
                <input
                  type="text"
                  name="id_usuario"
                  value={formData.id_usuario || ""}
                  onChange={handleInputChange}
                  placeholder="ID de usuario"
                />
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre || ""}
                  onChange={handleInputChange}
                  placeholder="Nombre del usuario"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  placeholder="Correo electrónico"
                />
                <Boton onClick={lendBook}>Confirmar Préstamo</Boton>
              </>
            )}
          </>
        );
      case "devolucion":
        return (
          <>
            <input
              type="text"
              name="searchBook"
              value={formData.searchBook || ""}
              onChange={handleInputChange}
              placeholder="Nombre del libro"
            />
            <Boton onClick={searchBook}>Buscar</Boton>
            {bookData && !bookData.disponibilidad && (
              <Boton onClick={returnBook}>Confirmar Devolución</Boton>
            )}
          </>
        );
      default:
        return <p>Selecciona una acción para continuar.</p>;
    }
  };

  return (
    <Container>
      <h1>Bienvenido a la Biblioteca</h1>
      <p>Gestión de libros, usuarios y préstamos en un solo lugar.</p>
      <div>
        <Boton onClick={() => setAction("buscar")}>Buscar Libro</Boton>
        <Boton onClick={() => setAction("agregar")}>Agregar Libro</Boton>
        <Boton onClick={() => setAction("prestar")}>Prestar Libro</Boton>
        <Boton onClick={() => setAction("devolucion")}>Devolución de Libro</Boton>
      </div>
      <div>{renderFields()}</div>
    </Container>
  );
};

export default Home;