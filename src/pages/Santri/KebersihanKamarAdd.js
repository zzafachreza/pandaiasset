import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, MyDimensi, POSTDataByTable, colors, fonts, getDataByTable, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import moment from 'moment';
import { MyButton, MyCalendar, MyFileUploader, MyGap, MyHeader, MyImageUpload, MyInput, MyPicker, MyRadio } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';

export default function KebersihanKamarAdd({ navigation, route }) {
    const item = route.params;
    console.log(item)
    const [kirim, setKirim] = useState({
        fid_kamar: item.id_kamar,
        tanggal: item.tanggal,
        foto_ranjang: 'https://zavalabs.com/nogambar.jpg',
        foto_lantai: 'https://zavalabs.com/nogambar.jpg',
        foto_semua: 'https://zavalabs.com/nogambar.jpg'
    })
    const toast = useToast();
    const sendServer = () => {
        console.log(kirim)

        if (soal.filter(i => i.nilai == 0).length == 3) {
            toast.show('Mohon isi data terlebiih dahulu!')
        } else {

            POSTDataByTable('insert_kebersihan', {
                ...kirim,
                soal: soal
            }).then(res => {
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

    const [soal, setSoal] = useState([
        {
            soal: 'Kondisi Lantai',
            pilihan: ['Bersih', 'Berantakan', 'Kotor'],
            dipilih: '',
            nilai: '',
        },
        {
            soal: 'Kondisi Kamar Mandi',
            pilihan: ['Bersih', 'Berantakan', 'Kotor'],
            dipilih: '',
            nilai: '',
        },
        {
            soal: 'Kondisi Lemari',
            pilihan: ['Tertata Rapi', 'Berantakan', 'Kotor'],
            dipilih: '',
            nilai: '',
        },
        {
            soal: 'Gantungan Baju',
            pilihan: ['Tertata Rapi', 'Berantakan', 'Baju atau Handuk Kotor dan Berbau'],
            dipilih: '',
            nilai: '',
        },
    ])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader title="Tambah Kebersihan Kamar" />
            <ScrollView style={{
                padding: 12,
            }}>
                {/* <MyCalendar label="Tanggal" value={kirim.tanggal} onDateChange={x => setKirim({
                    ...kirim,
                    tanggal: x
                })} textColor={colors.primary} /> */}
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
                <View style={{
                    padding: 16,
                    borderWidth: 1,
                    marginBottom: 10,
                    borderRadius: 10,
                    borderColor: Color.blueGray[300]
                }}>
                    <Text style={{
                        ...fonts.headline3,
                        color: colors.primary,
                    }}>Foto Kondisi Kamar</Text>
                    <MyImageUpload label="Ranjang" onFileChange={x => {
                        setKirim({
                            ...kirim,
                            foto_ranjang: x
                        })
                    }} />

                    <MyImageUpload label="Lantai" onFileChange={x => {
                        setKirim({
                            ...kirim,
                            foto_lantai: x
                        })
                    }} />

                    <MyImageUpload label="Keseluruhan" onFileChange={x => {
                        setKirim({
                            ...kirim,
                            foto_semua: x
                        })
                    }} />
                </View>
                <MyButton title="Tambah" onPress={sendServer} />
                <MyGap jarak={20} />
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})