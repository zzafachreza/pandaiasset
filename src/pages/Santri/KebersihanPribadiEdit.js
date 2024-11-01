import { ActivityIndicator, Alert, FlatList, Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, MyDimensi, POSTDataByTable, colors, fonts, getDataByTable, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL, MYAPP } from '../../utils/localStorage';
import moment from 'moment';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker, MyRadio } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';

export default function KebersihanPribadiEdit({ navigation, route }) {
    const ITEM = route.params;

    const [soal, setSoal] = useState([
        {
            soal: 'Kondisi Rambut',
            pilihan: ['Bersih, Pendek, dan Rapi', 'Berminyak atau Panjang ', 'Berminyak dan Ketombe atau Berkutu'],
            dipilih: ITEM.h1,
            nilai: ITEM.n1,
        },
        {
            soal: 'Kondisi Kuku',
            pilihan: ['Bersih dan Pendek', 'Bersih Tapi Panjang ', 'Panjang dan Hitam'],
            dipilih: ITEM.h2,
            nilai: ITEM.n2,
        },
        {
            soal: 'Gigi dan Mulut',
            pilihan: ['Bersih', 'Sariawan atau Terdapat Karies', 'Gigi Kotor dan Terdapat Karies'],
            dipilih: ITEM.h3,
            nilai: ITEM.n3,
        },
        {
            soal: 'Wajah',
            pilihan: ['Bersih', 'Berminyak', 'Berjerawat'],
            dipilih: ITEM.h4,
            nilai: ITEM.n4,
        },
        {
            soal: 'Kulit Tangan',
            pilihan: ['Bersih', 'Bekas Luka', 'Gudik atau Scabies'],
            dipilih: ITEM.h5,
            nilai: ITEM.n5,
        },
        {
            soal: 'Kulit Kaki',
            pilihan: ['Bersih', 'Bekas Luka', 'Gudik atau Scabies'],
            dipilih: ITEM.h6,
            nilai: ITEM.n6,
        },
        {
            soal: 'Pakaian',
            pilihan: ['Bersih dan Rapi', 'Bersih Tidak Rapi', 'Kotor dan Tidak Rapi'],
            dipilih: ITEM.h7,
            nilai: ITEM.n7,
        },
        {
            soal: 'Ranjang',
            pilihan: ['Bersih dan Rapi', 'Berantakan atau Kotor', 'Berantakan dan Kotor'],
            dipilih: ITEM.h8,
            nilai: ITEM.n8,
        },
    ])


    const toast = useToast();
    const sendServer = () => {
        Alert.alert(MYAPP,'Apakah kamu yakin akan simpan ini ?',[
            {text:'Tidak'},
            {
                text:'Ya',
                onPress:()=>{
                    console.log(ITEM);
                    POSTDataByTable('update_pribadi',{
                      id_pribadi:ITEM.id_pribadi,
                      soal:soal
                    }).then(res=>{
                        if(res.data.status==200){
                            toast.show(res.data.message,{type:'success'});
                            navigation.pop(2);
                        }
                    })
                }
            }
        ])

       
    }
    



    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader title="Edit Kebersihan Pribadi" />
            <ScrollView style={{
                padding: 12,
            }}>
                <Text style={{
                    ...fonts.headline3,
                    color:colors.black
                }}>{moment(ITEM.tanggal).format('DD MMMM YYYY')}</Text>
                <Text style={{
                    ...fonts.headline3,
                    color:colors.primary
                }}>{ITEM.nama_santri}</Text>
                <MyGap jarak={20} />
                <FlatList data={soal} renderItem={({ item, index }) => {
                    return (
                        <View>
                            <MyRadio label={item.soal} options={item.pilihan} value={item.dipilih} onPress={x => {
                                console.log(x);
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
                  <MyButton title="Simpan Perubahan" onPress={sendServer} />
                <MyGap jarak={20} />
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})