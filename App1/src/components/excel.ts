import * as Sharing from 'expo-sharing';
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system/legacy';

import { Answer } from '../components/types';

export const exportToExcel = async (answers: Answer[]) => {
  try {
    if (answers.length === 0) {
      alert('Nenhum registro encontrado.');
      return;
    }

    const data = answers.map((item, index) => ({
      Número: index + 1,
      Nome: item.name,
      Resposta: item.choice.toUpperCase(),
      Data: item.timestamp,
    }));

    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Histórico'
    );

    const excelBase64 = XLSX.write(workbook, {
      type: 'base64',
      bookType: 'xlsx',
    });

    const fileUri =
      FileSystem.cacheDirectory + 'historico.xlsx';

    await FileSystem.writeAsStringAsync(
      fileUri,
      excelBase64,
      {
        encoding: FileSystem.EncodingType.Base64,
      }
    );

    await Sharing.shareAsync(fileUri);
  } catch (error) {
    console.log('Erro ao exportar Excel:', error);
  }
};