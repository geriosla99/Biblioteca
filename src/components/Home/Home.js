import styled from "styled-components";

export const Container = styled.div`
    padding-top: 2rem;
    padding-bottom:1rem;
    margin-left: 2rem;
`;

export const Boton = styled.button`
    border: none;
    border-radius: .5rem;
    background: #457b9d;
    padding: .5rem;
    margin: 0 1rem;
    cursor: pointer;
     &:hover {
        background: #a8dadc; /* Cambia el color de fondo al hacer hover */
        transform: scale(1.05); /* Agranda ligeramente el botón */
        transition: background 0.2s, transform 0.3s; /* Añade una transición suave */
    }
`;