interface Variant {
  id: string;
  nome: string;
}

export interface Product {
  id: string;
  nome: string;
  qtdVariacoes: number;
  variacoes: Variant[];
  createdAt: Date;
  updatedAt: Date;
}
