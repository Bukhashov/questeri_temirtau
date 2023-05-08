import React from 'react';
import {Text, View, ScrollView, Image, Dimensions} from 'react-native';
var width = Dimensions.get('window').width; //full width

// 
// images   type    [] map
// title    type    string
//

export default function SlaiderImages(props) {
    let count = 1;
    return(
        <View key={props.id}>
            <ScrollView style={{ position: 'relative', }} horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                    props.images.map((image) => <Image key={"image_slaider__keys_id_"+props.id+(count+=1)} style={{ width: width, height: 220 }} source={{ uri: image }}/> )
                }
            </ScrollView>
            
            <View style={{ position: 'absolute', width: width, display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: 5, top: 170, }}>  
                <Text style={{ fontSize: 20, fontWeight: '400', color: 'white' }}>{props.title}</Text>
            </View>
        </View>
    )
} 