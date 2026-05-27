import React from 'react';
import { Answer } from './types';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';

type Props = {
  answers: Answer[];
  onBack: () => void;
  onClear: () => void;
  onExport: () => void;
};

export default function HistoryScreen({
  answers,
  onBack,
  onClear,
  onExport,
}: Props) {
  const renderItem = ({ item, index }: { item: Answer; index: number }) => {
    const isSim = item.choice === 'sim';
    return (
      <View style={styles.card}>
        <View style={styles.cardLeft}>
          <Text style={styles.cardIndex}>#{String(index + 1).padStart(2, '0')}</Text>
          <View>
            <Text style={styles.cardName}>{item.name}</Text>
            <Text style={styles.cardTime}>{item.timestamp}</Text>
          </View>
        </View>
        <View style={[styles.badge, isSim ? styles.badgeSim : styles.badgeNao]}>
          <Text style={[styles.badgeText, isSim ? styles.badgeTextSim : styles.badgeTextNao]}>
            {isSim ? 'SIM' : 'NÃO'}
          </Text>
        </View>
      </View>
    );
  };

  const handleClearConfirm = () => {
  Alert.alert(
    'Limpar histórico',
    'Tem certeza que deseja apagar todos os registros?',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Apagar',
        style: 'destructive',
        onPress: onClear,
      },
    ]
  );
};

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />

      <View style={styles.header}>
  <TouchableOpacity onPress={onBack} style={styles.backBtn}>
    <Text style={styles.backText}>← Voltar</Text>
  </TouchableOpacity>

  <Text style={styles.title}>Histórico</Text>

  <Text style={styles.count}>
    {answers.length} {answers.length === 1 ? 'resposta' : 'respostas'}
  </Text>

  <TouchableOpacity onPress={handleClearConfirm} style={styles.clearBtn}>
    <Text style={styles.clearText}>Limpar histórico</Text>
  </TouchableOpacity>
  <TouchableOpacity
  onPress={onExport}
  style={styles.exportBtn}
>
  <Text style={styles.exportText}>
    Exportar Excel
  </Text>
</TouchableOpacity>
</View>

      {answers.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>📋</Text>
          <Text style={styles.emptyText}>Nenhuma resposta registrada ainda.</Text>
        </View>
      ) : (
        <FlatList
          data={[...answers].reverse()}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  header: {
    paddingTop: 56,
    paddingHorizontal: 28,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  backBtn: { marginBottom: 16 },
  backText: { color: '#666', fontSize: 15, fontWeight: '600' },
  title: { fontSize: 32, fontWeight: '800', color: '#F5F5F5', letterSpacing: -0.5 },
  count: { fontSize: 14, color: '#555', marginTop: 4 },
  list: { padding: 20, gap: 12 },
  card: {
    backgroundColor: '#161616',
    borderWidth: 1.5,
    borderColor: '#2C2C2C',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLeft: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  cardIndex: { fontSize: 12, color: '#444', fontWeight: '700', letterSpacing: 1, width: 28 },
  cardName: { fontSize: 15, fontWeight: '700', color: '#F5F5F5', marginBottom: 3 },
  cardTime: { fontSize: 12, color: '#555' },
  badge: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 1.5 },
  badgeSim: { backgroundColor: '#0D1F14', borderColor: '#4ADE80' },
  badgeNao: { backgroundColor: '#1F0D0D', borderColor: '#FF4D4D' },
  badgeText: { fontSize: 12, fontWeight: '800', letterSpacing: 1.5 },
  badgeTextSim: { color: '#4ADE80' },
  badgeTextNao: { color: '#FF4D4D' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  emptyIcon: { fontSize: 40 },
  emptyText: { color: '#555', fontSize: 15 },
  clearBtn: {
  marginTop: 14,
  alignSelf: 'flex-start',
  paddingHorizontal: 14,
  paddingVertical: 8,
  backgroundColor: '#1F0D0D',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#FF4D4D',
},

clearText: {
  color: '#FF4D4D',
  fontWeight: '700',
  fontSize: 13,
},
exportBtn: {
  marginTop: 10,
  alignSelf: 'flex-start',
  paddingHorizontal: 14,
  paddingVertical: 8,
  backgroundColor: '#0D1F14',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#4ADE80',
},

exportText: {
  color: '#4ADE80',
  fontWeight: '700',
  fontSize: 13,
},
});
