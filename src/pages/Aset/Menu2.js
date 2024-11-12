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
    const user = route.params;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [kecamatan, setKecamatan] = useState([]);
    const [kelurahan, setKelurahan] = useState([]);
    const [jenis, setJenis] = useState([]);
    const [comp, setcomp] = useState({})

    const [kirim, setKirim] = useState({
        jabatan: user.jabatan,
        kecamatan_user: user.kecamatan,
        kelurahan_user: user.kelurahan,
        kecamatan: '',
        kelurahan: '',
        jenis: '',
        status_pengajuan: ''
    })

    const getDataTransaksi = () => {
        // setLoading(true);
        POSTDataByTable('manfaat', kirim).then(res => {

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
            console.log('kirim filter', res.data);
            setData(res.data)
        }).finally(() => {
            setLoading(false);
        })
    }

    const filterData = () => {
        POSTDataByTable('manfaat', {
            ...kirim,
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

    const MyListData = ({ label, value, warna = 0 }) => {
        return (
            <View style={{
            }}>
                <Text style={{
                    ...fonts.captionHeader,
                    color: colors.secondary
                }}>{label}</Text>
                {warna == 1 &&
                    <Text style={{
                        flex: 1,
                        borderRadius: 8,
                        paddingHorizontal: 4,
                        backgroundColor: colors.primary,
                        ...fonts.caption1,
                        color: colors.secondary
                    }}>{value}</Text>
                }
                {warna == 2 &&
                    <Text style={{
                        flex: 1,
                        borderRadius: 8,
                        paddingHorizontal: 4,
                        backgroundColor: colors.success,
                        ...fonts.caption1,
                        color: colors.white
                    }}>{value}</Text>
                }
                {warna == 0 &&
                    <Text style={{
                        flex: 1,
                        ...fonts.caption1,
                        color: colors.secondary
                    }}>{value}</Text>
                }
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
                        <MyListData label="Nilai" value={new Intl.NumberFormat().format(item.nilai)} />
                        <MyListData label="Status Pengajuan" warna={item.status_pengajuan == 'Sudah dikerjasamakan' ? 2 : 1} value={item.status_pengajuan} />
                    </View>
                    <TouchableOpacity onPress={() => {
                        console.log(item)
                        let WATemplate = `*Pendayagunaan dan Pemanfaatan Aset Jakarta Barat*\nTanggal : *${moment().format('dddd, DD MM YYYY')}*\nPengguna : *${user.nama_lengkap}*\n----------------------------------\n`;
                        WATemplate += `Kecamatan  : *${item.kecamatan}* \n`
                        WATemplate += `Kelurahan  : *${item.kelurahan}* \n`
                        WATemplate += `Pengembang  : *${item.pengembang}* \n`
                        WATemplate += `Jenis Kewajiban  : *${item.jenis_kewajiban.toString().trim()}* \n`
                        WATemplate += `Luas  : *${new Intl.NumberFormat().format(item.luas)}* \n`
                        WATemplate += `Satuan  : *${item.satuan}* \n`
                        WATemplate += `Nilai  : *${new Intl.NumberFormat().format(item.nilai)}* \n`
                        WATemplate += `Status Pengajuan  : *${item.status_pengajuan}* \n`

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

                            {(user.jabatan == 'Walikota' || user.jabatan == 'Camat' || user.level == 'SWASTA') &&


                                <>
                                    <MyPicker label="Kecamatan" data={user.jabatan == 'Camat' ? kecamatan.filter(i => i.value == user.kecamatan) : kecamatan} value={kirim.kecamatan} onValueChange={x => {
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
                                    <MyGap jarak={10} /></>
                            }
                            <MyPicker label="Jenis Kewajiban" data={jenis} value={kirim.jenis} onValueChange={x => setKirim({
                                ...kirim,
                                jenis: x
                            })} />
                            <MyGap jarak={10} />
                            <MyPicker label="Status Pengajuan" data={[
                                { label: '', value: '' },
                                { label: 'Siap untuk dikerjasamakan', value: 'Siap untuk dikerjasamakan' },
                                { label: 'Sudah dikerjasamakan', value: 'Sudah dikerjasamakan' },
                            ]} value={kirim.status_pengajuan} onValueChange={x => setKirim({
                                ...kirim,
                                status_pengajuan: x
                            })} />
                            <MyGap jarak={10} />
                            <MyButton title="Filter" onPress={sendFilter} />
                            <MyGap jarak={10} />
                            <MyButton title="Lihat Persyaratan" onPress={() => navigation.navigate('Menu2Detail')} warna={colors.secondary} />
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