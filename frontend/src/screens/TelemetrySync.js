import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../theme/theme';
import { useCelebration } from '../context/CelebrationContext';
// Note: native health hooks would require specific native setup, mocking for this boilerplate
// import AppleHealthKit from 'react-native-health';

const TelemetrySync = () => {
  const { triggerCelebration } = useCelebration();
  const [steps, setSteps] = useState(8432);
  const [calories, setCalories] = useState(2100);
  const [water, setWater] = useState(1.5);
  const [bottlenecks, setBottlenecks] = useState({ fatigue: false, time: false });

  return (
    <ScrollView style={styles.container}>
      <Text style={[TYPOGRAPHY.header, { marginBottom: 30 }]}>Daily Telemetry Sync</Text>

      {/* Passive Metrics from OS Hooks */}
      <View style={styles.ledgerCard}>
        <Text style={styles.ledgerHeader}>PASSIVE DATA (OS SYNCED)</Text>
        <View style={styles.ledgerRow}>
          <Text style={TYPOGRAPHY.body}>Total Steps</Text>
          <Text style={[TYPOGRAPHY.body, { color: COLORS.accent1, fontWeight: 'bold' }]}>{steps}</Text>
        </View>
        <View style={styles.ledgerRow}>
          <Text style={TYPOGRAPHY.body}>Active Energy (kcal)</Text>
          <Text style={[TYPOGRAPHY.body, { color: COLORS.accent1, fontWeight: 'bold' }]}>420</Text>
        </View>
      </View>

      {/* Manual Sliders/Inputs */}
      <View style={styles.manualSection}>
        <Text style={styles.ledgerHeader}>MANUAL TELEMETRY</Text>

        <View style={styles.inputGroup}>
            <Text style={TYPOGRAPHY.body}>Calories Consumed: {calories} kcal</Text>
            {/* Slider placeholder */}
            <View style={styles.sliderMock} />
        </View>

        <View style={styles.inputGroup}>
            <Text style={TYPOGRAPHY.body}>Water Intake: {water} L</Text>
            {/* Slider placeholder */}
            <View style={styles.sliderMock} />
        </View>
      </View>

      {/* Bottlenecks / AI Context */}
      <View style={styles.manualSection}>
          <Text style={styles.ledgerHeader}>BOTTLENECKS</Text>
          <View style={styles.ledgerRow}>
              <Text style={TYPOGRAPHY.body}>High Fatigue</Text>
              <Switch
                value={bottlenecks.fatigue}
                onValueChange={(val) => setBottlenecks({...bottlenecks, fatigue: val})}
                thumbColor={COLORS.accent1}
                trackColor={{ true: COLORS.accent1, false: COLORS.secondarySurface }}
              />
          </View>
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => triggerCelebration(2)}
      >
        <Text style={styles.submitText}>LOCK IN TODAY'S METRICS</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBackground,
    padding: 20,
  },
  ledgerCard: {
    backgroundColor: COLORS.secondarySurface,
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2D3748',
    marginBottom: 30,
  },
  ledgerHeader: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 15,
  },
  ledgerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2D3748',
  },
  manualSection: {
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  sliderMock: {
    height: 6,
    backgroundColor: COLORS.secondarySurface,
    borderRadius: 3,
    marginTop: 10,
    borderRightWidth: 100, // Visual hack for "progress"
    borderRightColor: COLORS.accent1,
  },
  submitButton: {
    backgroundColor: COLORS.accent1,
    padding: 20,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  submitText: {
    color: COLORS.primaryBackground,
    fontWeight: '900',
    fontSize: 18,
  }
});

export default TelemetrySync;
