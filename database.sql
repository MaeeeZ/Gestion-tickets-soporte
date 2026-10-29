CREATE DATABASE IF NOT EXISTS soporte_db;
USE soporte_db;

CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asunto VARCHAR(150) NOT NULL,
    solicitante VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    prioridad VARCHAR(20) NOT NULL,
    estado VARCHAR(20) NOT NULL,
    fechaRegistro DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tickets (asunto, solicitante, descripcion, categoria, prioridad, estado)
VALUES ('Impresora no funciona', 'Juan Pérez', 'La impresora del segundo piso no imprime a color', 'Hardware', 'Alta', 'Abierto');