import AsyncStorage from '@react-native-async-storage/async-storage';
import { Answer } from '../components/types';

const STORAGE_KEY = '@answers';

export const getAnswers = async (): Promise<Answer[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log('Erro ao carregar respostas:', error);
    return [];
  }
};

export const saveAnswers = async (answers: Answer[]) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(answers)
    );
  } catch (error) {
    console.log('Erro ao salvar respostas:', error);
  }
};

export const addAnswer = async (newAnswer: Answer) => {
  try {
    const currentAnswers = await getAnswers();

    const updatedAnswers = [...currentAnswers, newAnswer];

    await saveAnswers(updatedAnswers);

    return updatedAnswers;
  } catch (error) {
    console.log('Erro ao adicionar resposta:', error);
    return [];
  }
};

export const clearAnswers = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.log('Erro ao limpar histórico:', error);
  }
};



