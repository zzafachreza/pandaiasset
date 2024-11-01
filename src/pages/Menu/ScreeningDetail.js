import { ActivityIndicator, Alert, FlatList, Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, MyDimensi, POSTDataByTable, colors, fonts, getDataByTable, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL, getData, MYAPP } from '../../utils/localStorage';
import moment from 'moment';
import { MyButton, MyHeader, MyRadio } from '../../components';
import { useToast } from 'react-native-toast-notifications';

export default function ScreeningDetail({ navigation, route }) {
    const ITEM = route.params;
    const [data, setData] = useState({});
    const [data2, setData2] = useState({});
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [youtube, setYoutube] = useState([]);
    const getDataTransaksi = () => {
        POSTDataByTable('youtube_all').then(res => {
            console.log(res.data);
            setYoutube(res.data);
        })
        getData('user').then(u => setUser(u))
        // setLoading(true);
        getDataByTable('soal_utama').then(res => {

            setData(res.data)
        })

        getDataByTable('soal_lanjutan').then(res => {

            setData2(res.data)
        })
    }

    const toast = useToast();

    const hapus = () => {

        Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
            { text: 'Tidak' },
            {
                text: 'Ya',
                onPress: () => {
                    POSTDataByTable('delete_hasil', {
                        id_hasil: ITEM.id_hasil,
                    }).then(res => {
                        if (res.data.status == 200) {
                            toast.show(res.data.message, {
                                type: 'success'
                            });
                            navigation.goBack();
                        }
                    })
                }
            }
        ])

    }
    useEffect(() => {
        getDataTransaksi();
    }, []);

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <MyHeader title="Hasil Screening" onPress={() => navigation.goBack()} />
            {!loading &&
                <View style={{
                    flex: 1,
                }}>
                    <ScrollView>
                        <View style={{
                            flex: 1,
                            padding: 10,
                            position: 'relative',
                            borderRadius: 10,
                            // margin: 10,
                            marginHorizontal: 5,
                            marginVertical: 10,
                            overflow: 'hidden'
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    flex: 1,
                                    ...fonts.subheadline3,
                                    color: ITEM.hasile == 'Normal' && ITEM.hasilc == 'Normal' && ITEM.hasilh == 'Normal' && ITEM.hasilp == 'Normal' && ITEM.hasilpr == 'Normal' && ITEM.hasil == 'SAKIT' ? colors.success : ITEM.hasil == 'NORMAL' ? colors.success : colors.danger
                                }}>
                                    {ITEM.hasile == 'Normal' && ITEM.hasilc == 'Normal' && ITEM.hasilh == 'Normal' && ITEM.hasilp == 'Normal' && ITEM.hasilpr == 'Normal' && ITEM.hasil == 'SAKIT' ? 'Selamat kamu tidak mengalami gangguan mental emosional yang bermakna, yuk ikuti past intervensi ini agar kamu semakin sehat' : ITEM.hasil == 'NORMAL' ? 'Selamat kamu tidak mengalami masalah psikologis dan emosional, yuk pelajari cara agar kamu tetap sehat dan jauh dari masalah psikososial.' : 'Kamu mengalami gejala gangguan mental emosional segera menghubungi petugas untuk mendapatkan bantuan'}
                                </Text>
                                <Image
                                    source={ITEM.hasile == 'Normal' && ITEM.hasilc == 'Normal' && ITEM.hasilh == 'Normal' && ITEM.hasilp == 'Normal' && ITEM.hasilpr == 'Normal' && ITEM.hasil == 'SAKIT' ? require('../../assets/done_icon.png') : ITEM.hasil == 'NORMAL' ? require('../../assets/done_icon.png') : require('../../assets/warning_red.png')}
                                    style={{
                                        width: windowWidth / 4,
                                        height: windowWidth / 4,
                                    }}
                                />
                            </View>

                            <View style={{
                                marginTop: 10,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    flex: 1,
                                    ...fonts.body3,
                                    color: colors.primary,
                                }}>
                                    {moment(ITEM.tanggal).format('DD MMMM YYYY')}
                                </Text>

                            </View>

                        </View>

                        <FlatList data={data} showsVerticalScrollIndicator={false} renderItem={({ item, index }) => {
                            return <View style={{
                                padding: 8,
                                marginVertical: 4,
                            }}>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{
                                        ...fonts.headline5,
                                        color: colors.primary
                                    }}>
                                        {item.nomor}
                                    </Text>
                                    <View style={{
                                        flex: 1,
                                        paddingLeft: 10,
                                    }}>
                                        <Text style={{
                                            ...fonts.subheadline3,
                                            color: colors.primary
                                        }}>
                                            {item.soal}
                                        </Text>
                                        <View>
                                            <Text style={{
                                                ...fonts.headline4,
                                                color: ITEM['a' + item.nomor] == 1 ? colors.success : colors.danger,
                                            }}>{ITEM['a' + item.nomor] == 1 ? 'Ya' : 'Tidak'}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        }} />

                        {ITEM.hasil == 'SAKIT' &&

                            <>
                                {/* GANGGUAN */}
                                <Text style={{
                                    ...fonts.headline3,
                                    color: colors.white,
                                    textAlign: 'center',
                                    backgroundColor: colors.primary,
                                    padding: 20,
                                }}>
                                    Hasil Screening Lanjutan
                                </Text>
                                <FlatList data={data2} showsVerticalScrollIndicator={false} renderItem={({ item, index }) => {
                                    return <View style={{
                                        padding: 8,
                                        marginVertical: 4,
                                    }}>
                                        <View style={{
                                            flexDirection: 'row'
                                        }}>
                                            <Text style={{
                                                ...fonts.headline5,
                                                color: colors.primary
                                            }}>
                                                {item.nomor}
                                            </Text>
                                            <View style={{
                                                flex: 1,
                                                paddingLeft: 10,
                                            }}>
                                                <Text style={{
                                                    ...fonts.subheadline3,
                                                    color: colors.primary
                                                }}>
                                                    {item.soal}
                                                </Text>
                                                <View>
                                                    <Text style={{
                                                        ...fonts.headline4,
                                                        color: ITEM['b' + item.nomor] == 2 ? colors.success : ITEM['b' + item.nomor] == 1 ? colors.black : colors.danger,
                                                    }}>{ITEM['b' + item.nomor] == 2 ? 'Benar' : ITEM['b' + item.nomor] == 1 ? 'Agak' : 'Tidak'}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                }} />

                                <View style={{
                                    borderRightWidth: 1,
                                    borderRightColor: Color.blueGray[300],
                                    borderLeftWidth: 1,
                                    borderLeftColor: Color.blueGray[300],
                                    marginBottom: 20,
                                }}>


                                    <View style={{
                                        padding: 10,
                                        backgroundColor: colors.primary
                                    }}>
                                        <Text style={{
                                            ...fonts.headline3,
                                            color: colors.white,
                                            textAlign: 'center'
                                        }}>SKOR KESULITAN</Text>
                                    </View>
                                    <View style={{
                                        padding: 10,
                                        backgroundColor: colors.white,
                                        flexDirection: 'row',
                                        borderBottomWidth: 1,
                                        borderBottomColor: Color.blueGray[300]
                                    }}>
                                        <Text style={{
                                            flex: 1,
                                            ...fonts.headline5,
                                            color: colors.black,
                                        }}>Gejala Emosional (E)</Text>
                                        <Text style={{
                                            ...fonts.headline5,
                                            color: colors.primary,
                                        }}>{ITEM.hasile}</Text>
                                    </View>
                                    <View style={{
                                        padding: 10,
                                        backgroundColor: colors.white,
                                        flexDirection: 'row',
                                        borderBottomWidth: 1,
                                        borderBottomColor: Color.blueGray[300]
                                    }}>
                                        <Text style={{
                                            flex: 1,
                                            ...fonts.headline5,
                                            color: colors.black,
                                        }}>Masalah Perilaku (C)</Text>
                                        <Text style={{
                                            ...fonts.headline5,
                                            color: colors.primary,
                                        }}>{ITEM.hasilc}</Text>
                                    </View>
                                    <View style={{
                                        padding: 10,
                                        backgroundColor: colors.white,
                                        flexDirection: 'row',
                                        borderBottomWidth: 1,
                                        borderBottomColor: Color.blueGray[300]
                                    }}>
                                        <Text style={{
                                            flex: 1,
                                            ...fonts.headline5,
                                            color: colors.black,
                                        }}>Hiperaktivitas (H)</Text>
                                        <Text style={{
                                            ...fonts.headline5,
                                            color: colors.primary,
                                        }}>{ITEM.hasilh}</Text>
                                    </View>
                                    <View style={{
                                        padding: 10,
                                        backgroundColor: colors.white,
                                        flexDirection: 'row',
                                        borderBottomWidth: 1,
                                        borderBottomColor: Color.blueGray[300]
                                    }}>
                                        <Text style={{
                                            flex: 1,
                                            ...fonts.headline5,
                                            color: colors.black,
                                        }}>Masalah Teman Sebaya (P)</Text>
                                        <Text style={{
                                            ...fonts.headline5,
                                            color: colors.primary,
                                        }}>{ITEM.hasilp}</Text>
                                    </View>
                                    <View style={{
                                        padding: 10,
                                        backgroundColor: colors.secondary,
                                        flexDirection: 'row',
                                        borderBottomWidth: 1,
                                        borderBottomColor: Color.blueGray[300]
                                    }}>
                                        <Text style={{
                                            flex: 1,
                                            ...fonts.headline5,
                                            color: colors.black,
                                        }}>Total Skor Kesulitan</Text>
                                        <Text style={{
                                            ...fonts.headline5,
                                            color: colors.primary,
                                        }}>{ITEM.hasiltotal}</Text>
                                    </View>
                                    <View style={{
                                        padding: 10,
                                        backgroundColor: colors.primary
                                    }}>
                                        <Text style={{
                                            ...fonts.headline3,
                                            color: colors.white,
                                            textAlign: 'center'
                                        }}>SKOR KEKUATAN</Text>
                                    </View>
                                    <View style={{
                                        padding: 10,
                                        backgroundColor: colors.white,
                                        flexDirection: 'row',
                                        borderBottomWidth: 1,
                                        borderBottomColor: Color.blueGray[300]
                                    }}>
                                        <Text style={{
                                            flex: 1,
                                            ...fonts.headline5,
                                            color: colors.black,
                                        }}>Perilaku Prososial (Pr)</Text>
                                        <Text style={{
                                            ...fonts.headline5,
                                            color: colors.primary,
                                        }}>{ITEM.hasilpr}</Text>
                                    </View>
                                </View>

                                {/* GANGGUAN */}
                            </>

                        }

                        {/* Video */}
                        <View>
                            <Text style={{
                                fontFamily: fonts.primary[600],
                                fontSize: 20,
                                textAlign: "center",
                                marginBottom: 10,
                                color: colors.primary,
                            }}>Silakan tonton video di bawah ini :</Text>
                        </View>

                        {ITEM.hasile == 'Normal' && ITEM.hasilc == 'Normal' && ITEM.hasilh == 'Normal' && ITEM.hasilp == 'Normal' && ITEM.hasilpr == 'Normal' ?

                            <FlatList data={youtube.filter(i => i.nama_kategori == 'Normal')} renderItem={({ item, index }) => {
                                return (
                                    <View style={{
                                        marginVertical: 8,
                                    }}>
                                        <Text style={{
                                            padding: 5,
                                            backgroundColor: colors.primary,
                                            color: colors.white,
                                            ...fonts.caption
                                        }}>{item.nama_kategori}</Text>
                                        <YoutubePlayer
                                            height={windowWidth / 2}
                                            videoId={item.youtube}
                                        />
                                    </View>
                                )
                            }} /> :


                            <View>
                                <FlatList data={youtube.filter(i => { return (i.nama_kategori == `Gejala Emosional (E) ${ITEM.hasile}` || i.nama_kategori == `Masalah Perilaku (C) ${ITEM.hasilc}` || i.nama_kategori == `Hiperaktivitas (H) ${ITEM.hasilh}` || i.nama_kategori == `Masalah Teman Sebaya (P) ${ITEM.hasilp}` || i.nama_kategori == `Perilaku Prososial (Pr) ${ITEM.hasilpr}`) })} renderItem={({ item, index }) => {
                                    return (
                                        <View style={{
                                            marginVertical: 8,
                                        }}>
                                            <Text style={{
                                                padding: 5,
                                                backgroundColor: colors.primary,
                                                color: colors.white,
                                                ...fonts.caption
                                            }}>{item.nama_kategori}</Text>
                                            <YoutubePlayer
                                                height={windowWidth / 2}
                                                videoId={item.youtube}
                                            />
                                        </View>
                                    )
                                }} />
                            </View>

                        }
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

            <View style={{
                paddingHorizontal: 16,
                paddingVertical: 10,
            }}><MyButton warna={colors.danger} onPress={hapus} title="Hapus Screening" />

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})