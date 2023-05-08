import React ,{ useState, useEffect} from 'react';
import { Image, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserInfo from '../../componentes/userInfoComponents';

var width = Dimensions.get('window').width; 

const ProfileScreen = ({navigation}) => {
    const [uid, setUid] = useState("")
    const [userFullName, setUserFullName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userBalance, setUserBalance] = useState(0);
    const [userCity, setUserCity] = useState("Karaganda");

    const imgIconUri = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";

    useFocusEffect(
        React.useCallback(() => {
            async function userinfo(){
                await AsyncStorage.getItem("uid").then((data) => {
                    if(data == "" || data == null) navigation.navigate('Singin')
                    setUid(data)
                })
                await AsyncStorage.getItem("fullname").then((data) => {
                    setUserFullName(data)
                })
                await AsyncStorage.getItem("email").then((data) => {
                    setUserEmail(data)
                })
                await AsyncStorage.getItem("balance").then((data) => {
                    setUserBalance(data);
                })
            }
            userinfo()
        }, [])
    )
 
    const onPressLogOut = async () => {
        await AsyncStorage.removeItem("uid")
        await AsyncStorage.removeItem("fullname")
        await AsyncStorage.removeItem("email")

        navigation.navigate('singin')
        return
    }
    
    let userInf = [['Tolyq ataýy', userFullName], ['Email', userEmail], ['Qala', userCity], ['Ball', userBalance]]

    return(
        <View key={"navigator_account_main_acc"}>
            <View style={{ paddingTop: 20, }}>
                {/* user image */}
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Image style={{ width: 140, height: 140, borderRadius: 60, }} source={{uri: imgIconUri }} />
                </View>
                {/* user info */}
                <View style={{ }}>
                {
                    userInf.map((inf) =>  <UserInfo key={"Account_UserInfo__"+inf[1]+inf[0]} option={inf[0]} info={inf[1]} /> )
                }
                </View>
                
                {/* log out */}
                <View style={{width: width, display: 'flex', justifyContent: 'center', flexDirection: 'row', }}>
                    <TouchableOpacity onPress={()=> onPressLogOut()}>
                        <View style={{ padding: 15, bottom: -220, }}>
                            <Text >júıeden shyǵý</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ProfileScreen;