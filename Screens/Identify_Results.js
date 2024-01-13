import React, {useState, useEffect} from "react"
import { Image, View,Text, SafeAreaView, StyleSheet, ActivityIndicator} from 'react-native'
import { IP_ADDRESS } from '@env' 

const IDResults = ({route}) => {
    let loading = true
    {/*Import the photos taken from the last page as well as the organs selected*/}
    const { organs } = route.params;
    const { Photos } = route.params;

    {/*The last picture to display*/}
    const { display } = route.params;

    const [data, setData] = useState(null)
    const [dataprocessed, setDataprocessed] = useState(false)
    const [datafetched, setDatafetched] = useState(false)
    const [combinedObj, setCombinedObj] = useState()

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(combinedObj),
        headers: {
            'Content-Type': 'application/json',
        }
    }

    useEffect(() => {
        const newPhotoObj = {"Photos" : Photos};
        setCombinedObj(Object.assign({}, newPhotoObj, organs))
        setDataprocessed(true)
    }, [])

    useEffect(() => {
        if (dataprocessed){
            fetch (`http://${IP_ADDRESS}/model`, requestOptions)
                .then(response => response.json()) 
                .then(response =>{
                    setData(response)
                    setDatafetched(true)
                })
        }
    }, [dataprocessed])

    if (datafetched){
        loading = false
    }

    if (loading){
        return(
            <SafeAreaView style={styles.container}>
                <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                    <ActivityIndicator size="large" color='#ebebeb'/>
                </View>
            </SafeAreaView>
        )
    }
    return(
        <SafeAreaView style={styles.container}>
            <View style={{flex:0.3, alignItems:'center', justifyContent:'center', backgroundColor: 'white', top: 20}}> 
                <Text style={{fontSize: 70, fontWeight: 'bold', color: '#93c7a1'}}>
                    Results 
                </Text>
            </View>
            <View style={{alignItems: 'center', top: 75}}>
                <Image style={{width:230, height: 310}} source={{uri: "data:image/jpeg;base64," + display }}/>
            </View>
            <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 35, fontWeight: 'bold', color: 'white', top: 110}}>
                    Your plant is a ...
                </Text>
            </View>
            <View style={{flex:0.5, alignItems: 'center', justifyContent: 'center', top: 60}}>
                <Text style={{fontSize: 28, fontWeight: 'bold', color: 'white'}}>
                    {/*Indexing based on API documentation. "data" contains what is returned from the API */}
                    {data['bestMatch']}
                </Text>
            </View>
        </SafeAreaView>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#93c7a1',
    },  
    Image: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default IDResults
