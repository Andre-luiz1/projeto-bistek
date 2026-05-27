import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import PasswordModal from './PasswordModal';

type Props = {
  onNext: (name: string) => void;
  onViewHistory: () => void;
};

export default function NameInputScreen({ onNext, onViewHistory }: Props) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleNext = () => {
    const trimmed = name.trim();
    if (!trimmed || trimmed.split(' ').filter(Boolean).length < 2) {
      setError('Por favor, insira seu nome completo.');
      return;
    }
    setError('');
    onNext(trimmed);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />

      <TouchableOpacity
        style={styles.historyBtn}
        onPress={() => setShowModal(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.historyIcon}>🔒</Text>
        <Text style={styles.historyText}>Histórico</Text>
      </TouchableOpacity>

      <View style={styles.inner}>

        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        
        <View style={styles.badge}>
          <Text style={styles.badgeText}>PASSO 1 DE 2</Text>
        </View>

        <Text style={styles.title}>Qual é o{'\n'}seu nome?</Text>
        <Text style={styles.subtitle}>
          Insira seu nome completo para continuar.
        </Text>

        <View style={[styles.inputWrapper, error ? styles.inputError : null]}>
          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            placeholderTextColor="#555"
            value={name}
            onChangeText={text => {
              setName(text);
              if (error) setError('');
            }}
            autoCapitalize="words"
            returnKeyType="done"
            onSubmitEditing={handleNext}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.button, !name.trim() && styles.buttonDisabled]}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Continuar →</Text>
        </TouchableOpacity>
      </View>

      <PasswordModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={() => {
          setShowModal(false);
          onViewHistory();
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  historyBtn: {
    position: 'absolute',
    top: 52,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1A1A1A',
    borderWidth: 1.5,
    borderColor: '#2C2C2C',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    zIndex: 10,
  },
  historyIcon: { fontSize: 13 },
  historyText: { color: '#888', fontSize: 13, fontWeight: '600' },
    logo: {
    width: 200,
    height: 80,
    alignSelf: 'center',
    marginBottom: 32,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingBottom: 40,
  },
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
  badgeText: {
    color: '#888',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: '#F5F5F5',
    lineHeight: 50,
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 36,
    lineHeight: 22,
  },
  inputWrapper: {
    borderWidth: 1.5,
    borderColor: '#2C2C2C',
    borderRadius: 14,
    backgroundColor: '#161616',
    marginBottom: 8,
  },
  inputError: {
    borderColor: '#FF4D4D',
  },
  input: {
    color: '#F5F5F5',
    fontSize: 17,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontWeight: '500',
  },
  errorText: {
    color: '#FF4D4D',
    fontSize: 13,
    marginBottom: 20,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#F5F5F5',
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    opacity: 0.35,
  },
  buttonText: {
    color: '#0D0D0D',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
