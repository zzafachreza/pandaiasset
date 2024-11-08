import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, MyDimensi, POSTDataByTable, colors, fonts, getDataByTable, getDataCompany, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL, getData } from '../../utils/localStorage';
import moment from 'moment';
import { MyButton, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
export default function Menu31Detail({ navigation, route }) {
    const ITEM = route.params;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [kecamatan, setKecamatan] = useState([]);
    const [kelurahan, setKelurahan] = useState([]);
    const [jenis, setJenis] = useState([]);
    const [comp, setcomp] = useState({})

    const [kirim, setKirim] = useState({
        kecamatan: '',
        kelurahan: '',
        jenis: '',
    })

    const getDataTransaksi = () => {
        // setLoading(true);
        POSTDataByTable('aset_grap').then(res => {

            setData(res.data)
        }).finally(() => {
            setLoading(false);
        })

        getDataCompany().then(re => {
            setcomp(re.data.data)
            console.log(re.data.data);
        })
    }

    const getKecamatan = () => {
        POSTDataByTable('kecamatan').then(res => {

            setKecamatan(res.data)
        })
    }

    const getJenis = () => {
        POSTDataByTable('jenis_kewajiban').then(res => {

            setJenis(res.data)
        })
    }

    const sendFilter = () => {
        POSTDataByTable('manfaat', kirim).then(res => {
            // console.log(res.data);
            setData(res.data)
        }).finally(() => {
            setLoading(false);
        })
    }

    const filterData = () => {
        POSTDataByTable('manfaat', {
            key: key
        }).then(res => {

            setData(res.data)
        }).finally(() => {
            setLoading(false);
        })
    }

    const isFocus = useIsFocused();

    useEffect(() => {
        getKecamatan();
        getJenis();
        if (isFocus) {
            getDataTransaksi();
        }
    }, [isFocus]);

    const MyListData = ({ label, value }) => {
        return (
            <View style={{
            }}>
                <Text style={{
                    ...fonts.captionHeader,
                    color: colors.secondary
                }}>{label}</Text>
                <Text style={{
                    flex: 1,
                    ...fonts.caption1,
                    color: colors.secondary
                }}>{value}</Text>
            </View>
        )
    }
    const __renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback >
                <View style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: colors.primary,
                    // padding: 10,
                    position: 'relative',
                    borderRadius: 10,
                    overflow: 'hidden',
                    // margin: 10,
                    marginHorizontal: 5,
                    marginVertical: 10,
                    overflow: 'hidden'
                }}>

                    <View style={{
                        padding: 10,
                    }}>
                        <MyListData label="Nomor" value={item.nomor} />
                        <MyListData label="Kecamatan" value={item.kecamatan} />
                        <MyListData label="Kelurahan" value={item.kelurahan} />
                        <MyListData label="Lokasi" value={item.lokasi} />
                        <MyListData label="Jenis Peruntukan" value={item.jenis} />

                    </View>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Menu1Detail', item)

                    }} style={{
                        padding: 10,
                        backgroundColor: colors.primary,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            ...fonts.headline5,
                            color: colors.secondary
                        }}>Lihat Detail</Text>
                    </TouchableOpacity>
                    <Image source={require('../../assets/bgmenu.png')} style={{
                        width: '100%',
                        height: 80,
                        resizeMode: 'contain',
                        bottom: -20,

                    }} />
                </View>
            </TouchableWithoutFeedback>
        )
    }


    const [key, setKey] = useState('');
    const [TMP, setTMP] = useState({});

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>


            <MyHeader title={ITEM.title} onPress={() => navigation.goBack()} />
            {!loading &&
                <View style={{
                    flex: 1,
                    padding: 16,
                    zIndex: 99,
                    backgroundColor: 'white'
                }}>
                    <Text style={{
                        padding: 10,
                        backgroundColor: ITEM.bck,
                        color: ITEM.txt,
                        textAlign: 'center',
                        borderRadius: 10,
                        ...fonts.headline3
                    }}>Jumlah Aset : {ITEM.jumlah}</Text>
                    <ScrollView>


                        <FlatList data={data} showsVerticalScrollIndicator={false} renderItem={__renderItem} />

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