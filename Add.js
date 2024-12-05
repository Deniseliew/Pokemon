import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { datasource } from '../L06Pokemon/Data'; // Assuming datasource is exported from Data.js or the main file

const Add = ({ navigation }) => {
    const [name, setName] = useState('');
    const [num, setNum] = useState('');
    const [type, setType] = useState('');

    const handleAddPokemon = () => {
        if (!name || !num || !type) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        // Find the correct section to add the Pokémon based on the type
        const sectionIndex = datasource.findIndex(
            (section) => section.element.toLowerCase() === type.toLowerCase()
        );

        if (sectionIndex !== -1) {
            datasource[sectionIndex].data.push({ name, num });
            Alert.alert('Success', `${name} has been added.`);
            navigation.navigate('Home');
        } else {
            Alert.alert('Error', 'Invalid type selected.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Pokémon Name:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Pokémon name"
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Pokédex Number:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Pokémon number"
                value={num}
                onChangeText={setNum}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Element Type:</Text>
            <RNPickerSelect
                onValueChange={(value) => setType(value)}
                items={[
                    { label: 'Electric', value: 'electric' },
                    { label: 'Water', value: 'water' },
                    { label: 'Fire', value: 'fire' },
                    { label: 'Ghost', value: 'ghost' },
                ]}
                placeholder={{ label: 'Select a type...', value: null }}
            />

            <Button title="Add Pokémon" onPress={handleAddPokemon} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
});

export default Add;
