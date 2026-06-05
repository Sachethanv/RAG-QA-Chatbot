import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../theme/theme';
import { Zap, AlertTriangle, CheckCircle2 } from 'lucide-react-native';
import { useCelebration } from '../context/CelebrationContext';

const { height } = Dimensions.get('window');

const Dashboard = () => {
  const { triggerCelebration } = useCelebration();
  const [showBottomSheet, setShowBottomSheet] = useState(false);
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
                {/* Score-based glowing ring */}
              <View style={[
                  styles.ring,
                  {
                      borderColor: completionScores[i] > 50 ? COLORS.accent1 : COLORS.accent2,
                      opacity: completionScores[i] / 100 + 0.2,
                      borderWidth: completionScores[i] > 0 ? 3 : 1
                  }
              ]} />
              <Text style={styles.dayText}>{day}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Improvisation Alert */}
      {completionScores[3] < 50 && (
        <TouchableOpacity
            style={styles.alertBanner}
            onPress={() => setShowBottomSheet(true)}
        >
          <AlertTriangle color={COLORS.textPrimary} size={20} />
          <Text style={styles.alertText}>Current approach stalled. Tap to re-route.</Text>
        </TouchableOpacity>
      )}

      {/* Cascading Goal Cards */}
      <View style={styles.goalsSection}>
        <TouchableOpacity
            style={styles.goalCard}
            onPress={() => triggerCelebration(1)}
        >
          <View style={styles.cardHeader}>
              <Text style={TYPOGRAPHY.header}>Daily Cardio</Text>
              <CheckCircle2 color={COLORS.accent1} size={24} />
          </View>
          <Text style={TYPOGRAPHY.body}>30 min brisk walk</Text>
          <View style={styles.progressRow}>
             <Zap color={COLORS.accent1} size={16} />
             <Text style={[TYPOGRAPHY.body, { color: COLORS.accent1 }]}>Streak: 5 days</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.goalCard, { marginTop: -20, zIndex: -1 }]}
            onPress={() => triggerCelebration(3)} // Milestone Example
        >
          <View style={styles.cardHeader}>
              <Text style={TYPOGRAPHY.header}>Weight Goal</Text>
              <CheckCircle2 color={COLORS.textSecondary} size={24} />
          </View>
          <Text style={TYPOGRAPHY.body}>Reach 75kg (Target: -2kg)</Text>
          <Text style={[TYPOGRAPHY.body, { color: COLORS.accent2, marginTop: 5 }]}>LONG-TERM GOAL</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet Modal */}
      <Modal
        visible={showBottomSheet}
        transparent
        animationType="slide"
        onRequestClose={() => setShowBottomSheet(false)}
      >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowBottomSheet(false)}
          >
              <View style={styles.bottomSheet}>
                  <View style={styles.handle} />
                  <Text style={[TYPOGRAPHY.header, { color: COLORS.accent2, marginBottom: 20 }]}>AI Improvisation</Text>

                  <TouchableOpacity style={styles.optionCard}>
                      <Text style={styles.optionTitle}>SCALE DOWN</Text>
                      <Text style={TYPOGRAPHY.body}>Reduce target by 50% to maintain streak.</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.optionCard}>
                      <Text style={styles.optionTitle}>TIME SHIFT</Text>
                      <Text style={TYPOGRAPHY.body}>Move session to 7:00 AM (Peak Biology).</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.optionCard}>
                      <Text style={styles.optionTitle}>SPLIT SPRINT</Text>
                      <Text style={TYPOGRAPHY.body}>Two 5-min sessions throughout the day.</Text>
                  </TouchableOpacity>
              </View>
          </TouchableOpacity>
      </Modal>
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
  },
  cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
  },
  modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end',
  },
  bottomSheet: {
      backgroundColor: COLORS.secondarySurface,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 30,
      minHeight: height * 0.5,
  },
  handle: {
      width: 40,
      height: 5,
      backgroundColor: COLORS.textSecondary,
      borderRadius: 3,
      alignSelf: 'center',
      marginBottom: 20,
  },
  optionCard: {
      backgroundColor: COLORS.primaryBackground,
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: COLORS.accent2,
  },
  optionTitle: {
      color: COLORS.accent2,
      fontWeight: 'bold',
      fontSize: 14,
      marginBottom: 5,
  }
});

export default Dashboard;
