// ── Módulo Seguimiento ──
export type EstadoSolicitud =
  "Recibida" | "En revisión" | "Aprobada" | "Rechazada";

export interface Solicitud {
  id: string;
  nombreEstudiante: string;
  tipoBeca: string;
  fecha: string;
  estado: EstadoSolicitud;
  motivo: string;
}

// ── Módulo Postulación ──
export interface DocumentoGuardado {
  fileName: string;
}

export interface DatosPostulacion {
  nombre: string;
  email: string;
  documentos: Record<string, DocumentoGuardado>;
}
