import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, MyDimensi, POSTDataByTable, colors, fonts, getDataByTable, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import moment from 'moment';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker, MyRadio } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';

export default function KebersihanPribadiAdd({ navigation, route }) {
    const item = route.params;

    const [soal, setSoal] = useState([
        {
            soal: 'Kondisi Rambut',
            pilihan: ['Bersih, Pendek, dan Rapi', 'Berminyak atau Panjang ', 'Berminyak dan Ketombe atau Berkutu'],
            dipilih: '',
            nilai: '',
        },
        {
            soal: 'Kondisi Kuku',
            pilihan: ['Bersih dan Pendek', 'Bersih Tapi Panjang ', 'Panjang dan Hitam'],
            dipilih: '',
            nilai: '',
        },
        {
            soal: 'Gigi dan Mulut',
            pilihan: ['Bersih', 'Sariawan atau Terdapat Karies', 'Gigi Kotor dan Terdapat Karies'],
            dipilih: '',
            nilai: '',
        },
        {
            soal: 'Wajah',
            pilihan: ['Bersih', 'Berminyak', 'Berjerawat'],
            dipilih: '',
            nilai: '',
        },
        {
            soal: 'Kulit Tangan',
            pilihan: ['Bersih', 'Bekas Luka', 'Gudik atau Scabies'],
            dipilih: '',
            nilai: '',
        },
        {
            soal: 'Kulit Kaki',
            pilihan: ['Bersih', 'Bekas Luka', 'Gudik atau Scabies'],
            dipilih: '',
            nilai: '',
        },
        {
            soal: 'Pakaian',
            pilihan: ['Bersih dan Rapi', 'Bersih Tidak Rapi', 'Kotor dan Tidak Rapi'],
            dipilih: '',
            nilai: '',
        },
        {
            soal: 'Ranjang',
            pilihan: ['Bersih dan Rapi', 'Berantakan atau Kotor', 'Berantakan dan Kotor'],
            dipilih: '',
            nilai: '',
        },
    ])

    const [kirim, setKirim] = useState({
        fid_kamar: item.id_kamar,
        tanggal: item.tanggal,
        soal: soal,
        fid_santri: '',
    });

    const toast = useToast();
    const sendServer = () => {
        console.log(kirim)

        if (kirim.fid_santri.length == 0) {
            toast.show('Tidak ada santri yang di pilih !')
        } else {
            POSTDataByTable('insert_pribadi', kirim).then(res => {
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
    }, []);



    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader title="Tambah Kebersihan Pribadi" />
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
                <FlatList data={soal} renderItem={({ item, index }) => {
                    return (
                        <View>
                            <MyRadio label={item.soal} options={item.pilihan} value={item.dipilih} onPress={x => {
                                let tmp = [...soal];
                                console.log(item.pilihan.indexOf(x))
                                tmp[index].dipilih = x;
                                tmp[index].nilai = item.pilihan.indexOf(x) == 0 ? 100 : item.pilihan.indexOf(x) == 1 ? 50 : 0;
                                setSoal(tmp)

                            }} />
                        </View>
                    )
                }} />
                <MyGap jarak={20} />
                <MyButton title="Tambah" onPress={sendServer} />
                <MyGap jarak={20} />
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})