export interface Question {
  question: string;
  options: string[];
  chosen?: number;
  answer?: number;
}