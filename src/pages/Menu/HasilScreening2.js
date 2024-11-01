import { View, Text, ScrollView, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'

import { MyButton, MyHeader } from '../../components'
import { Color, colors, fonts, POSTDataByTable, windowWidth } from '../../utils'
import YoutubePlayer from "react-native-youtube-iframe";
import { getData } from '../../utils/localStorage';
import moment from 'moment';
export default function HasilScreening2({ navigation, route }) {

    const ITEM = route.params;
    const dataISI = ITEM.soal2;
    const [youtube, setYoutube] = useState([]);
    const [user, setUser] = useState({});


    const UMUR = moment().diff(user.tanggal_lahir, 'year');
    console.log('umur', UMUR)


    let ARR = [null];
    dataISI.map(i => {
        ARR.push(i == 'Benar' ? 2 : i == 'Agak' ? 1 : 0)
    });

    let nilaiE = ARR[3] + ARR[8] + ARR[13] + ARR[16] + ARR[24];
    let nilaiC = ARR[5] + ARR[7] + ARR[12] + ARR[18] + ARR[22];
    let nilaiH = ARR[2] + ARR[10] + ARR[15] + ARR[21] + ARR[25];
    let nilaiP = ARR[6] + ARR[11] + ARR[14] + ARR[19] + ARR[23];
    let nilaiPR = ARR[1] + ARR[4] + ARR[9] + ARR[17] + ARR[20];
    let nilaiTotal = (nilaiE + nilaiC + nilaiH + nilaiP);



    let hasilE = 'test';
    let hasilC = 'test';
    let hasilH = 'test';
    let hasilP = 'test';
    let hasilPR = 'test';
    let hasilTotal = 'test';

    // RUMUS E
    if (UMUR >= 6 && UMUR <= 10) {

        // TOTAL

        if (nilaiTotal >= 0 && nilaiTotal <= 13) {
            hasilTotal = 'Normal';
        } else if (nilaiTotal >= 14 && nilaiTotal <= 15) {
            hasilTotal = 'Borderline';
        } else if (nilaiTotal >= 16 && nilaiTotal <= 40) {
            hasilTotal = 'Abnormal';
        }

        if (nilaiE >= 0 && nilaiE <= 3) {
            hasilE = 'Normal';
        } else if (nilaiE == 4) {
            hasilE = 'Borderline';
        } else if (nilaiE >= 5 && nilaiE <= 10) {
            hasilE = 'Abnormal';
        }

        if (nilaiC >= 0 && nilaiC <= 2) {
            hasilC = 'Normal';
        } else if (nilaiC == 3) {
            hasilC = 'Borderline';
        } else if (nilaiC >= 4 && nilaiC <= 10) {
            hasilC = 'Abnormal';
        }

        if (nilaiH >= 0 && nilaiH <= 5) {
            hasilH = 'Normal';
        } else if (nilaiH == 6) {
            hasilH = 'Borderline';
        } else if (nilaiH >= 7 && nilaiH <= 10) {
            hasilH = 'Abnormal';
        }

        if (nilaiP >= 0 && nilaiP <= 2) {
            hasilP = 'Normal';
        } else if (nilaiP == 3) {
            hasilP = 'Borderline';
        } else if (nilaiP >= 4 && nilaiP <= 10) {
            hasilP = 'Abnormal';
        }


        if (nilaiPR >= 6 && nilaiPR <= 10) {
            hasilPR = 'Normal';
        } else if (nilaiPR == 5) {
            hasilPR = 'Borderline';
        } else if (nilaiPR >= 0 && nilaiPR <= 4) {
            hasilPR = 'Abnormal';
        }

    } else if (UMUR >= 11) {

        if (nilaiTotal >= 0 && nilaiTotal <= 15) {
            hasilTotal = 'Normal';
        } else if (nilaiTotal >= 16 && nilaiTotal <= 19) {
            hasilTotal = 'Borderline';
        } else if (nilaiTotal >= 20 && nilaiTotal <= 40) {
            hasilTotal = 'Abnormal';
        }


        if (nilaiE >= 0 && nilaiE <= 5) {
            hasilE = 'Normal';
        } else if (nilaiE == 6) {
            hasilE = 'Borderline';
        } else if (nilaiE >= 7 && nilaiE <= 10) {
            hasilE = 'Abnormal';
        }

        if (nilaiC >= 0 && nilaiC <= 3) {
            hasilC = 'Normal';
        } else if (nilaiC == 4) {
            hasilC = 'Borderline';
        } else if (nilaiC >= 5 && nilaiC <= 10) {
            hasilC = 'Abnormal';
        }

        if (nilaiH >= 0 && nilaiH <= 5) {
            hasilH = 'Normal';
        } else if (nilaiH == 6) {
            hasilH = 'Borderline';
        } else if (nilaiH >= 7 && nilaiH <= 10) {
            hasilH = 'Abnormal';
        }

        if (nilaiP >= 0 && nilaiP <= 3) {
            hasilP = 'Normal';
        } else if (nilaiP >= 4 && nilaiP <= 5) {
            hasilP = 'Borderline';
        } else if (nilaiP >= 6 && nilaiP <= 10) {
            hasilP = 'Abnormal';
        }


        if (nilaiPR >= 6 && nilaiPR <= 10) {
            hasilPR = 'Normal';
        } else if (nilaiPR == 5) {
            hasilPR = 'Borderline';
        } else if (nilaiPR >= 0 && nilaiPR <= 4) {
            hasilPR = 'Abnormal';
        }
    }


    useEffect(() => {
        getData('user').then(u => setUser(u));
        POSTDataByTable('youtube_all').then(res => {
            console.log(res.data);
            setYoutube(res.data);
        })
    }, []);
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader title="Hasil Screening" />

            <ScrollView>
                <View style={{
                    padding: 20,

                }}>
                    {hasilC == 'Normal' && hasilE == 'Normal' && hasilC == 'Normal' && hasilP == 'Normal' && hasilPR == 'Normal' ?
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image source={require('../../assets/done_icon.png')} style={{
                                width: windowWidth / 2,
                                height: windowWidth / 2,
                                marginBottom: 20
                            }} />
                            <Text style={{
                                fontFamily: fonts.primary[600],
                                fontSize: 20,
                                textAlign: "center",
                                color: colors.success,
                                marginBottom: 20,
                            }}>Selamat kamu tidak mengalami gangguan mental emosional yang bermakna, yuk ikuti past intervensi ini agar kamu semakin sehat</Text>
                        </View>


                        : <View style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image source={require('../../assets/warning_red.png')} style={{
                                width: windowWidth / 2,
                                height: windowWidth / 2,
                                marginBottom: 20
                            }} />
                            <Text style={{
                                fontFamily: fonts.primary[600],
                                fontSize: 20,
                                textAlign: "center",
                                color: colors.danger,
                                marginBottom: 20,
                            }}>Kamu mengalami gejala gangguan mental emosional segera menghubungi petugas untuk mendapatkan bantuan.</Text>
                        </View>}


                    <Text style={{
                        ...fonts.headline3,
                        color: colors.primary,
                        textAlign: 'center',
                        marginBottom: 10,
                    }}>HASIL SCREENING LANJUTAN</Text>

                    <Text style={{
                        ...fonts.headline3,
                        color: colors.primary,
                        textAlign: 'center',
                        marginBottom: 10,
                    }}>Usia {UMUR} Tahun</Text>

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
                                ...fonts.headline5,
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
                            }}>{hasilE}</Text>
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
                            }}>{hasilC}</Text>
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
                            }}>{hasilH}</Text>
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
                            }}>{hasilP}</Text>
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
                            }}>{hasilTotal}</Text>
                        </View>
                        <View style={{
                            padding: 10,
                            backgroundColor: colors.primary
                        }}>
                            <Text style={{
                                ...fonts.headline5,
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
                            }}>{hasilPR}</Text>
                        </View>
                    </View>


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

                    {hasilC == 'Normal' && hasilE == 'Normal' && hasilC == 'Normal' && hasilP == 'Normal' && hasilPR == 'Normal' ?

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
                            <FlatList data={youtube.filter(i => { return (i.nama_kategori == `Gejala Emosional (E) ${hasilE}` || i.nama_kategori == `Masalah Perilaku (C) ${hasilC}` || i.nama_kategori == `Hiperaktivitas (H) ${hasilH}` || i.nama_kategori == `Masalah Teman Sebaya (P) ${hasilP}` || i.nama_kategori == `Perilaku Prososial (Pr) ${hasilPR}`) })} renderItem={({ item, index }) => {
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


                    <View style={{
                        paddingTop: 20
                    }}>
                        <MyButton onPress={() => navigation.navigate('Screening')} title="Selesai" />
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}