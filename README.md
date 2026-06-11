TicketsIT - Sistema de Tickets Laboratorio C27

📋 Descripción

TicketsIT es un sistema de gestión de tickets para reporte de problemas de hardware y software en el Laboratorio C27 del Colegio KINAL. Permite a los usuarios registrar incidentes, consultar el estado de sus solicitudes y al personal de IT actualizar el progreso de cada ticket, todo desde la terminal de Visual Studio Code.


🚀 Tecnologías Utilizadas

TecnologíaVersiónNode.js18+TypeScript5+ts-node10+pnpm8+


📁 Estructura del Proyecto

tickets-kinal/
├── src/
│   ├── types.ts           ← Tipos: Prioridad, EstadoIncidente, interfaz Incidente
│   ├── ticketService.ts   ← Lógica: crear, listar, buscar y actualizar tickets
│   └── index.ts           ← Menú principal e interacción con el usuario
├── package.json
├── tsconfig.json
└── README.md


📥 Instalación

1. Clonar el repositorio

bashgit clone https://github.com/jjax-2025012/tickets-kinal
cd tickets-kinal

2. Instalar dependencias

bashpnpm install

3. Ejecutar la aplicación

bashpnpm ts-node src/index.ts


🧑‍💻 Uso del Sistema

Al correr el proyecto se accede directamente al menú principal, sin selección de rol:

    SISTEMA DE TICKETS - LABORATORIO C27  
                KINAL                     


  1. Agregar ticket
  2. Ver tickets
  3. Actualizar estado de ticket
  4. Salir


📝 Funcionalidades

1. Agregar Ticket

El usuario ingresa manualmente:

CampoDescripciónTítuloNombre corto del problemaDescripciónDetalle del incidenteTu nombreNombre de quien reportaPrioridad baja / media / alta


El ID y la fecha de creación se generan automáticamente.
El estado inicial siempre es abierto.




2. Ver Tickets

Muestra todos los tickets registrados con su información completa:

 
   TICKET-001                          
   Título    : PC no enciende          
   Reportado : Maria Lopez             
   Prioridad : alta                    
   Estado    : en progreso             
   Fecha     : 11/06/2026              
  

Ícono de prioridad:


 Alta
 Media
 Baja


Ícono de estado:


 Abierto
 En progreso
 Resuelto



3. Actualizar Estado de Ticket

Se listan los tickets disponibles y se selecciona por ID. Los estados disponibles son:

OpciónEstado1abierto2en progreso3resuelto


Solo se puede actualizar el estado. Los demás campos son de solo lectura una vez creado el ticket.




🔷 Tipos e Interfaces TypeScript

typescripttype Prioridad = "baja" | "media" | "alta";

type EstadoIncidente = "abierto" | "en progreso" | "resuelto";

interface Incidente {
  readonly id: string;
  titulo: string;
  descripcion: string;
  reportadoPor: string;
  prioridad: Prioridad;
  estado: EstadoIncidente;
  fechaCreacion: Date;
}


❓ Solución de Problemas

ProblemaSoluciónpnpm: command not foundEjecutar npm install -g pnpmts-node: command not foundEjecutar pnpm add -D ts-node typescript @types/nodePrioridad inválidaSolo se aceptan: baja, media o altaID de ticket no encontradoVerificar el ID exacto mostrado en "Ver tickets"No se guardan tickets al reiniciarLos datos son en memoria; se resetean al cerrar


📝 Historial de Cambios

VersiónCambio1.0Configuración inicial del proyecto con TypeScript y pnpm1.1Tipos Prioridad, EstadoIncidente e interfaz Incidente1.2Servicio de tickets: crear, listar, buscar y actualizar1.3Menú interactivo con input real del usuario en terminal


👨‍💻 Desarrollador

Joseth Emanuel Jax Ramirez
Estudiante de Perito Técnico en Informática
Colegio KINAL — 2026


📄 Licencia

Proyecto educativo — Colegio KINAL