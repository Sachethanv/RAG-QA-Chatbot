import React from 'react';
import { View, StyleSheet, Text, Modal } from 'react-native';
import LottieView from 'lottie-react-native';
import { useCelebration } from '../context/CelebrationContext';
import { COLORS, TYPOGRAPHY } from '../theme/theme';

const CelebrationOverlay = () => {
  const { celebration } = useCelebration();

  if (!celebration.visible) return null;

  const getAnimation = () => {
    switch (celebration.intensity) {
      case 3: return 'https://assets2.lottiefiles.com/packages/lf20_touohxv0.json'; // Grand Trophy
      case 2: return 'https://assets5.lottiefiles.com/packages/lf20_kyu7xb1v.json'; // Confetti Pop
      default: return 'https://assets9.lottiefiles.com/packages/lf20_u4j3taze.json'; // Sparkles
    }
  };

  const getMessage = () => {
      if (celebration.intensity === 3) return "LEGENDARY MILESTONE!";
      if (celebration.intensity === 2) return "GREAT PROGRESS!";
      return "GOAL SMASHED!";
  }

  return (
    <Modal transparent visible={celebration.visible} animationType="fade">
      <View style={styles.overlay}>
        <LottieView
          source={{ uri: getAnimation() }}
          autoPlay
          loop={false}
          style={styles.animation}
        />
        <Text style={[TYPOGRAPHY.header, styles.text]}>{getMessage()}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(11, 15, 25, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 400,
    height: 400,
  },
  text: {
    color: COLORS.accent1,
    fontSize: 32,
    textAlign: 'center',
    fontWeight: '900',
    marginTop: -50,
  }
});

export default CelebrationOverlay;
