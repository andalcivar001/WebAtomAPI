import { Timestamp } from "firebase-admin/firestore";

export interface Task {
  id?: string;
  titulo: string;
  descripcion: boolean;
  fechaCreacion?: Timestamp;
  estado: string;
}
