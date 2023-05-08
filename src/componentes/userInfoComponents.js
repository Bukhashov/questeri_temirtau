import React from 'react';
import { Text, View, Dimensions } from 'react-native';
var width = Dimensions.get('window').width; //full width

// 
// images   type    [] map
// title    type    string
//

export default function UserInfoComponent(props) {
    return(
        <View key={"Account_UserInfo_key__option_"+props.option} style={{ paddingTop: 20, }}>
            <View style={{ paddingBottom: 8, paddingLeft: 22, paddingRight: 25, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{ paddingBottom: 3, color: '#616A6B'}}>{props.option}</Text>
                <Text>{props.info}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ borderTopWidth: 1, width: width-30, }} />
            </View>
        </View>
    )
}