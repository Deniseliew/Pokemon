import React, { useState } from 'react';
import { TextInput, Button, View, Text, Alert, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Edit = ({ navigation, route }) => {
    const [name, setName] = useState(route.params.item.name);
    const [num, setNum] = useState(route.params.item.num);
    const [type, setType] = useState(route.params.item.type);

    const handleSave = () => {
        const updatedDatasource = route.params.datasource.map((section) => {
            if (section.element.toLowerCase() === type.toLowerCase()) {
                const updatedData = [...section.data];
                updatedData[route.params.index] = { name, num, type };
                return { ...section, data: updatedData };
            }
            return section;
        });

        route.params.setDatasource(updatedDatasource); // Update state with the new datasource
        navigation.navigate('Home');
    };

    const handleDelete = () => {
        const updatedDatasource = route.params.datasource.map((section) => {
            if (section.element.toLowerCase() === type.toLowerCase()) {
                const updatedData = section.data.filter((item, index) => index !== route.params.index);
                return { ...section, data: updatedData };
            }
            return section;
        });

        route.params.setDatasource(updatedDatasource); // Update state with the new datasource
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <Text style={styles.label}>Pokédex Number:</Text>
            <TextInput
                value={num}
                onChangeText={setNum}
                style={styles.input}
                keyboardType="numeric"
            />
            <Text style={styles.label}>Element Type:</Text>
            <RNPickerSelect
                onValueChange={setType}
                value={type}
                items={[
                    { label: 'Electric', value: 'electric' },
                    { label: 'Water', value: 'water' },
                    { label: 'Fire', value: 'fire' },
                    { label: 'Ghost', value: 'ghost' },
                ]}
            />
            <View style={styles.buttons}>
                <Button title="Save" onPress={handleSave} />
                <Button title="Delete" onPress={handleDelete} color="red" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginTop: 5,
    },
    buttons: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default Edit;
