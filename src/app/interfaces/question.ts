export interface Question {
  category: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: string;
  regions: string[];
  tags: string[];
  type: string;
  difficulty: string;
  id: string;
}
