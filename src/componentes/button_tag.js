import React from 'react';
import {Button, View} from 'react-native';

export default function Button_tag(props) {
    return(
        <View key={"button_tag__title_"+props.id} 
            style={{padding: 5, 
            flexDirection: 'row', 
            alignItems: 'center'}}
            >
            <Button color="#000" 
                title={'#'+props.tag} 
                key={props.tag.toString()} 
                onPress={()=> props.changeCurrentTag(props.tag) 
            } />
        </View>
    )
}