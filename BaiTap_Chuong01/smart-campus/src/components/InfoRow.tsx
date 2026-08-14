import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface InfoRowProps {
  label: string;
  value: string;
  emphasized?: boolean;
}

export const InfoRow: React.FC<InfoRowProps> = ({ label, value, emphasized }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}:</Text>
      <Text
        style={[
          styles.value,
          emphasized && styles.emphasizedText,
        ]}
      >
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
    width: 90,
  },
  value: {
    fontSize: 14,
    color: '#1F2937',
    flex: 1,
    flexWrap: 'wrap',
  },
  emphasizedText: {
    fontWeight: 'bold',
    color: '#2563EB',
  },
});

export default InfoRow;
