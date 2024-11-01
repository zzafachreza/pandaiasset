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

export default function KebersihanKamarEdit({ navigation, route }) {
    const ITEM = route.params;
    console.log(ITEM)
    const [kirim, setKirim] = useState({
        id_kebersihan:ITEM.id_kebersihan,
        foto_ranjang:ITEM.foto_ranjang,
        foto_lantai:ITEM.foto_lantai,
        foto_semua:ITEM.foto_semua,
    });

    const toast = useToast();
    const sendServer = () => {
        console.log(kirim)

        if (soal.filter(i => i.nilai == 0).length == 3) {
            toast.show('Mohon isi data terlebiih dahulu!')
        } else {

            POSTDataByTable('update_kebersihan', {
                ...kirim,
                soal: soal
            }).then(res => {
                console.log(res.data);
                if (res.data.status == 200) {
                    toast.show(res.data.message, {
                        type: 'success'
                    });
                    navigation.pop(2);
                }
            })
        }
    }
 

    const [soal, setSoal] = useState([
        {
            soal: 'Kondisi Lantai',
            pilihan: ['Bersih', 'Berantakan', 'Kotor'],
            dipilih: ITEM.h1,
            nilai: ITEM.n1,
        },
        {
            soal: 'Kondisi Kamar Mandi',
            pilihan: ['Bersih', 'Berantakan', 'Kotor'],
            dipilih: ITEM.h2,
            nilai: ITEM.n2,
        },
        {
            soal: 'Kondisi Lemari',
            pilihan: ['Tertata Rapi', 'Berantakan', 'Kotor'],
            dipilih: ITEM.h3,
            nilai: ITEM.n3,
        },
        {
            soal: 'Gantungan Baju',
            pilihan: ['Tertata Rapi', 'Berantakan', 'Baju atau Handuk Kotor dan Berbau'],
            dipilih: ITEM.h4,
            nilai: ITEM.n4,
        },
    ])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader title="Edit Kebersihan Kamar" />
            <ScrollView style={{
                padding: 12,
            }}>
                <Text style={{
                    ...fonts.headline3,
                    color:colors.black
                }}>{moment(ITEM.tanggal).format('DD MMMM YYYY')}</Text>
        
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
                    <MyImageUpload label="Ranjang ( Biarkan Jika tidak diubah )" onFileChange={x => {
                        setKirim({
                            ...kirim,
                            newfoto_ranjang: x
                        })
                    }} />

                    <MyImageUpload label="Lantai ( Biarkan Jika tidak diubah )" onFileChange={x => {
                        setKirim({
                            ...kirim,
                            newfoto_lantai: x
                        })
                    }} />

                    <MyImageUpload label="Keseluruhan ( Biarkan Jika tidak diubah )" onFileChange={x => {
                        setKirim({
                            ...kirim,
                            newfoto_semua: x
                        })
                    }} />
                </View>
                <MyButton title="Simpan Perubahan" onPress={sendServer} />
                <MyGap jarak={20} />
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})