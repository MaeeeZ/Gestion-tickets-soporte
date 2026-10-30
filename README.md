# Sistema de Gestión de Tickets de Soporte Técnico (Full Stack)

Aplicación web Full Stack para el registro, actualización, seguimiento y eliminación de solicitudes de soporte técnico. Proyecto desarrollado para evaluación técnica individual.

## Arquitectura y Tecnologías Utilizadas

- **Frontend:** Angular 22 (Single Page Application - SPA, componentes Standalone, HttpClient, RxJS).
- **Backend:** Node.js con Express (API REST).
- **Base de Datos:** MySQL (driver `mysql2` utilizando consultas parametrizadas contra Inyección SQL).
- **Control de Versiones:** Git y GitHub (repositorio público con historial de commits estructurado).

-------------------------------------------------------------------

## Requisitos e Instalación

### Base de Datos MySQL
Crear la base de datos `soporte_db` y la tabla `tickets`:
```sql
CREATE DATABASE IF NOT EXISTS soporte_db;
USE soporte_db;

CREATE TABLE IF NOT EXISTS tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asunto VARCHAR(150) NOT NULL,
    solicitante VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    categoria VARCHAR(50) DEFAULT 'Sistemas',
    prioridad VARCHAR(20) DEFAULT 'Media',
    estado VARCHAR(20) DEFAULT 'Abierto',
    fechaRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
-------------------------------------------------------------------

## Comandos para levantar el Backend en la terminal (Nodes.js/Express)

cd backend
npm install
node index.js

## Comandos de Frontend (Angular)

cd frontend/app-tickets
npm install
ng serve -o
-------------------------------------------------------------------

## Operaciones CRUD e Integración Realizada'

- Create (Crear): Formulario dinámico con validaciones para registrar nuevos tickets de soporte.

- Read (Obtener): Tabla interactiva con distinción de colores por estado (Abierto, En Proceso, Cerrado) y prioridad (Baja, Media, Alta).

- Update (Actualizar): Modificación de datos y estado de tickets existentes mediante parámetro de ruta :id.

- Delete (Eliminar): Eliminación de registros en base de datos con confirmación de usuario.

-------------------------------------------------------------------

## Declaración sobre el uso de Inteligencia Artificial

De acuerdo con los lineamientos de integridad académica e instrucciones de la pauta de evaluación:

Declaración: Se utilizaron herramientas de Inteligencia Artificial Generativa (IA) como apoyo interactivo durante el desarrollo del proyecto para la depuración de errores de configuración en Angular, estructuración inicial de código de la API REST y optimización de comandos de consola. El diseño arquitectónico, las decisiones del modelo de datos, las pruebas funcionales del sistema CRUD y la comprensión integral del código fueron validados y asumidos en su totalidad por el autor del repositorio para su defensa individual.