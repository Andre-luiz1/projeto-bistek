import React, { useEffect, useState } from 'react';
import {
  getAnswers,
  addAnswer,
  clearAnswers,
} from './components/storage';

import { exportToExcel } from './components/excel';

import { Choice, Answer } from './components/types';

import NameInputScreen from './components/NameInputScreen';
import ChoiceScreen from './components/ChoiceScreen';
import ResultScreen from './components/ResultScreen';
import HistoryScreen from './components/HistoryScreen';

type Screen = 'name' | 'choice' | 'result' | 'history';

export default function App() {
  const [screen, setScreen] = useState<Screen>('name');
  const [name, setName] = useState('');
  const [choice, setChoice] = useState<Choice | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
  loadStoredAnswers();
}, []);

  const loadStoredAnswers = async () => {
  const data = await getAnswers();
  setAnswers(data);
};

  const handleNameNext = (fullName: string) => {
    setName(fullName);
    setScreen('choice');
  };

  const handleChoiceConfirm = async (selected: Choice) => {
    const newAnswer: Answer = {
      id: Date.now().toString(),
      name,
      choice: selected,
      timestamp: new Date().toLocaleString('pt-BR'),
    };

    const updatedAnswers = await addAnswer(newAnswer);

setAnswers(updatedAnswers);

    setChoice(selected);
    setScreen('result');
  };

  const handleRestart = () => {
    setName('');
    setChoice(null);
    setScreen('name');
  };

  const clearHistory = async () => {
    await clearAnswers();
    setAnswers([]);
  };

  if (screen === 'name') {
    return (
      <NameInputScreen
        onNext={handleNameNext}
        onViewHistory={() => setScreen('history')}
      />
    );
  }

  if (screen === 'choice') {
    return (
      <ChoiceScreen
        name={name}
        onBack={() => setScreen('name')}
        onConfirm={handleChoiceConfirm}
      />
    );
  }

  if (screen === 'history') {
    return (
      <HistoryScreen
        answers={answers}
        onBack={() => setScreen('name')}
        onClear={clearHistory}
        onExport={() => exportToExcel(answers)}
      />
    );
  }

  return (
    <ResultScreen
      name={name}
      choice={choice!}
      onRestart={handleRestart}
    />
  );
}