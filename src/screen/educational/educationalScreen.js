import React ,{ useState } from 'react';
import { ActivityIndicator, ScrollView, SafeAreaView, Image, Text, View, Dimensions} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import config from '../../../config';
import axios from 'axios';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const EducationalScreen = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [content, setContent] = useState([]);

    const fatchData = async () => {
        try{
            await axios.get(`${config.API_URI}/edu/get/${props.route.params.content.id}`).then((res) => {
                setContent(res.data);
                setLoading(false);
            });
        }
        catch(e){
            console.log(e);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            fatchData();
        }, [])
    )

    return (
        <View key={"questeries_educationls" + props.route.params.content.id}>
            {
                isLoading ? (
                    <ActivityIndicator 
                    size="large" 
                    color="#000" 
                    style={{flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around', paddingTop: 25, }} />
                ) : (
                    <SafeAreaView>
                        <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
                            <View>
                                <Image style={{width: width, height: 180}}
                                source={{ uri: content.img }} />
                            </View>

                            <View>
                                <View style={{ paddingVertical: 15, width: width, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}><Text style={{fontSize: 17, fontWeight: 600}}>{content.name}</Text></View>
                                <View style={{ width: width, paddingHorizontal: 15,}}>
                                    <Text>{content.description}</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                )
            }
        </View>
    )
}

export default EducationalScreen;