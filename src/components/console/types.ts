/** Una línea de la traza de trabajo, con el formato de "Fuentes de la respuesta". */
export interface Query {
  question: string;
  rows: number;
  seconds: number;
}

export interface AnswerTable {
  columns: string[];
  rows: (string | number)[][];
}

export interface ChartSpec {
  title: string;
  unit?: string;
  /** `value` posiciona; `display` es lo que se lee, ya formateado por idioma. */
  points: { label: string; value: number; display?: string }[];
}

export interface Answer {
  title: string;
  /** La línea en negrita que responde, con los números clave. */
  lead: string;
  table?: AnswerTable;
  alert?: { title: string; body: string };
  chart?: ChartSpec;
  conclusion?: string;
  followUp?: string;
}

export interface Scenario {
  id: string;
  question: string;
  queries: Query[];
  answer: Answer;
  recommendation: string;
  /** La repregunta dentro de la misma conversación. */
  nextTurn?: { question: string; answer: Answer };
}
