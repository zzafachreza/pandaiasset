import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, POSTDataByTable, colors, fonts, getDataByTable, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL, getData } from '../../utils/localStorage';
import moment from 'moment';
import { MyButton, MyHeader, MyRadio } from '../../components';
import { useToast } from 'react-native-toast-notifications';
export default function IsiScreeningLanjutan({ navigation, route }) {
    const ITEM = route.params;

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const getDataTransaksi = () => {

        getData('user').then(u => setUser(u))
        // setLoading(true);
        getDataByTable('soal_lanjutan').then(res => {
            console.log(res.data);
            setData(res.data)
        })
    }

    const toast = useToast();

    const simpan = () => {


        const UMUR = moment().diff(user.tanggal_lahir, 'year');
        console.log('umur', UMUR)


        let ARR = [null];
        data.map(i => i.nilai).map(i => {
            ARR.push(i == 'Benar' ? 2 : i == 'Agak' ? 1 : 0)
        });

        console.log(ARR);

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


        console.log({
            ...ITEM,
            hasile_nilai: nilaiE,
            hasilc_nilai: nilaiC,
            hasilh_nilai: nilaiH,
            hasilp_nilai: nilaiP,
            hasilpr_nilai: nilaiPR,
            hasiltotal_nilai: nilaiTotal,
            hasile: hasilE,
            hasilc: hasilC,
            hasilh: hasilH,
            hasilp: hasilP,
            hasilpr: hasilPR,
            hasiltotal: hasilTotal,

            soal2: data.map(i => i.nilai),

        })

        POSTDataByTable('insert_hasil', {
            ...ITEM,
            hasile_nilai: nilaiE,
            hasilc_nilai: nilaiC,
            hasilh_nilai: nilaiH,
            hasilp_nilai: nilaiP,
            hasilpr_nilai: nilaiPR,
            hasiltotal_nilai: nilaiTotal,
            hasile: hasilE,
            hasilc: hasilC,
            hasilh: hasilH,
            hasilp: hasilP,
            hasilpr: hasilPR,
            hasiltotal: hasilTotal,

            soal2: data.map(i => i.nilai),

        }).then(res => {
            console.log(res.data);
            if (res.data.status == 200) {
                toast.show(res.data.message, {
                    type: 'success'
                });
                navigation.navigate('HasilScreening2', {
                    ...ITEM,
                    soal2: data.map(i => i.nilai)
                })
            }
        })





    }

    useEffect(() => {
        getDataTransaksi();
    }, []);

    const __renderItem = ({ item, index }) => {
        return (
            <View style={{
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
                            <MyRadio horizontal value={item.nilai} onPress={(x) => {
                                let tmp = [...data];
                                tmp[index].nilai = x;
                                setData(tmp)
                            }} nolabel options={['Tidak', 'Agak', 'Benar']} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }



    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <MyHeader title="Isi Screening" onPress={() => navigation.goBack()} />
            {!loading &&
                <View style={{
                    flex: 1,
                }}>
                    <Text style={{
                        marginVertical: 10,
                        textAlign: 'center',
                        ...fonts.headline2,
                        color: colors.primary,
                    }}>
                        Screening Lanjutan
                    </Text>
                    <FlatList data={data} showsVerticalScrollIndicator={false} renderItem={__renderItem} />

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
            }}><MyButton onPress={simpan} title="Simpan" />

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})