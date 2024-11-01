import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { colors, fonts, MyDimensi } from '../../utils';

export default function MyRadio({ horizontal = false, nolabel = false, label, options = [], value, onPress }) {
    return (
        <View style={styles.container}>
            {/* Label Utama di atas */}
            {!nolabel && <Text style={styles.mainLabel}>{label}</Text>}

            {/* Opsi Radio Buttons */}
            {horizontal &&

                <View style={{
                    flexDirection: 'row'
                }}>
                    {options.map((option, index) => (
                        <TouchableWithoutFeedback key={index} onPress={() => onPress(option)}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',  // Agar label berada di kanan radio button
                                alignItems: 'center',
                                marginBottom: 10,
                            }}>
                                <View style={styles.radioButton}>
                                    {value === option && <View style={styles.radioButtonSelected} />}
                                </View>
                                <Text style={styles.radioLabel}>{option}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
                </View>

            }




            {!horizontal && options.map((option, index) => (
                <TouchableWithoutFeedback key={index} onPress={() => onPress(option)}>
                    <View style={styles.radioContainer}>
                        <View style={styles.radioButton}>
                            {value === option && <View style={styles.radioButtonSelected} />}
                        </View>
                        <Text style={styles.radioLabel}>{option}</Text>
                    </View>
                </TouchableWithoutFeedback>
            ))}



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',  // Align kiri agar sesuai dengan layout biasa
        marginVertical: 10,
    },
    mainLabel: {
        fontSize: 15,  // Ukuran font label utama
        fontFamily: fonts.primary[600],
        color: colors.primary,
        marginBottom: 10,  // Jarak antara label utama dan radio buttons
    },
    radioContainer: {
        flexDirection: 'row',  // Agar label berada di kanan radio button
        alignItems: 'center',
        marginBottom: 10,
    },
    radioButton: {
        width: 20,   // Ukuran kotak besar
        height: 20,
        backgroundColor: colors.white,
        borderColor: colors.primary,  // Warna border
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: 10
    },
    radioButtonSelected: {
        width: 20,   // Ukuran kotak kecil di dalamnya
        height: 20,
        backgroundColor: colors.primary,  // Warna kotak kecil saat dipilih
        borderRadius: 5
    },
    radioLabel: {
        marginLeft: 15,  // Jarak antara radio button dan labelnya
        ...fonts.headline5,
        color: colors.primary,
    },
});
