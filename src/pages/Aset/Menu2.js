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
export default function Menu2({ navigation, route }) {
    const item = route.params;
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
        setLoading(true);
        POSTDataByTable('manfaat').then(res => {

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

                        <MyListData label="Kecamatan" value={item.kecamatan} />

                        <MyListData label="Kelurahan" value={item.kelurahan} />
                        <MyListData label="Pengembang" value={item.pengembang} />

                        <MyListData label="Jenis Kewajiban" value={item.jenis_kewajiban} />
                        <MyListData label="Luas" value={new Intl.NumberFormat().format(item.luas)} />
                        <MyListData label="Satuan" value={item.satuan} />
                        <MyListData label="Status" value={item.status_pengajuan} />
                    </View>
                    <TouchableOpacity onPress={() => {
                        console.log(item)
                        let WATemplate = `*Pendayagunaan & Pemanfaatan Aset Jakarta Barat ${sendData.jenis} HIJAB*\n\nNomor Pesanan : *${sendData.nomor_pesanan}*\nTanggal : *${moment().format('dddd, DD MM YYYY')}*\nPengguna : *${user.nama_lengkap} / ${user.telepon}*\n----------------------------------\n`;
                        WATemplate += `Kecamatan  : *${item.kecamatan}* \n`
                        WATemplate += `Kelurahan  : *${item.kelurahan}* \n`
                        WATemplate += `Pengembang  : *${item.pengembang}* \n`
                        WATemplate += `Jenis Kewajiban  : *${item.jenis_kewajiban}* \n`
                        WATemplate += `Luas  : *${new Intl.NumberFormat().format(item.luas)}}* \n`
                        WATemplate += `Satauan  : *${item.satuan}* \n`
                        WATemplate += `Luas  : *${item.status}* \n`

                        console.log(WATemplate)
                        Linking.openURL('https://wa.me/' + comp.tlp + '?text=' + WATemplate)

                    }} style={{
                        padding: 10,
                        backgroundColor: colors.success,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                        <Icon type='ionicon' name='logo-whatsapp' color={colors.white} />
                        <Text style={{
                            left: 10,
                            ...fonts.headline5,
                            color: colors.white
                        }}>Whatsapp</Text>
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


            <MyHeader title={'Pendayagunaan & Pemanfaatan' + '\n' + 'Asset Jakarta Barat'} onPress={() => navigation.goBack()} />
            {!loading &&
                <View style={{
                    flex: 1,
                    padding: 16,
                    zIndex: 99,
                    backgroundColor: 'white'
                }}>

                    <ScrollView>
                        <View style={{
                            margin: 5,
                            padding: 10,
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: Color.blueGray[300]
                        }}>
                            <MyInput value={key} onChangeText={x => setKey(x)} onEndEditing={x => {
                                filterData(x.nativeEvent.text)
                            }} label="Cari data" placeholder="Masukan kata kunci" iconname='search' />
                        </View>
                        <View style={{
                            margin: 5,
                            padding: 10,
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: Color.blueGray[300]
                        }}>
                            <MyPicker label="Kecamatan" data={kecamatan} value={kirim.kecamatan} onValueChange={x => {
                                setKirim({
                                    ...kirim,
                                    kecamatan: x
                                });

                                POSTDataByTable('kelurahan', {
                                    kecamatan: x
                                }).then(res => {
                                    console.log('klurahan', res.data);
                                    setKelurahan(res.data)
                                })
                            }} />
                            <MyGap jarak={10} />
                            <MyPicker label="Kelurahan" data={kelurahan} value={kirim.kelurahan} onValueChange={x => setKirim({
                                ...kirim,
                                kelurahan: x
                            })} />
                            <MyGap jarak={10} />
                            <MyPicker label="Jenis Kewajiban" data={jenis} value={kirim.jenis} onValueChange={x => setKirim({
                                ...kirim,
                                jenis: x
                            })} />
                            <MyGap jarak={10} />
                            <MyButton title="Filter" onPress={sendFilter} />
                        </View>

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