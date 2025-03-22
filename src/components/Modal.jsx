import React from "react";
import "./Modal.css"; // Asegúrate de importar estilos

const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null; // Si no está activo, no renderizarlo

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2>{title}</h2>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;

