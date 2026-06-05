import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../theme/theme';
import { Zap, AlertTriangle } from 'lucide-react-native';

const Dashboard = () => {
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const completionScores = [80, 45, 90, 30, 0, 0, 0];

  return (
    <ScrollView style={styles.container}>
      {/* Weekly Sprint Tracker */}
      <View style={styles.sprintTracker}>
        <Text style={TYPOGRAPHY.header}>Weekly Sprint</Text>
        <View style={styles.daysRow}>
          {weekDays.map((day, i) => (
            <View key={i} style={styles.dayCircle}>
                {/* Simplified glowing ring placeholder */}
              <View style={[styles.ring, { borderColor: completionScores[i] > 50 ? COLORS.accent1 : COLORS.accent2 }]} />
              <Text style={styles.dayText}>{day}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Improvisation Alert */}
      {completionScores[3] < 50 && (
        <TouchableOpacity style={styles.alertBanner}>
          <AlertTriangle color={COLORS.textPrimary} size={20} />
          <Text style={styles.alertText}>Current approach stalled. Tap to re-route.</Text>
        </TouchableOpacity>
      )}

      {/* Cascading Goal Cards */}
      <View style={styles.goalsSection}>
        <View style={styles.goalCard}>
          <Text style={TYPOGRAPHY.header}>Daily Cardio</Text>
          <Text style={TYPOGRAPHY.body}>30 min brisk walk</Text>
          <View style={styles.progressRow}>
             <Zap color={COLORS.accent1} size={16} />
             <Text style={[TYPOGRAPHY.body, { color: COLORS.accent1 }]}>Streak: 5 days</Text>
          </View>
        </View>

        <View style={[styles.goalCard, { marginTop: -20, zIndex: -1 }]}>
          <Text style={TYPOGRAPHY.header}>Hydration</Text>
          <Text style={TYPOGRAPHY.body}>2L Water</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBackground,
    padding: 20,
  },
  sprintTracker: {
    marginBottom: 30,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  dayCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  ring: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    shadowColor: COLORS.accent1,
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  dayText: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
  },
  alertBanner: {
    backgroundColor: COLORS.accent2,
    flexDirection: 'row',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  alertText: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  goalsSection: {
    marginTop: 10,
  },
  goalCard: {
    backgroundColor: COLORS.secondarySurface,
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.accent1,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  }
});

export default Dashboard;
