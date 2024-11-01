import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Image,
    Animated,
    ImageBackground,
    TouchableWithoutFeedback,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    FlatList
} from 'react-native';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyInputLogin, MyPicker, MyRadio } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color, getDataByTable, POSTDataByTable } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color, Value } from 'react-native-reanimated';
import axios from 'axios';
import moment from 'moment';
import { useToast } from 'react-native-toast-notifications';
import MyLoading from '../../components/MyLoading';
import { Icon } from 'react-native-elements';

export default function Register({ navigation, route }) {
    const [loading, setLoading] = useState(false)
    const img = new Animated.Value(0.8);
    const card = new Animated.Value(50);
    const toast = useToast();
    Animated.timing(img, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
    }).start();
    Animated.timing(card, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
    }).start();
    const [kirim, setKirim] = useState({
        api_token: api_token,
        nama_lengkap: '',
        username: '',
        password: '',
        repassword: '',

    });
    const handleDateChange = (date) => {
        console.log("Tanggal yang dipilih:", date);
        setKirim((prevState) => ({ ...prevState, tanggal_lahir: date }));
    };

    const simpan = () => {



        if (
            kirim.nama_lengkap.length === 0 &&
            kirim.username.length === 0 &&
            kirim.password.length === 0

        ) {
            toast.show('Formulir pendaftaran tidak boleh kosong', {
                type: 'warning'
            })
        } else if (kirim.nama_lengkap.length === 0) {
            toast.show('Silahkan ketikan nama lengkap', {
                type: 'warning'
            })
        }

        else if (kirim.username.length === 0) {

            toast.show('Masukan username', {
                type: 'warning'
            })
        }
        else if (kirim.password.length === 0) {

            toast.show('Masukan kata sandi kamu', {
                type: 'warning'
            })
        } else if (kirim.repassword.length === 0) {

            toast.show('Ulangi kata sandi kamu', {
                type: 'warning'
            })
        } else if (kamar.filter(i => i.cek > 0).length == 0) {

            toast.show('Silahkan pilih kelas / kamar minial 1', {
                type: 'warning'
            })

        } else {


            setLoading(true);
            POSTDataByTable('register', {
                ...kirim,
                kamar: kamar.filter(i => i.cek > 0).map(i => i.id_kamar)
            }).then(res => {
                console.log(res.data);
                if (res.data.status == 404) {
                    toast.show(res.data.message, {
                        type: 'danger'
                    })

                } else {
                    toast.show(res.data.message, {
                        type: 'success'
                    });

                    storeData('user', res.data.data)

                    navigation.replace('MainApp');

                }
            }).finally(() => {
                setLoading(false);
            })



        }
    };


    const [kamar, setKamar] = useState([])

    useEffect(() => {

        getDataByTable('kamar').then(res => {
            console.log(res.data);
            setKamar(res.data);
        })

    }, []);
    const [sama, setSama] = useState(true)




    return (
        <SafeAreaView style={{
            flex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: colors.white
        }}>
            {/* <MyHeader title="Daftar Akun" /> */}

            <ImageBackground source={require("../../assets/bglogin.png")} style={{
                flex: 1,
                width: "100%",
                height: '100%',

            }}>


                <ScrollView showsVerticalScrollIndicator={false}>



                    <View style={{
                        padding: 20,


                    }}>
                        <Image style={{
                            marginTop: '10%',
                            width: windowWidth / 1.1,
                            height: windowWidth / 1.5,
                            marginBottom: 20,
                            // resizeMode: 'contain'

                        }} source={require('../../assets/logo.png')} />

                        {/* Nama lengkap siswa */}
                        <MyInput
                            label="Nama Lengkap Musyrif"
                            placeholder="Isi Nama Lengkap Musyrif"
                            value={kirim.nama_lengkap}
                            onChangeText={(x) => setKirim({ ...kirim, nama_lengkap: x })}
                        />
                        <MyGap jarak={10} />

                        <MyInput
                            label="Username"
                            placeholder="Isi Username"
                            value={kirim.username}
                            onChangeText={(x) => setKirim({ ...kirim, username: x })}
                        />
                        <MyGap jarak={10} />
                        <MyInput
                            label="Buat Password"
                            placeholder="Isi Buat Password"
                            value={kirim.password}
                            onChangeText={(x) => setKirim({ ...kirim, password: x })}
                            secureTextEntry={true}

                        />
                        <MyGap jarak={10} />
                        <MyInput
                            label="Konfirmasi Password"
                            placeholder="Isi Konfirmasi Password"
                            value={kirim.repassword}
                            onChangeText={(x) => setKirim({ ...kirim, repassword: x })}
                            secureTextEntry={true}

                        />
                        {/* Data Kamar */}

                        <View style={{
                            marginVertical: 10,

                        }}>

                            <Text style={{
                                fontFamily: fonts.primary[700],
                                color: colors.white,
                                marginBottom: 8,
                                fontSize: 17,
                            }}>Pilih Kelas / Kamar {kamar.length}</Text>

                            <ScrollView style={{
                                borderRadius: 10,
                                backgroundColor: colors.white,
                                padding: 10,

                            }}>
                                <FlatList
                                    data={kamar}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity onPress={() => {
                                                let tmp = [...kamar];
                                                tmp[index].cek = tmp[index].cek > 0 ? 0 : 1;
                                                setKamar(tmp);

                                            }} style={{
                                                marginBottom: 10,
                                                flexDirection: 'row',
                                                alignItems: 'center'
                                            }}>
                                                <View style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    {item.cek == 0 && <Icon type='ionicon' name='ellipse-outline' color={colors.primary} size={24} />}
                                                    {item.cek == 1 && <Icon type='ionicon' name='checkmark-circle' color={colors.primary} size={24} />}
                                                </View>
                                                <Text style={{
                                                    marginLeft: 10,
                                                    fontFamily: fonts.primary[600],
                                                    color: Color.blueGray[900],
                                                }}>{item.label}</Text>
                                            </TouchableOpacity>
                                        )
                                    }}
                                />
                                <MyGap jarak={20} />
                            </ScrollView>
                        </View>

                        {/* Button register */}
                        <MyGap jarak={10} />
                        <MyButton title="Register" onPress={simpan} />

                        {/* Button back */}
                        <MyGap jarak={10} />
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
                            <View style={{ padding: 10 }}>
                                <Text style={{
                                    fontFamily: fonts.primary[500],
                                    textAlign: "center",
                                    color: colors.white,
                                    fontSize: 13

                                }}><Text style={{ fontWeight: "bold" }}>Siswa</Text> sudah memiliki akun?  Silakan <Text style={{
                                    fontWeight: 'bold'
                                }}>login</Text></Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>


                </ScrollView>
            </ImageBackground>

        </SafeAreaView >
    );
}

const styles = StyleSheet.create({});