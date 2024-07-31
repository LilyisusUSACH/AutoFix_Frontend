import { register } from "module";

export interface Vehicle {
	id: number;
	patente: string;
	marca: string;
	modelo: string;
	anofab: number;
	km: number;
	tipo: string;
	motor: string;
	nasientos: number;
}

export interface Detail {
	description: string;
	value: number;
	percent: number;
}

export interface Bono {
	id: number;
	marca: string;
	usado: boolean;
	amount: number;
	receiptId?: number;
}

export interface Reparation {
	id: number;
	nombre: string;
	descripcion: string;
	gasValue: number;
	dieselValue: number;
	hibridoValue: number;
	electricoValue: number;
}

export interface RegReparation {
	id: number;
	patente: string;
	receipt: number;
	reparationId: number;
	reparation?: Reparation;
	createdAt: string;
	completedAt?: any;
	amount: number;
}

export interface Receipt{
	id: number;
	vehicle: Vehicle;
	patente: string;
	details: Detail[];
	bono?: Bono;
	regReparations: RegReparation[];
	deliveredAt?: string;
	sumaRep: number;
	total: number;
}

export interface ColumnData {
	label: string;
}

export interface ColumnDataWidth {
	label: string;
	width: number;
}


export interface Register {
	count: number;
	amount: number;
}

export interface RepOneReg{
	name: string;
	sedan: Register;
	hatchback: Register;
	suv: Register;
	pickup: Register;
	furgoneta: Register;
	total: Register;
}


export interface RepTwoReg{
	name: string;
	month: Register;
	varOneQty: number;
	varOneAmount: number;
	prevMonth: Register;
	varTwoQty: number;
	varTwoAmount: number;
	prevPMonth: Register;
}