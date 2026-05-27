export type Choice = 'sim' | 'nao';

export type Answer = {
  id: string;
  name: string;
  choice: Choice;
  timestamp: string;
};
