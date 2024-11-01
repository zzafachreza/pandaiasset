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

export default function SakitAdd({ navigation, route }) {
    const item = route.params;
    const [kirim, setKirim] = useState({
        fid_kamar: item.id_kamar,
        tanggal: item.tanggal,
        keterangan: '',
        fid_santri: ''
    });

    const toast = useToast();
    const sendServer = () => {
        console.log(kirim)

        if (kirim.fid_santri.length == 0) {
            toast.show('Tidak ada santri yang di pilih !')
        } else {
            POSTDataByTable('insert_sakit', kirim).then(res => {
                console.log(res.data);
                if (res.data.status == 200) {
                    toast.show(res.data.message, {
                        type: 'success'
                    });
                    navigation.goBack();
                }
            })
        }
    }
    const [santri, setSantri] = useState([]);
    const __getTransaction = () => {

        POSTDataByTable('santri', {
            fid_kamar: item.id_kamar,
        }).then(res => {
            console.log(res.data);
            setSantri(res.data);
        })
    }

    useEffect(() => {
        __getTransaction();
    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader title="Tambah Data Sakit" />
            <ScrollView style={{
                padding: 12,
            }}>
                {/* <MyCalendar label="Tanggal" value={kirim.tanggal} onDateChange={x => setKirim({
                    ...kirim,
                    tanggal: x
                })} textColor={colors.primary} /> */}
                <MyGap jarak={20} />
                <MyPicker label="Pilih Santri" data={santri} onValueChange={x => setKirim({
                    ...kirim,
                    fid_santri: x
                })} textColor={colors.primary} />
                <MyGap jarak={20} />
                <MyInput label="Keterangan" value={kirim.keterangan} onChangeText={x => setKirim({
                    ...kirim,
                    keterangan: x
                })} textColor={colors.primary} />
                <MyGap jarak={20} />
                <MyButton title="Tambah" onPress={sendServer} />
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})