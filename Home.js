import React from 'react';
import { Text, View, Button, Image, SectionList, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 1,
        borderWidth: 1,
    },
    headerText: {
        fontSize: 18,
        marginLeft: 10,
    },
    opacityStyle: {
        padding: 10,
        borderBottomWidth: 1,
        backgroundColor: '#f0f8ff',
        borderWidth: 1,
    },
    textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        marginLeft: 50,
        textAlign: 'left',
    },
    imageStyle: {
        width: 200,
        height: 300,
        marginLeft: 10,
        borderRadius: 10,
    },
});

const renderItem = ({ item, index, section, navigation, datasource, setDatasource }) => {
    console.log('Rendering Item:', item); // Add this to debug if items are passed properly
    let imageLink = "https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_" + item.num + "-2x.png";

    return (
        <TouchableOpacity
            style={styles.opacityStyle}
            onPress={() => {
                navigation.navigate('Edit', {
                    item,
                    index,
                    type: section.element,
                    datasource,
                    setDatasource,
                });
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={[styles.textStyle, { fontFamily: 'ArialCustom' }]}>{item.name}</Text>
                <Image source={{ uri: imageLink }} style={styles.imageStyle} />
            </View>
        </TouchableOpacity>
    );
};

const Home = ({ navigation, datasource, setDatasource }) => {
    console.log('Datasource:', datasource);  // Add this to check if datasource is passed correctly

    return (
        <View style={{ flex: 1, margin: 10, paddingTop: 50 }}>
            <View style={{ borderWidth: 1 }}>
                <View style={{ padding: 20 }}>
                    <Button
                        title="Add Pokémon"
                        onPress={() => navigation.navigate('Add')}
                    />
                </View>
            </View>
            <View style={{ paddingTop: 10, paddingBottom: 110 }}>
                {/* Temporarily disable StatusBar hiding */}
                <StatusBar hidden={false} />

                {/* Validate datasource structure */}
                <SectionList
                    sections={datasource.filter(section => section.data && section.data.length > 0)}
                    renderItem={(props) => renderItem({ ...props, navigation, datasource, setDatasource })}
                    renderSectionHeader={({ section: { element, bgColor, icon, textColor } }) => {
                        console.log('Rendering Section:', element);  // Log to check section data
                        return (
                            <View style={[styles.sectionHeader, { backgroundColor: bgColor }]}>
                                <Icon name={icon} size={20} color={textColor} />
                                <Text style={[styles.headerText, { color: textColor }]}>{element}</Text>
                            </View>
                        );
                    }}
                />
            </View>
        </View>
    );
};

export default Home;
