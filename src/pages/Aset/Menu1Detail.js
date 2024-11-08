import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, MyDimensi, POSTDataByTable, colors, fonts, getDataByTable, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL, getData, webURL } from '../../utils/localStorage';
import moment from 'moment';
import { MyButton, MyHeader } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
export default function Menu1Detail({ navigation, route }) {
    const item = route.params;
    console.log(item.nomor);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);


    const MyListData = ({ label, value }) => {
        return (
            <View style={{
                paddingVertical: 4,
                borderBottomWidth: 1,
                borderBottomColor: Color.blueGray[200]
            }}>
                <Text style={{
                    ...fonts.captionHeader,
                    color: colors.secondary
                }}>{label}</Text>
                <Text style={{

                    ...fonts.caption1,
                    color: colors.secondary
                }}>{value}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>


            <MyHeader title={'Daftar Asset Fasos Fasum' + '\n' + 'Jakarta Barat'} onPress={() => navigation.goBack()} />
            {!loading &&
                <View style={{
                    flex: 1,
                    padding: 16,
                    zIndex: 99,
                    backgroundColor: 'white'
                }}>

                    <ScrollView>
                        <View style={{
                            padding: 10,
                        }}>


                            <MyListData label="NOMOR BAST" value={item.nomor_bast} />
                            <MyListData label="TANGGAL BAST" value={item.tanggal_bast} />
                            <MyListData label="PENGEMBANG/PIHAK KETIGA" value={item.pihak_ketiga} />
                            <MyListData label="DASAR SERAH TERIMA" value={item.serah_terima} />
                            <MyListData label="NOMOR" value={item.nomor} />
                            <MyListData label="TANGGAL" value={item.tanggal} />
                            <MyListData label="JENIS YANG DISERAHKAN" value={item.jenis} />
                            <MyListData label="LOKASI FASOS FASUM" value={item.lokasi} />
                            <MyListData label="KELURAHAN" value={item.kelurahan} />
                            <MyListData label="KECAMATAN" value={item.kecamatan} />
                            <MyListData label="WILAYAH" value={item.wilayah} />
                            <MyListData label="KIB" value={item.kib} />
                            <MyListData label="VOLUME" value={new Intl.NumberFormat().format(item.volume)} />
                            <MyListData label="SATUAN" value={item.satuan} />
                            <MyListData label="NILAI RUPIAH" value={new Intl.NumberFormat().format(item.nilai)} />
                            <MyListData label="TITIK KOORDINAT" value={item.titik_koordinat} />
                            <Text style={{
                                ...fonts.captionHeader
                            }}>FOTO</Text>
                            <Image source={{
                                uri: webURL + item.file_aset
                            }} style={{
                                width: 300,
                                height: 300,
                                resizeMode: 'contain'
                            }} />

                        </View>
                    </ScrollView>

                </View>
            }


            {loading &&
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size="large" color={colors.primary} />

                </View>
            }




        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})