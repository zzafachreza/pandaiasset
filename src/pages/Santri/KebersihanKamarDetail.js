import { ActivityIndicator, Alert, FlatList, Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, MyDimensi, POSTDataByTable, colors, fonts, getDataByTable, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL, MYAPP } from '../../utils/localStorage';
import moment from 'moment';
import { MyButton, MyCalendar, MyFileUploader, MyGap, MyHeader, MyImageUpload, MyInput, MyPicker, MyRadio } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';

export default function KebersihanKamarDetail({ navigation, route }) {
    const ITEM = route.params;
    console.log(ITEM)


    const toast = useToast();
    const sendServer = () => {
        Alert.alert(MYAPP,'Apakah kamu yakin akan hapus ini ?',[
            {text:'Tidak'},
            {
                text:'Ya',
                onPress:()=>{
                    console.log(ITEM);
                    POSTDataByTable('hapus_kebersihan',{
                        id_kebersihan:ITEM.id_kebersihan
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
            <MyHeader title="Kebersihan Kamar Detail" />
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
                    

                    <View style={{
                        marginBottom:10,
                    }}>
                        <Text style={{
                        ...fonts.headline5,
                        color: colors.black,
                    }}>Ranjang</Text>
                    <Image source={{
                        uri:ITEM.foto_ranjang
                    }} style={{
                        borderRadius:10,
                        width:windowWidth/1.2,
                        height:windowWidth/1.2,
                        resizeMode:'contain'
                    }} />
                    </View>

                    <View style={{
                        marginBottom:10,
                    }}>
                        <Text style={{
                        ...fonts.headline5,
                        color: colors.black,
                    }}>Lantai</Text>
                    <Image source={{
                        uri:ITEM.foto_lantai
                    }} style={{
                        borderRadius:10,
                        width:windowWidth/1.2,
                        height:windowWidth/1.2,
                        resizeMode:'contain'
                    }} />
                    </View>

                    <View style={{
                        marginBottom:10,
                    }}>
                        <Text style={{
                        ...fonts.headline5,
                        color: colors.black,
                    }}>Keseluruhan</Text>
                    <Image source={{
                        uri:ITEM.foto_semua
                    }} style={{
                        borderRadius:10,
                        width:windowWidth/1.2,
                        height:windowWidth/1.2,
                        resizeMode:'contain'
                    }} />
                    </View>

                   
                </View>
                <MyGap jarak={20} />
                <View style={{
                    flexDirection:'row'
                }}>
                    <View style={{
                        flex:1,
                        paddingRight:10,
                    }}>
                        <MyButton Icons='create' onPress={()=>navigation.navigate('KebersihanKamarEdit',ITEM)} iconColor={colors.white} title="Edit" warna={colors.primary} />
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