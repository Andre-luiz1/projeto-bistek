import React, { useState } from 'react';
import { Choice } from './types';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

type Props = {
  name: string;
  onBack: () => void;
  onConfirm: (choice: Choice) => void;
};

export default function ChoiceScreen({ name, onBack, onConfirm }: Props) {
  const [selected, setSelected] = useState<Choice | null>(null);

  const firstName = name.split(' ')[0];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />

      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>

      <View style={styles.inner}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>PASSO 2 DE 2</Text>
        </View>

        <Text style={styles.title}>Olá, {firstName}.</Text>

        <View style={styles.choiceRow}>
          <TouchableOpacity
            style={[styles.choiceCard, selected === 'sim' && styles.choiceCardSim]}
            onPress={() => setSelected('sim')}
            activeOpacity={0.8}
          >
            <Text style={styles.choiceEmoji}>✓</Text>
            <Text style={[styles.choiceLabel, selected === 'sim' && styles.choiceLabelActive]}>
              SIM
            </Text>
            {selected === 'sim' && <View style={styles.selectedDot} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.choiceCard, selected === 'nao' && styles.choiceCardNao]}
            onPress={() => setSelected('nao')}
            activeOpacity={0.8}
          >
            <Text style={styles.choiceEmoji}>✕</Text>
            <Text style={[styles.choiceLabel, selected === 'nao' && styles.choiceLabelActive]}>
              NÃO
            </Text>
            {selected === 'nao' && <View style={[styles.selectedDot, styles.selectedDotNao]} />}
          </TouchableOpacity>
        </View>

        {selected && (
          <Text style={styles.selectionHint}>
            Você selecionou:{' '}
            <Text style={styles.selectionValue}>
              {selected === 'sim' ? 'Sim' : 'Não'}
            </Text>
          </Text>
        )}

        <TouchableOpacity
          style={[styles.button, !selected && styles.buttonDisabled]}
          onPress={() => selected && onConfirm(selected)}
          activeOpacity={0.85}
          disabled={!selected}
        >
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  backBtn: { paddingTop: 56, paddingHorizontal: 28, paddingBottom: 8 },
  backText: { color: '#666', fontSize: 15, fontWeight: '600' },
  inner: { flex: 1, paddingHorizontal: 28, paddingTop: 20 },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 28,
  },
  badgeText: { color: '#888', fontSize: 11, fontWeight: '600', letterSpacing: 1.5 },
  title: { fontSize: 40, fontWeight: '800', color: '#F5F5F5', marginBottom: 8, letterSpacing: -0.5 },
  question: { fontSize: 16, color: '#666', marginBottom: 40, lineHeight: 24 },
  choiceRow: { flexDirection: 'row', gap: 16, marginBottom: 28 },
  choiceCard: {
    flex: 1,
    backgroundColor: '#161616',
    borderWidth: 1.5,
    borderColor: '#2C2C2C',
    borderRadius: 20,
    paddingVertical: 36,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  choiceCardSim: { borderColor: '#4ADE80', backgroundColor: '#0D1F14' },
  choiceCardNao: { borderColor: '#FF4D4D', backgroundColor: '#1F0D0D' },
  choiceEmoji: { fontSize: 28, marginBottom: 12, color: '#444' },
  choiceLabel: { fontSize: 22, fontWeight: '800', color: '#444', letterSpacing: 2 },
  choiceLabelActive: { color: '#F5F5F5' },
  selectedDot: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4ADE80',
  },
  selectedDotNao: { backgroundColor: '#FF4D4D' },
  selectionHint: { color: '#555', fontSize: 14, textAlign: 'center', marginBottom: 28 },
  selectionValue: { color: '#F5F5F5', fontWeight: '700' },
  button: {
    backgroundColor: '#F5F5F5',
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.3 },
  buttonText: { color: '#0D0D0D', fontSize: 16, fontWeight: '800', letterSpacing: 0.3 },
});
