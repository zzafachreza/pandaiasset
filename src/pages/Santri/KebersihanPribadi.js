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

export default function KebersihanPribadi({ navigation, route }) {
    const ITEM = route.params;

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


    const toast = useToast();
    const sendServer = () => {
        Alert.alert(MYAPP,'Apakah kamu yakin akan hapus ini ?',[
            {text:'Tidak'},
            {
                text:'Ya',
                onPress:()=>{
                    console.log(ITEM);
                    POSTDataByTable('hapus_pribadi',{
                        id_pribadi:ITEM.id_pribadi
                    }).then(res=>{
                        if(res.data.status==200){
                            toast.show(res.data.message,{type:'success'});
                            navigation.goBack();
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
            <MyHeader title="Kebersihan Pribadi Detail" />
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
                        <View style={{
                            flexDirection:'row',
                            alignItems:'center',
                            borderBottomWidth:1,
                            borderBottomColor:Color.blueGray[300],
                            padding:10,
                        }}>
                            <Text style={{
                                ...fonts.subheadline3,
                                flex:0.7,
                            }}>{item.soal}</Text>
                              <Text style={{
                                ...fonts.subheadline3,
                                flex:0.05,
                            }}>:</Text>
                            <Text style={{
                                ...fonts.headline5,
                                flex:1,
                            }}>{ITEM[`h`+(index+1)]}</Text>
                        </View>
                    )
                }} />
                <MyGap jarak={20} />
                <View style={{
                    flexDirection:'row'
                }}>
                    <View style={{
                        flex:1,
                        paddingRight:10,
                    }}>
                        <MyButton Icons='create' onPress={()=>navigation.navigate('KebersihanPribadiEdit',ITEM)} iconColor={colors.white} title="Edit" warna={colors.primary} />
                    </View>
                    <View style={{
                        flex:1,
                        paddingRight:10,
                    }}>
                        <MyButton Icons='trash' iconColor={colors.white} title="Hapus" warna={colors.danger} onPress={sendServer} />
                    </View>
                </View>
                <MyGap jarak={20} />
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})