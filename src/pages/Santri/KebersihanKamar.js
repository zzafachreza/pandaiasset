import { ActivityIndicator, Alert, FlatList, Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, MyDimensi, POSTDataByTable, colors, fonts, getDataByTable, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL, MYAPP } from '../../utils/localStorage';
import moment from 'moment';
import { MyCalendar, MyGap, MyHeader } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { tan } from 'react-native-reanimated';
import { useToast } from 'react-native-toast-notifications';
export default function KebersihanKamar({ navigation, route }) {
    const item = route.params;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [sakit, setSakit] = useState([]);
    const [kebersihan, setKebersihan] = useState([]);
    const [pribadi, setPribadi] = useState([]);
    const [kirim, setKirim] = useState({
        fid_kamar: item.id_kamar,
        tanggal: route.params.tanggal
    })

    const isFocus = useIsFocused();
    const toast = useToast();

    const getDataTransaksi = (tanggal = kirim.tanggal) => {
        // setLoading(true);

        getDataByTable('kamar_santri').then(res => {

            setData(res.data)
        });

        POSTDataByTable('get_sakit', {
            ...kirim,
            tanggal: tanggal
        }).then(res => {
            console.log(res.data)
            setSakit(res.data);

        })

        POSTDataByTable('get_kebersihan', {
            ...kirim,
            tanggal: tanggal
        }).then(res => {

            setKebersihan(res.data)

        })


        POSTDataByTable('get_pribadi', {
            ...kirim,
            tanggal: tanggal
        }).then(res => {

            setPribadi(res.data)

        })

    }


    useEffect(() => {
        if (isFocus) {
            getDataTransaksi();
        }
    }, [isFocus]);



    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <MyHeader title="Rekap Data Harian" onPress={() => navigation.goBack()} />
            {!loading &&
                <View style={{
                    flex: 1,
                    padding: 12,
                }}>

                    <MyCalendar onDateChange={x => {
                        setKirim({ ...kirim, tanggal: x });

                        getDataTransaksi(x)

                        console.log(x)
                    }} value={kirim.tanggal} textColor={colors.primary} label="Tanggal" />
                    <MyGap jarak={20} />
                    <ScrollView>
                        <View style={{
                            borderWidth: 1,
                            borderColor: colors.primary,
                            marginBottom: 10,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: colors.primary,
                                alignItems: 'center',
                                paddingVertical: 8,
                                paddingLeft: 5,
                            }}>
                                <Icon type='ionicon' name='bed-outline' size={20} color={colors.white} />
                                <Text style={{

                                    ...fonts.headline4,
                                    color: colors.white,
                                    flex: 1,
                                    padding: 10,
                                }}>Kebersihan Kamar</Text>

                                <TouchableOpacity onPress={() => navigation.navigate('KebersihanKamarAdd', {
                                    ...item,
                                    tanggal: kirim.tanggal
                                })} style={{
                                    marginRight: 5,
                                    backgroundColor: colors.white,
                                    width: 80,
                                    height: 40,
                                    borderRadius: 20,
                                    justifyContent: "center"
                                }}>
                                    <Icon type='ionicon' name='add' color={colors.primary} />
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                padding: 10,
                            }}>
                                <FlatList data={kebersihan} renderItem={({ item, index }) => {
                                    return (
                                        <TouchableWithoutFeedback onPress={() => navigation.navigate('KebersihanKamarDetail', item)}>
                                            <View style={{
                                                marginBottom: 10,
                                                borderWidth: 1,
                                                padding: 10,
                                                borderRadius: 10,
                                                borderColor: Color.blueGray[300],
                                            }}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{
                                                        flex: 1,
                                                        ...fonts.body3
                                                    }}>Kondisi Lantai</Text>
                                                    <Text style={{
                                                        ...fonts.headline5
                                                    }}>{item.h1}</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{
                                                        flex: 1,
                                                        ...fonts.body3
                                                    }}>Kondisi Kamar Mandi</Text>
                                                    <Text style={{
                                                        ...fonts.headline5
                                                    }}>{item.h2}</Text>
                                                </View>

                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{
                                                        flex: 1,
                                                        ...fonts.body3
                                                    }}>Kondisi Lemari</Text>
                                                    <Text style={{
                                                        ...fonts.headline5
                                                    }}>{item.h3}</Text>
                                                </View>

                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{
                                                        flex: 1,
                                                        ...fonts.body3
                                                    }}>Gantungan Baju</Text>
                                                    <Text style={{
                                                        ...fonts.headline5
                                                    }}>{item.h4}</Text>
                                                </View>

                                                <View style={{
                                                    marginTop: 10,
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{
                                                        flex: 1,
                                                        ...fonts.headline5,
                                                        color: colors.primary,
                                                    }}>Foto Kondisi Kamar</Text>
                                                    <Icon type='ionicon' name='images' color={colors.primary} />
                                                </View>

                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}>
                                                    <View style={{
                                                        flex: 1,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        padding: 5,
                                                    }}>

                                                        <Image style={{
                                                            width: windowWidth / 4,
                                                            height: windowWidth / 4,
                                                            borderRadius: 10,
                                                            resizeMode: 'contain'
                                                        }} source={{
                                                            uri: item.foto_ranjang
                                                        }} />
                                                        <Text style={{
                                                            textAlign: 'center',
                                                            color: Color.blueGray[400],
                                                            ...fonts.caption,
                                                            textAlign: 'center'
                                                        }}>Ranjang</Text>

                                                    </View>

                                                    <View style={{
                                                        flex: 1,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        padding: 5,
                                                    }}>

                                                        <Image style={{
                                                            width: windowWidth / 4,
                                                            height: windowWidth / 4,
                                                            borderRadius: 10,
                                                            resizeMode: 'contain'
                                                        }} source={{
                                                            uri: item.foto_lantai
                                                        }} />
                                                        <Text style={{
                                                            textAlign: 'center',
                                                            color: Color.blueGray[400],
                                                            ...fonts.caption,
                                                            textAlign: 'center'
                                                        }}>Lantai</Text>

                                                    </View>

                                                    <View style={{
                                                        flex: 1,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        padding: 5,
                                                    }}>

                                                        <Image style={{
                                                            width: windowWidth / 4,
                                                            height: windowWidth / 4,
                                                            resizeMode: 'contain',
                                                            borderRadius: 10,
                                                        }} source={{
                                                            uri: item.foto_semua
                                                        }} />
                                                        <Text style={{
                                                            textAlign: 'center',
                                                            color: Color.blueGray[400],
                                                            ...fonts.caption,
                                                            textAlign: 'center'
                                                        }}>Keseluruhan</Text>

                                                    </View>
                                                </View>

                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                }} />
                            </View>

                        </View>


                        <View style={{
                            borderWidth: 1,
                            borderColor: colors.primary,
                            marginBottom: 10,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: colors.primary,
                                alignItems: 'center',
                                paddingVertical: 8,
                                paddingLeft: 5,
                            }}>
                                <Icon type='ionicon' name='person-outline' size={20} color={colors.white} />
                                <Text style={{

                                    ...fonts.headline4,
                                    color: colors.white,
                                    flex: 1,
                                    padding: 10,
                                }}>Kebersihan Pribadi</Text>

                                <TouchableOpacity onPress={() => navigation.navigate('KebersihanPribadiAdd', {
                                    ...item,
                                    tanggal: kirim.tanggal
                                })} style={{
                                    marginRight: 5,
                                    backgroundColor: colors.white,
                                    width: 80,
                                    height: 40,
                                    borderRadius: 20,
                                    justifyContent: "center"
                                }}>
                                    <Icon type='ionicon' name='add' color={colors.primary} />
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                padding: 10,
                            }}>
                                <FlatList data={pribadi} renderItem={({ item, index }) => {
                                    return (
                                        <TouchableWithoutFeedback onPress={() => navigation.navigate('KebersihanPribadi', item)}>
                                            <View style={{
                                                marginBottom: 10,
                                                borderWidth: 1,
                                                padding: 10,
                                                borderRadius: 10,
                                                borderColor: Color.blueGray[300],
                                            }}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{
                                                        flex: 1,
                                                        ...fonts.body3
                                                    }}>Nama Santri</Text>
                                                    <Text style={{
                                                        flex: 1,
                                                        ...fonts.headline5
                                                    }}>{item.nama_santri}</Text>
                                                    <Icon type='ionicon' name='arrow-forward-circle-outline' color={colors.primary} />
                                                </View>


                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                }} />
                            </View>

                        </View>

                        <View style={{
                            borderWidth: 1,
                            borderColor: colors.primary,
                            marginBottom: 10,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: colors.primary,
                                alignItems: 'center',
                                paddingVertical: 8,
                                paddingLeft: 5,
                            }}>
                                <Icon type='ionicon' name='medkit-outline' size={20} color={colors.white} />
                                <Text style={{

                                    ...fonts.headline4,
                                    color: colors.white,
                                    flex: 1,
                                    padding: 10,
                                }}>Sakit</Text>

                                <TouchableOpacity onPress={() => navigation.navigate('SakitAdd', {
                                    ...item,
                                    tanggal: kirim.tanggal
                                })} style={{
                                    marginRight: 5,
                                    backgroundColor: colors.white,
                                    width: 80,
                                    height: 40,
                                    borderRadius: 20,
                                    justifyContent: "center"
                                }}>
                                    <Icon type='ionicon' name='add' color={colors.primary} />
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                padding: 10,
                            }}>
                                <FlatList data={sakit} renderItem={({ item, index }) => {
                                    return (
                                        <View style={{
                                            marginBottom: 10,
                                            borderWidth: 1,
                                            padding: 10,
                                            borderRadius: 10,
                                            borderColor: Color.blueGray[300],
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <View style={{
                                                flex: 1,
                                            }}>
                                                <Text style={{
                                                    ...fonts.subheadline3,
                                                }}>{item.nama_santri}</Text>
                                                <Text style={{

                                                    ...fonts.body3,
                                                }}>{item.keterangan}</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
                                                { text: 'Tidak' },
                                                {
                                                    text: 'Ya',
                                                    onPress: () => {
                                                        console.log(item);
                                                        POSTDataByTable('hapus_sakit', {
                                                            id_sakit: item.id_sakit
                                                        }).then(res => {
                                                            if (res.data.status == 200) {
                                                                toast.show(res.data.message, { type: 'success' });
                                                                getDataTransaksi();
                                                            }
                                                        })
                                                    }
                                                }
                                            ])}>
                                                <Icon type='ionicon' name='trash' color={colors.danger} />
                                            </TouchableOpacity>

                                        </View>
                                    )
                                }} />
                            </View>

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