export interface Vehicle {
  carType?: string;
  fabricationYear?: string;
  id?: number | null;
  kmRecorridos?: number;
  marca?: string;
  modelo?: string;
  motorType?: string;
  nasientos?: number;
  patente?: string;
}

export interface Bono {
  id?: number | null;
  marca?: string;
  usado?: boolean;
  amount?: number;
  receiptId?: number;
}

export interface Details {
  id?: number | null;
  description?: string;
  value?: number;
  percent?: number;
}

export interface Receipt {
  id?: number;
  patente?: Vehicle;
  reparaciones?: Reparation[];
  bono?: Bono | null;
  details?: Details[];
  retirado?: boolean;
  pagado?: boolean;
  costoTotal?: number;
}

export interface Reparation {
  fechaIngreso: string;
  fechaRetiro: string;
  fechaSalida: string;
  horaIngreso: string;
  horaRetiro: string;
  horaSalida: string;
  id: number;
  montoTotal: number;
  receipt_id: number;
  typeRep: number;
  vehiculo: Vehicle;
}

export interface ColumnData {
  label: string;
  width: number;
}
