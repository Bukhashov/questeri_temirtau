import React ,{ useState, useEffect} from 'react';
import {ActivityIndicator, ScrollView, SafeAreaView, Image, TouchableOpacity, Text, View, Dimensions} from 'react-native';
import config from '../../../config';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const EducationalsScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [containers, setContainers] = useState([]);
    
    const fatchData = async ()=> {
        try {
            await axios.get(`${config.API_URI}/edu/get/all`).then(res => {
                setContainers(res.data);
                console.log(res.data);
                setLoading(false);
            })        
        }
        catch(e){
            console.log(e);
        }
    }

    useFocusEffect(
        React.useCallback(()=> {
            fatchData();    
        }, [])
    )
    
    return (
        <View key={"questeries_educationls"}>
            {
                isLoading ? (
                    <ActivityIndicator 
                        size="large" 
                        color="#000" 
                        style={{flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around', paddingTop: 25, }} />
                ) : (
                    <SafeAreaView>
                        <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
                            {
                                containers.map((vel) => (                                    
                                        <TouchableOpacity 
                                            key={"questeries_educationls_container"+vel.id}
                                            onPress={() => navigation.navigate("Educational", {
                                                content: {
                                                    id: vel._id
                                                }
                                            })}
                                        >
                                            <View  style={{
                                                backgroundColor: "#fff",
                                                width: width-20,
                                                paddingVertical: 25,
                                                paddingHorizontal: 15,
                                                // height: 150,
                                                marginHorizontal: 10,
                                                marginVertical: 10,
                                                borderRadius: 15,
                                                display: 'flex', flexDirection: 'row', alignItems: 'center',
                                            }}>
                                                <View style={{ marginLeft: 8, marginRight: 8 }}>
                                                    <Image style={{ width: 100, height: 100 }} source={{uri: vel.icon}} />
                                                </View>
                                                <View style={{ display: 'flex' , }}>
                                                    <Text style={{width: width-130, fontSize: 18, fontWeight: 400 }}>{vel.name}</Text>
                                                </View>
                                            </View>
                                               
                                        </TouchableOpacity>                                    
                                ))
                            }
                        </ScrollView>
                    </SafeAreaView>
                )
            }
        </View>
    )
}

export default EducationalsScreen;