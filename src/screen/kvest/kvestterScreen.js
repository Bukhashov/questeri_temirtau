import React ,{ useState, useEffect} from 'react';
import {ActivityIndicator, ScrollView, SafeAreaView, Text, View, Dimensions} from 'react-native';
import ContainerComponent from '../../componentes/containerComponent';
import config from '../../../config';
import axios from 'axios';
import Button_tag from '../../componentes/button_tag';
import { useFocusEffect } from '@react-navigation/native';

const tags = ["barlyǵy", "murajaylar", "Teatr", "Kitaphana", "Aýrýhana"];
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const KvestterScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [containers, setContainers] = useState([]);
    const [currentTag, setCurrentTag] = useState(tags[0]);
    const [containerCopy, setContainerCopy] = useState([]);

    const featData = async () => {
        try{
            await axios.get(`${config.API_URI}/questeri/get/Temirtau/all`)
            .then((response) => {
                console.log(response.data);
                setContainers(response.data);
                setContainerCopy(response.data);
                setLoading(false)
            })
        }catch(e){
            console.log(e)
        }
    }
    
    useFocusEffect(
        React.useCallback(()=> {
            featData();
        }, [])
    )

    const ChangeCurrentTag = (newTag) => {
        setCurrentTag(newTag)
        filterContent(newTag)
    }
    const filterContent = (newTag) => {
        if(newTag == "barlyǵy") {
            setContainers(containerCopy);
        }else{
            let data = containerCopy.filter((item) => item.tag === newTag).map(({_id, tag, title, imgPath, description, city, price, auther}) => ({_id, tag, title, imgPath, description, city, price, auther}))
            setContainers(data);
        }   
    }

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
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={{ padding: 5, display: 'flex', flexDirection: 'row', alignItems: 'center', }} >
                                    {
                                        tags.map((tag) => (
                                            <Button_tag
                                                id={tag}
                                                key={tag} 
                                                tag={tag} 
                                                changeCurrentTag={ChangeCurrentTag} 
                                            /> 
                                        ))
                                    }
                                </View>
                            </ScrollView>
                        </View>


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