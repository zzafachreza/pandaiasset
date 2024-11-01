import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, MyDimensi, POSTDataByTable, colors, fonts, getDataByTable, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import moment from 'moment';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';

export default function SantriAdd({ navigation, route }) {
    const item = route.params;
    const [kirim, setKirim] = useState({
        id_santri: item.id_santri,
        nama_santri: item.nama_santri,

    });

    const toast = useToast();
    const sendServer = () => {
        console.log(kirim)

        POSTDataByTable('update_santri', kirim).then(res => {
            console.log(res.data);
            if (res.data.status == 200) {
                toast.show(res.data.message, {
                    type: 'success'
                });
                navigation.goBack();
            }
        })

    }


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader title="Edit Data Santri" />
            <ScrollView style={{
                padding: 12,
            }}>
                {/* <MyCalendar label="Tanggal" value={kirim.tanggal} onDateChange={x => setKirim({
                    ...kirim,
                    tanggal: x
                })} textColor={colors.primary} /> */}

                <MyGap jarak={20} />
                <MyInput label="Nama Santri" value={kirim.nama_santri} onChangeText={x => setKirim({
                    ...kirim,
                    nama_santri: x
                })} textColor={colors.primary} />
                <MyGap jarak={20} />
                <MyButton title="Simpan" onPress={sendServer} />
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})