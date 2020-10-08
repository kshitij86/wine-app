import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from "@expo/vector-icons";

import { styles } from '../globals/styles'

// TODO: Add button to ask for permissions here

export default function NoPermissions() {
    return (
        <View style={styles.noPermissions}>
            <Feather name="camera-off" size={80} color="#7f7f7f" style={{ position: "absolute", top: 150 }} />
            <Text style={styles.noPermissionsText}>Oh snap!</Text>
            <Text style={styles.noPermissionsText}>wine needs those permissions to work</Text>
        </View>
    );
}
