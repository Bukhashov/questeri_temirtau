import React ,{ useState } from 'react';
import { ActivityIndicator, View, Text, Dimensions, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import config from '../../../config';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const TestScreen = () => {
    const [uid, setUid] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [result, setResult] = useState(false);
    const [content, setContent] = useState([]);
    const [i, setI] = useState(0);
    const [finish, setFinish] = useState(false);
    const [numberTests, setNumberTests] = useState(0)
    const [ball, setBall] = useState(0);
    const [answers, setAnswers] = useState([]);

    const fatchData = async () => {
        try{
            let id = await AsyncStorage.getItem("uid");
            setUid(id);
            await axios.get(`${config.API_URI}/test/get/all`).then((res) => {
                console.log(res.data);
                setContent(res.data);
                setLoading(false);
            })
        }
        catch(e) {
            console.log(e);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            fatchData();
        }, [])
    )
    
    const choiceVariant = (variant) => {
        let answer = {question: content[i].question, answer: variant};
        
        setAnswers(answers.filter(item => item.question != content[i].question))
        setAnswers([...answers, answer])

        if(i != content.length-1) setI(i+1)
        if(i == content.length-2) setFinish(true);

        console.log(i);
    }

    const onPressBack = () => {
        if(i != 0) {
            setI(i-1);
            setFinish(false);
        }
    }
    const onPressRun = async () => {
        if(i != content.length-1) {
            setI(i+1)
            console.log(content.length);
            setFinish(false)
        }
        if(i == content.length-2) setFinish(true);
    }


    const onPressFinish = async () => {
        try{
            await axios.post(`${config.API_URI}/test/control`, {
                user_id: uid,
                answers: JSON.stringify(answers)
            }).then((res) => {
                setResult(true)
                setBall(res.data.count)
            })
        }catch(e){
            console.log(e)
        }
    }

    return(
        <View>
            {   isLoading ? ( <ActivityIndicator size="large" 
                    color="#000" 
                    style={{
                        flex: 1, 
                        justifyContent: 'center', 
                        flexDirection: 'row', 
                        justifyContent: 'space-around', 
                        paddingTop: 25, 
                    }} />
                ) :(
                    <View>
                        <View style={result ? {display: 'none'} : {display: 'flex'}}>
                        {
                            <View style={{ width: width, }}>
                                <View style={{marginHorizontal: 20, marginVertical: 20}}>
                                    <Text style={{fontSize: 20}}>{content[i].question}</Text>
                                </View>
                                <View>
                                    {
                                        content[i].option.map((vel) => (
                                            <View  
                                                style={{
                                                    margin: 15,
                                                    borderRadius: 8,
                                                    padding: 15,
                                                    width: width-30, 
                                                    backgroundColor: "#fff" 
                                                }}>
                                                <Text style={{textAlign: 'center'}}
                                                    onPress={() => choiceVariant(vel)}
                                                >{vel}</Text>
                                            </View>
                                        ))
                                    }
                                </View>

                                <View style={{paddingHorizontal: 25, paddingTop: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View><Text onPress={() => onPressBack()}>Artqa</Text></View>   
                                    <View><Text onPress={() => onPressRun()}>Kelesy</Text></View>                                  
                                </View>

                                <View>
                                    <TouchableOpacity onPress={() => onPressFinish()}
                                        style={ finish 
                                        ? {display: 'flex', justifyContent: 'center', flexDirection: 'row', } 
                                        : {display: 'none'}}> 
                                        <Text style={{ marginTop: 15, marginBottom: 5, paddingTop: 10,
                                            fontSize: 16, fontWeight: '500',}}>Aeaqtau</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    </View>
                        <View style={result ? {paddingTop: 25, display: 'flex', flexDirection: 'row', justifyContent: 'center'} : {display: 'none'}}>
                            <View style={{display: 'flex', }}>
                                <Text style={{padding: 15}}>Suraqtar sany</Text>
                                <Text style={{padding: 15}}>Durys jaýaptar sany</Text>
                            </View>
                            <View style={{display: 'flex', }}>
                                <Text style={{padding: 15}}>{content.length}</Text>
                                <Text style={{padding: 15}}>{ball}</Text>
                            </View>
                        </View>
                    </View>
                    
                )
            }               
        </View>
    )
}


export default TestScreen;