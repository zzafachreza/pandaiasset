import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { colors, fonts, MyDimensi } from '../../utils';

export default function MyRadioSecond({ mainLabel, options, selectedOption, onPress }) {
    return (
        <View style={styles.container}>
            {/* Label utama di atas */}
            <Text style={styles.mainLabel}>{mainLabel}</Text>

            {/* Radio buttons sejajar */}
            <View style={styles.radioRow}>
                {options.map((option, index) => (
                    <TouchableWithoutFeedback key={index} onPress={() => onPress(option)}>
                        <View style={styles.radioContainer}>
                            <View style={styles.radioButton}>
                                {selectedOption === option && <View style={styles.radioButtonSelected} />}
                            </View>
                            <Text style={styles.radioLabel}>{option}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    mainLabel: {
        fontSize: 15,  // Sesuaikan ukuran font
        fontFamily: fonts.primary[600],
        color: colors.primary,
        marginBottom: 10,  // Jarak antara label utama dan radio buttons
        textAlign: 'left',
    },
    radioRow: {
        flexDirection: 'row',  // Agar radio buttons sejajar
        justifyContent: 'space-between',  // Memberi jarak di antara radio buttons
    },
    radioContainer: {
        flexDirection: 'row',  // Label ada di sebelah kanan radio button
        alignItems: 'center',
    },
    radioButton: {
        width: 20,   // Ukuran kotak besar
        height: 20,
        backgroundColor: colors.white,
        borderColor: colors.primary,  // Warna border
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,  // Jarak antara kotak dan label
        borderRadius:5,
        marginLeft:10
    },
    radioButtonSelected: {
        width: 20,   // Ukuran kotak kecil di dalamnya
        height: 20,
        backgroundColor: colors.primary,  // Warna kotak kecil saat dipilih
        borderRadius:5
    },
    radioLabel: {
        fontSize: 15,
        fontFamily: fonts.primary[600],
        color: colors.primary,
    },
});
