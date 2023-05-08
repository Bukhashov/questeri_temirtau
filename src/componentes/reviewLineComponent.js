import React from 'react';
import {Text, View} from 'react-native';

const ReviewsLineComponent = (props) => {
    let ReviewsLineWidth = (220/100)*(props.line * 10);

    return(
        <View key={"key_content_reviews_line__number"+props.number+"_line_"+props.line} style={{ padding: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
            <Text style={{ paddingTop: 1, paddingBottom: 1, paddingLeft: 0, paddingRight: 8 }}>{props.number}</Text>
            <View style={{
                paddingTop: 1, paddingBottom: 1, paddingLeft: 0, paddingRight: 0,
                width: 220, height: 3, 
                position: 'relative', 
                backgroundColor: "#fff", 
            }}>
                <View style={{ 
                    position: 'absolute', 
                    width: ReviewsLineWidth, height: 3, 
                    backgroundColor: "#000" 
                }} />
            </View>
        </View>
    )
} 

export default ReviewsLineComponent;