import React from "react";
import { View, Text, TextInput, Dimensions, SafeAreaView, ScrollView  } from "react-native";
import axios from "axios";
import config from "../../../config";
import { useFocusEffect } from "@react-navigation/native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const ChatScreen = () => {
    const [newMassage, setNewMassage] = React.useState("");
    const [allMassage, setAllMassage] = React.useState([]);

    const onPressNewMassage = (vel) => {
        setNewMassage(vel)
    }

    const getAllMassages = async () => {
        try {
            axios.get(`${config.API_URI}/chat/all`).then(response => {
                setAllMassage(response.data);
            })
        }
        catch(e){
            console.log(e);
        }
    }

    const onPressAddNewMassage = async () => {
        try {
            await axios.post(`${config.API_URI}/chat/add`, {
                uid: "22",
                massage: newMassage,
            })
            setNewMassage("");
            getAllMassages();
        }
        catch(e){
            console.log(e);
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            getAllMassages();
        }, []) 
    )
    
    return (
        <View
            style={{ height: height-230 }}
        >
            <SafeAreaView style={{

                    }}>
                    <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
                        <View
                            style={{
                                paddingHorizontal: 15,
                            }}
                        >
                        {
                            allMassage.map((msg)=>(
                                <View key={msg._id}
                                    style={{ }}
                                >
                                
                                    <Text style={{
                                        padding: 8,
                                        margin: 5,
                                        color: "#000",
                                        borderRadius: 8,
                                        backgroundColor: "#fff",
                                    }}>
                                        {msg.massage}</Text>
                                </View>
                            ))
                        }
                        </View>
                        
                    </ScrollView>

           
            </SafeAreaView>
           
            <View style={{ 
               
               width: width,
               position: 'relative',
               height: 80,
               bottom: 0,
               display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>                
               
               
               <View>
                   <TextInput
                       numberOfLines={1} 
                       maxLength={5000}
                       onChangeText={vel => onPressNewMassage(vel)} 
                       value={newMassage}
                       style={{ 
                           width: 230, height: 32, 
                           padding: 8, 
                           borderColor: '#000', borderWidth: 1, 
                           borderTopWidth: 0,
                           borderLeftWidth: 0,
                           borderRightWidth: 0,
                           // borderRadius: 8,

                       }}
                   />
               </View>
               <View>
                   <Text style={{
                       marginLeft: 5,
                       backgroundColor: "#fff",
                       paddingHorizontal: 35,
                       paddingVertical: 10,
                       borderRadius: 10,
                   }}
                       onPress={() => onPressAddNewMassage()}
                   >jiberý</Text>
               </View>
               
           </View>
            
        </View>
    )
}
export default ChatScreen;