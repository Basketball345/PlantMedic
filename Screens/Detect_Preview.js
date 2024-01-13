import React from "react"
import { Image, View,Text, SafeAreaView, StyleSheet, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Preview = ({navigation, route}) => {
    const { base64 } = route.params;
    return (
        <SafeAreaView style={{flex:1, backgroundColor: '#93c7a1'}}>
            <View style={{flex:0.5, backgroundColor: '#93c7a1',  alignItems: 'center'}}>
                <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black'}}>
                    Detection
                </Text>
            </View>
            <Image style={styles.container} source={{uri: "data:image/jpeg;base64," + base64 }}/>
            <View style={{flex: 1, backgroundColor: '#93c7a1', justifyContent:'center', alignItems: 'center'}}>
                <View style={styles.backbutton}>
                    <TouchableOpacity onPress={() => navigation.navigate("Camera")}> 
                        <Text style={{fontWeight: 'bold', fontSize: 30, color: 'green', textAlign: 'center', justifyContent: 'center', top: 16, right: 3}}> Back </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.analyzebutton}>
                    <TouchableOpacity onPress={() => navigation.navigate("Results", {base64: base64})}> 
                        <Text style={{fontWeight: 'bold', fontSize: 30, color: 'green', textAlign: 'center', top: 16, right: 3}}> Scan </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 6, 
        alignItems: 'center',
        justifyContent: 'center',
    },
    backbutton: {
        position: 'absolute',
        backgroundColor: "white",
        width: 120,
        height: 70,
        borderRadius: 50,
        left: Dimensions.get('window').width * 0.16,

    },
    analyzebutton: {
        position: 'absolute',
        backgroundColor: "white",
        width: 120,
        height: 70,
        borderRadius: 50, 
        left: Dimensions.get('window').width * 0.54,
    }
})

export default Preview
