import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60, // Adjust height as needed
    backgroundColor: '#f8f8f8', // Example background color
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333', // Example text color
  },
});

export default Header;
