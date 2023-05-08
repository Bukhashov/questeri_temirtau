import React ,{ useState, useEffect} from 'react';
import {ActivityIndicator, ScrollView, SafeAreaView, Text, View, Dimensions} from 'react-native';
import ContainerComponent from '../../componentes/containerComponent';
import config from '../../../config';
import axios from 'axios';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const KvestterScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [containers, setContainers] = useState([]);

    const featData = async () => {
        try{
            await axios.get(`${config.API_URI}/questeri/get/Temirtau/all`)
            .then((response) => {
                console.log(response.data);
                setContainers(response.data)
                setLoading(false)
            })
        }catch(e){
            console.log(e)
        }
    }
    
    useEffect(() => {
        featData()
    }, [])

    return(
        <View key={"questeries_Map"}>
            {
                isLoading ? (
                    <ActivityIndicator 
                        size="large" 
                        color="#000" 
                        style={{flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around', paddingTop: 25, }} />
                ) : (
                    <SafeAreaView>
                        <View>
                            <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
                                <View style={{justifyContent: 'center'}}>
                                    { 
                                        containers.map((vel) => (
                                            <ContainerComponent
                                                key={vel._id}
                                                id={vel._id}
                                                navigation={navigation}
                                                title={vel.title}
                                                images={vel.imgPath}
                                                description={vel.description}
                                                tag={vel.tag}
                                                city={vel.city}
                                                price={vel.price}
                                                auther={vel.auther}
                                            />
                                        ))
                                    }
                                </View>
                            </ScrollView>
                        </View>
                </SafeAreaView>
            )}
        </View>
    )
}



export default KvestterScreen;