export interface Data {
  nome: String;
  sexo: string;
  idade: number;
  altura: number;
  peso: number;
  objetivo: String;
  refeicoes: RefeicoesProps[];
  suplementos: String[];
}

interface RefeicoesProps {
  horario: String;
  nome: String;
  alimentos: String[];
}
