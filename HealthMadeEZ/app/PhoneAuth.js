import React, { useState, useRef } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import app, { firebaseConfig } from './firebaseConfig';

const auth = getAuth(app);

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState('');
  const recaptchaVerifier = useRef(null);

  const sendVerificationCode = async () => {
    if (!phoneNumber) {
      setError('Please enter a valid phone number');
      return;
    }

    // Format phone number in E.164 format (e.g., +18587898360)
    const formattedPhoneNumber = `+1${phoneNumber}`;
    const phoneProvider = new PhoneAuthProvider(auth);

    try {
      const verificationId = await phoneProvider.verifyPhoneNumber(
        formattedPhoneNumber,
        recaptchaVerifier.current
      );
      setConfirmationResult({ verificationId });
      console.log('SMS sent');
    } catch (err) {
      setError('Error sending verification code: ' + err.message);
      console.error('Error during sign-in with phone number:', err);
    }
  };

  const confirmCode = async () => {
    if (!confirmationResult || !verificationCode) {
      setError('Please enter the verification code');
      return;
    }

    try {
      const credential = PhoneAuthProvider.credential(
        confirmationResult.verificationId,
        verificationCode
      );
      await signInWithCredential(auth, credential);
      console.log('User successfully signed in');
    } catch (err) {
      setError('Error verifying code: ' + err.message);
      console.error('Error verifying code:', err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Render the reCAPTCHA modal so that it loads the necessary resources */}
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={true}
      />

      <Text style={styles.title}>Phone Authentication</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Send Verification Code" onPress={sendVerificationCode} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {confirmationResult && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter verification code"
            keyboardType="number-pad"
            value={verificationCode}
            onChangeText={setVerificationCode}
          />
          <Button title="Confirm Code" onPress={confirmCode} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default PhoneAuth;
