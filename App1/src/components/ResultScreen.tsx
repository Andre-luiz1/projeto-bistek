import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

type Props = {
  name: string;
  choice: 'sim' | 'nao';
  onRestart: () => void;
};

export default function ResultScreen({ name, choice, onRestart }: Props) {
  const isSim = choice === 'sim';
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />

      <View style={styles.inner}>
        <View style={[styles.iconCircle, isSim ? styles.iconCircleSim : styles.iconCircleNao]}>
          <Text style={styles.icon}>{isSim ? '✓' : '✕'}</Text>
        </View>

        <Text style={styles.title}>{isSim ? 'Confirmado!' : 'Recusado.'}</Text>

        <Text style={styles.subtitle}>
          <Text style={styles.bold}>{name}</Text>
          {isSim ? ' confirmou com Sim.' : ' escolheu Não.'}
        </Text>

        <TouchableOpacity style={styles.button} onPress={onRestart} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Recomeçar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  iconCircleSim: {
    backgroundColor: '#0D1F14',
    borderWidth: 2,
    borderColor: '#4ADE80',
  },
  iconCircleNao: {
    backgroundColor: '#1F0D0D',
    borderWidth: 2,
    borderColor: '#FF4D4D',
  },
  icon: { fontSize: 36, color: '#F5F5F5' },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: '#F5F5F5',
    marginBottom: 14,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 48,
  },
  bold: { color: '#F5F5F5', fontWeight: '700' },
  button: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1.5,
    borderColor: '#2C2C2C',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 40,
    marginBottom: 16,
  },
  buttonText: { color: '#F5F5F5', fontSize: 15, fontWeight: '700', letterSpacing: 0.3 },
  historyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  historyIcon: { fontSize: 14 },
  historyText: { color: '#555', fontSize: 14, fontWeight: '600' },
});
