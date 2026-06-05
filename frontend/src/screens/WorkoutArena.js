import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../theme/theme';
import LottieView from 'lottie-react-native';

const { height } = Dimensions.get('window');

const WorkoutArena = () => {
  return (
    <View style={styles.container}>
      {/* Animated Character Canvas */}
      <View style={styles.canvas}>
        <LottieView
          source={{ uri: 'https://assets5.lottiefiles.com/packages/lf20_Z37792.json' }} // Placeholder fitness animation
          autoPlay
          loop
          style={styles.lottie}
        />
        <Text style={styles.overlayText}>FORM: SQUAT</Text>
      </View>

      {/* Metrics Section */}
      <View style={styles.metrics}>
        <View style={styles.metricRow}>
          <View>
            <Text style={TYPOGRAPHY.body}>TIMER</Text>
            <Text style={TYPOGRAPHY.metric}>00:45</Text>
          </View>
          <View>
            <Text style={TYPOGRAPHY.body}>REPS</Text>
            <Text style={TYPOGRAPHY.metric}>12/15</Text>
          </View>
        </View>

        <View style={styles.metricCard}>
            <Text style={TYPOGRAPHY.body}>ESTIMATED BURN</Text>
            <Text style={[TYPOGRAPHY.metric, { fontSize: 48 }]}>124 KCAL</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBackground,
  },
  canvas: {
    height: '60%',
    backgroundColor: COLORS.secondarySurface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 300,
    height: 300,
  },
  overlayText: {
    position: 'absolute',
    top: 20,
    left: 20,
    color: COLORS.accent1,
    fontWeight: '900',
    fontSize: 18,
    letterSpacing: 2,
  },
  metrics: {
    height: '40%',
    padding: 30,
    backgroundColor: COLORS.primaryBackground,
    borderTopWidth: 2,
    borderTopColor: COLORS.accent1,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  metricCard: {
      alignItems: 'center',
  }
});

export default WorkoutArena;
