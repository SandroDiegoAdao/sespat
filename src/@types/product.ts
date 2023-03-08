interface Variant {
  id: string;
  nome: string;
}

export interface Product {
  id: string;
  nome: string;
  variacoes: Variant[];
  createdAt: Date;
  updatedAt: Date;
}
