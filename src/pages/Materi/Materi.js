import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { MyHeader } from '../../components'
import { TouchableOpacity } from 'react-native'
import { colors, fonts } from '../../utils'

export default function Materi({ navigation }) {
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader onPress={() => navigation.goBack()} title="Materi Pelatihan" />
            <View style={{
                flex: 1,
                padding: 16
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('MateriList')} style={{
                    padding: 20,
                    backgroundColor: colors.primary,
                    borderRadius: 20,
                    marginBottom: 20,
                }}>
                    <Text style={{
                        ...fonts.headline1,
                        color: colors.white,
                        textAlign: 'center'
                    }}>Materi Pelatihan</Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => navigation.navigate('VideoList')} style={{
                    padding: 20,
                    backgroundColor: colors.primary,
                    borderRadius: 20,
                    marginBottom: 20,
                }}>
                    <Text style={{
                        ...fonts.headline1,
                        color: colors.white,
                        textAlign: 'center'
                    }}>Video Edukasi</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})