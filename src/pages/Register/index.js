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
import { MyButton, MyCalendar, MyFileUploader, MyGap, MyHeader, MyImageUpload, MyInput, MyInputLogin, MyPicker, MyRadio } from '../../components';
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
        telepon: '',
        email: '',
        nomor_ktp: '',
        foto_ktp: 'https://zavalabs.com/nogambar.jpg',
        lembaga: '',
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
            kirim.telepon.length === 0 &&
            kirim.nomor_ktp.length === 0 &&
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
        } else if (kirim.telepon.length == 0) {

            toast.show('Masukan nomor telepon', {
                type: 'warning'
            })

        } else {


            // setLoading(true);
            POSTDataByTable('register', kirim).then(res => {
                console.log(res.data);
                if (res.data.status == 404) {
                    toast.show(res.data.message, {
                        type: 'danger'
                    })

                } else {
                    toast.show(res.data.message, {
                        type: 'success'
                    });

                    // storeData('user', res.data.data)

                    navigation.replace('Login');

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

            <ImageBackground source={require("../../assets/bgsplash.png")} style={{
                flex: 1,
                width: "100%",
                height: '100%',

            }}>


                <ScrollView showsVerticalScrollIndicator={false}>
                    <Image style={{
                        alignSelf: 'center',
                        marginTop: '10%',
                        width: windowWidth / 1.3,
                        height: windowWidth / 2,
                        resizeMode: 'contain',
                        // marginBottom: 20,
                        // resizeMode: 'contain'

                    }} source={require('../../assets/logo.png')} />


                    <View style={{
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        padding: 20,
                        backgroundColor: colors.white,


                    }}>
                        <Text style={{

                            ...fonts.headline2,
                            color: colors.secondary,
                            textAlign: 'center'
                        }}>Daftar</Text>
                        <Text style={{
                            marginBottom: 20,
                            ...fonts.body3,
                            color: Color.blueGray[400],
                            textAlign: 'center'
                        }}>Silahkan lengkapi data dibawah ini</Text>

                        {/* Nama lengkap siswa */}
                        <MyInput
                            label="Nama Lengkap"
                            placeholder="Isi Nama Lengkap"
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
                            label="Email"
                            placeholder="Isi Email"
                            value={kirim.email}
                            onChangeText={(x) => setKirim({ ...kirim, email: x })}
                        />
                        <MyGap jarak={10} />
                        <MyInput
                            label="Telepon"
                            keyboardType='phone-pad'
                            placeholder="Isi Telepon"
                            value={kirim.telepon}
                            onChangeText={(x) => setKirim({ ...kirim, telepon: x })}
                        />
                        <MyGap jarak={10} />
                        <MyInput
                            maxLength={16}
                            keyboardType='number-pad'
                            label="Nomor KTP"
                            placeholder="Isi Nomor KTP"
                            value={kirim.nomor_ktp}
                            onChangeText={(x) => setKirim({ ...kirim, nomor_ktp: x })}
                        />
                        <MyGap jarak={10} />
                        <MyImageUpload onFileChange={x => setKirim({
                            ...kirim,
                            foto_ktp: x
                        })} label="Foto KTP" />
                        <MyGap jarak={10} />
                        <MyInput
                            label="Lembaga / Instansi"
                            placeholder="Isi Lembaga / Instansi"
                            value={kirim.lembaga}
                            onChangeText={(x) => setKirim({ ...kirim, lembaga: x })}
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


                        {/* Button register */}
                        <MyGap jarak={20} />
                        <MyButton title="Register" onPress={simpan} />

                        {/* Button back */}
                        <MyGap jarak={10} />
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
                            <View style={{ padding: 10 }}>
                                <Text style={{
                                    ...fonts.subheadline3,
                                    textAlign: "center",
                                    color: colors.white,


                                }}>Sudah memiliki akun?  Silakan <Text style={{
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