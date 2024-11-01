import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, MyDimensi, POSTDataByTable, colors, fonts, getDataByTable, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import moment from 'moment';
import { MyButton, MyGap, MyHeader } from '../../components';
import { useIsFocused } from '@react-navigation/native';

export default function KamarDetail({ navigation, route }) {
    const item = route.params;

    const [data, setData] = useState([]);
    const __getTransaction = () => {
        POSTDataByTable('rekap_harian', {
            fid_kamar: item.id_kamar
        }).then(res => {
            console.log(res.data);
            setData(res.data);
        })
    }

    const isFocus = useIsFocused();

    useEffect(() => {
        if (isFocus) {
            __getTransaction();
        }
    }, [isFocus])
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader title={item.nama_kamar} />
            <ScrollView style={{
                padding: 12,
            }}>
                <Text style={{
                    marginBottom: 10,
                    ...fonts.headline4,
                    color: colors.primary,
                    textAlign: 'center'
                }}>Data Asrama Santri Salafiyah Wustha 2 & 3</Text>

                <View style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: colors.primary,
                    flexDirection: 'row',
                    position: 'relative',
                    borderRadius: 10,
                    // margin: 10,
                    marginHorizontal: 5,
                    marginVertical: 10,
                    overflow: 'hidden'
                }}>


                    <View style={{
                        flex: 1,
                        width: '100%',
                        backgroundColor: colors.white
                    }}>
                        <View style={{
                            padding: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderBottomWidth: 1,
                            borderBottomColor: Color.blueGray[300]
                        }}>
                            <Text style={{
                                flex: 1,
                                ...fonts.subheadline3,
                                color: colors.primary
                            }}>Nama Kelas / Kamar</Text>
                            <Text style={{
                                flex: 1,
                                ...fonts.headline5,
                                color: colors.primary
                            }}>{item.nama_kamar}</Text>
                        </View>
                        <View style={{
                            padding: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderBottomWidth: 1,
                            borderBottomColor: Color.blueGray[300]
                        }}>
                            <Text style={{
                                flex: 1,
                                ...fonts.subheadline3,
                                color: colors.primary
                            }}>Nomor Kamar</Text>
                            <Text style={{
                                flex: 1,
                                ...fonts.headline5,
                                color: colors.primary
                            }}>{item.nomor_kamar}</Text>
                        </View>
                        <View style={{
                            padding: 10,
                            flexDirection: 'row',
                            // alignItems: 'center'
                        }}>
                            <Text style={{
                                flex: 1,
                                ...fonts.subheadline3,
                                color: colors.primary
                            }}>Jumlah Santri</Text>
                            <View style={{
                                flex: 1,
                            }}>
                                <Text style={{

                                    ...fonts.headline5,
                                    color: colors.primary
                                }}>{item.jumlah} Orang</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('SantriList', item)} style={{
                                    marginTop: 5,
                                    padding: 10,
                                    backgroundColor: colors.primary,
                                    borderRadius: 10,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        ...fonts.subheadline3,
                                        flex: 1,
                                        color: colors.white
                                    }}>Daftar Santri</Text>
                                    <Icon type='ionicon' size={20} name='search-outline' color={colors.white} />
                                </TouchableOpacity>

                            </View>

                        </View>

                    </View>
                    <View style={{
                        padding: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.primary,
                    }}>
                        <Icon type='ionicon' name='bed' color={colors.white} />
                    </View>



                </View>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('KebersihanKamar', {
                    ...item,
                    tanggal: moment().format('YYYY-MM-DD')
                })}>
                    <View style={{
                        marginBottom: 10,
                        marginTop: 5,
                        flexDirection: 'row',
                        backgroundColor: colors.primary,
                        alignItems: 'center',
                        borderRadius: 10,
                        justifyContent: 'center',
                    }}>
                        <Icon type='ionicon' name='duplicate' size={20} color={colors.white} />
                        <Text style={{

                            ...fonts.headline4,
                            color: colors.white,
                            padding: 10,

                            textAlign: 'center'
                        }}>Buat Rekap Harian</Text>
                    </View>
                </TouchableWithoutFeedback>

                <FlatList data={data} renderItem={({ item, index }) => {
                    return (
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('KebersihanKamar', {
                            id_kamar: route.params.id_kamar,
                            tanggal: item.tanggal
                        })}>
                            <View style={{
                                flex: 1,
                                borderWidth: 1,
                                borderColor: colors.primary,
                                flexDirection: 'row',
                                position: 'relative',
                                borderRadius: 10,
                                // margin: 10,
                                marginHorizontal: 5,
                                marginVertical: 10,
                                overflow: 'hidden'
                            }}>


                                <View style={{
                                    flex: 1,
                                    width: '100%',
                                    backgroundColor: colors.white
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        ...fonts.headline5,
                                        color: colors.black
                                    }}>{moment(item.tanggal).format('DD MMMM YYYY')}</Text>
                                    <View style={{
                                        padding: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderBottomWidth: 1,
                                        borderBottomColor: Color.blueGray[300]
                                    }}>
                                        <Icon type='ionicon' name='bed' size={20} color={colors.secondary} />
                                        <Text style={{
                                            left: 5,
                                            flex: 1,
                                            ...fonts.subheadline3,
                                            color: colors.primary
                                        }}>Skor Kebersihan Kamar</Text>
                                        <Text style={{
                                            // flex: 1,
                                            ...fonts.headline5,
                                            color: colors.black
                                        }}>{item.skor_kebersihan}</Text>
                                    </View>
                                    <View style={{
                                        padding: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderBottomWidth: 1,
                                        borderBottomColor: Color.blueGray[300]
                                    }}>
                                        <Icon type='ionicon' name='person' size={20} color={colors.secondary} />
                                        <Text style={{
                                            left: 5,
                                            flex: 1,
                                            ...fonts.subheadline3,
                                            color: colors.primary
                                        }}>Skor Kebersihan Pribadi</Text>
                                        <Text style={{
                                            // flex: 1,
                                            ...fonts.headline5,
                                            color: colors.black
                                        }}>{item.skor_pribadi}</Text>
                                    </View>
                                    <View style={{
                                        padding: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Icon type='ionicon' name='ribbon' size={20} color={colors.secondary} />
                                        <Text style={{
                                            left: 5,
                                            flex: 1,
                                            ...fonts.subheadline3,
                                            color: colors.primary
                                        }}>Skor Total Keseluruhan </Text>
                                        <Text style={{
                                            // flex: 1,
                                            ...fonts.headline5,
                                            color: colors.black
                                        }}>{item.total}</Text>
                                    </View>
                                    <View style={{
                                        padding: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Icon type='ionicon' name='medkit' size={20} color={colors.secondary} />
                                        <Text style={{
                                            left: 5,
                                            flex: 1,
                                            ...fonts.subheadline3,
                                            color: colors.primary
                                        }}>Jumlah Sakit</Text>
                                        <Text style={{
                                            // flex: 1,
                                            ...fonts.headline5,
                                            color: colors.black
                                        }}>{item.jumlah_sakit} Orang</Text>
                                    </View>


                                </View>




                            </View>
                        </TouchableWithoutFeedback>
                    )
                }} />


                <MyGap jarak={20} />
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})