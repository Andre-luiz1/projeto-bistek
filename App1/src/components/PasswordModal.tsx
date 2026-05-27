import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const ADMIN_PASSWORD = '1234';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function PasswordModal({ visible, onClose, onSuccess }: Props) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (password === ADMIN_PASSWORD) {
      setPassword('');
      setError('');
      onSuccess();
    } else {
      setError('Senha incorreta. Tente novamente.');
      setPassword('');
    }
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={handleClose} />

        <View style={styles.card}>
          <View style={styles.lockCircle}>
            <Text style={styles.lockEmoji}>🔒</Text>
          </View>

          <Text style={styles.title}>Área Restrita</Text>
          <Text style={styles.subtitle}>Digite a senha para ver o histórico de respostas.</Text>

          <View style={[styles.inputWrapper, error ? styles.inputError : null]}>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#555"
              value={password}
              onChangeText={t => { setPassword(t); setError(''); }}
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={handleConfirm}
              autoFocus
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.row}>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleClose} activeOpacity={0.8}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.confirmBtn, !password && styles.confirmDisabled]}
              onPress={handleConfirm}
              activeOpacity={0.85}
              disabled={!password}
            >
              <Text style={styles.confirmText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  card: {
    width: '88%',
    backgroundColor: '#161616',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#2C2C2C',
    padding: 28,
    alignItems: 'center',
  },
  lockCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1A1A1A',
    borderWidth: 1.5,
    borderColor: '#2C2C2C',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  lockEmoji: { fontSize: 28 },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#F5F5F5',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  inputWrapper: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#2C2C2C',
    borderRadius: 12,
    backgroundColor: '#0D0D0D',
    marginBottom: 8,
  },
  inputError: { borderColor: '#FF4D4D' },
  input: {
    color: '#F5F5F5',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    letterSpacing: 4,
  },
  errorText: {
    color: '#FF4D4D',
    fontSize: 12,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginTop: 8,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderWidth: 1.5,
    borderColor: '#2C2C2C',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelText: { color: '#888', fontSize: 14, fontWeight: '600' },
  confirmBtn: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  confirmDisabled: { opacity: 0.3 },
  confirmText: { color: '#0D0D0D', fontSize: 14, fontWeight: '800' },
});
