import React, {useState, useEffect} from "react"
import { Image, View,Text, SafeAreaView, StyleSheet, ActivityIndicator} from 'react-native'
import { IP_ADDRESS } from '@env'
const Results = ({route}) => {
    let loading = true

    const { base64 } = route.params;

    const [prediction, setPrediction] = useState();
    const [plantname, setPlantname] = useState({plant: ""})
    const [name, setName] = useState({condition: ""})

    {/*A JSON object to send to the back-end, which will interpret it as a python dictionary */}
    var body = { "user_image":base64}
    const requestOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    }

    {{/*Next line forces the useEffect to run only once previous pre-processing has been finished */}}
    const [ready, setReady] = useState(true)
    useEffect(() => {
        if (ready){
            fetch (`http://${IP_ADDRESS}/model`, requestOptions)
                .then(response => response.json()) 
                .then(data => setPrediction(data.result))
        }
    }, [ready])

    {/*Correctly format the predictions from the API for display to the user*/}
    useEffect(() => {
        if (prediction == 'Apple___Apple_scab') {
            setPlantname({plant: 'Apples'})
            setName({condition: 'have Apple Scab'})  
        } else if (prediction == 'Apple___Black_rot'){
            setPlantname({plant: 'Apples'})
            setName({condition: 'have Black rot'})
        } else if (prediction == 'Apple___Cedar_apple_rust'){
            setPlantname({plant: 'Apples'})
            setName({condition: 'have Cedar Apple Rust'})
        } else if (prediction == 'Apple___healthy'){
            setPlantname({plant: 'Apples'})
            setName({condition: 'are Healthy!'})
        } else if (prediction == 'Cherry_(including_sour)___Powdery_mildew'){
            setPlantname({plant: 'Cherries'})
            setName({condition: 'have Powdery Mildew'})
        } else if (prediction == 'Cherry_(including_sour)___healthy'){
            setPlantname({plant: 'Cherries'})
            setName({condition:'are Healthy!'}) 
        } else if (prediction == 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot'){
            setPlantname({plant: 'Corn'})
            setName({condition: 'have Cercospora Leaf Spot'})
        } else if (prediction == 'Corn_(maize)___Common_rust_'){
            setPlantname({plant: 'Corn'})
            setName({condition: 'have Common Rust'}) 
        } else if (prediction == 'Corn_(maize)___Northern_Leaf_Blight'){
            setPlantname({plant: 'Corn'})
            setName({condition: 'have Northern Leaf Blight'})
        } else if (prediction == 'Corn_(maize)___healthy'){
            setPlantname({plant: 'Corn'})
            setName({condition: 'are Healthy'})
        }else if (prediction == 'Grape___Black_rot'){
            setPlantname({plant: 'Grapes'})
            setName({condition: 'have Black Rot'})
        }else if (prediction == 'Grape___Leaf_blight_(areariopsare_Leaf_Spot)'){
            setPlantname({plant: 'Grapes'})
            setName({condition: 'have areariopsare Leaf Spots'})
        }else if (prediction == 'Grape___Esca_(Black_Measles)'){
            setPlantname({plant: 'Grapes'})
            setName({condition: 'have Black_Measles'})
        }else if (prediction == 'Grape___healthy'){
            setPlantname({plant: 'Grapes'})
            setName({condition: 'are Healthy!'})
        }else if (prediction == 'Peach___Bacterial_spot'){
            setPlantname({plant: 'Peaches'})
            setName({condition: 'have Bacterial Spots'})
        }else if (prediction == 'Peach___healthy'){
            setPlantname({plant: 'Peaches'})
            setName({condition: 'are Healthy!'})
        }else if (prediction == 'Pepper,_bell___Bacterial_spot'){
            setPlantname({plant: 'Peppers'})
            setName({condition: 'have Bacterial Spots'})
        }else if (prediction == 'Pepper,_bell___healthy'){
            setPlantname({plant: 'Peppers'})
            setName({condition: 'are Healthy'})
        }else if (prediction == 'Potato___Early_blight'){
            setPlantname({plant: 'Potatos'})
            setName({condition: 'have Early Blight'})
        }else if (prediction == 'Potato___Late_blight'){
            setPlantname({plant: 'Potatos'})
            setName({condition: 'have Late Blight'})
        }else if (prediction == 'Potato___healthy'){
            setPlantname({plant: 'Potatos'})
            setName({condition: 'are Healthy'})
        }else if (prediction == 'Strawberry___Leaf_scorch'){
            setPlantname({plant: 'Strawberries'})
            setName({condition: 'have Leaf Scorch'})
        }else if (prediction == 'Strawberry___healthy'){
            setPlantname({plant: 'Strawberries'})
            setName({condition: 'are Healthy'})
        }else if (prediction == 'Tomato___Bacterial_spot'){
            setPlantname({plant: 'Tomatos'})
            setName({condition: 'have Bacterial Spot'})
        }else if (prediction == 'Tomato___Early_blight'){
            setPlantname({plant: 'Tomatos'})
            setName({condition: 'have Early Blight'})
        }else if (prediction == 'Tomato___Late_blight'){
            setPlantname({plant: 'Tomatos'})
            setName({condition: 'have Late Blight'})
        }else if (prediction == 'Tomato___Leaf_Mold'){
            setPlantname({plant: 'Tomatos'})
            setName({condition: 'have Leaf Mold'})
        }else if (prediction == 'Tomato___Septoria_leaf_spot'){
            setPlantname({plant: 'Tomatos'})
            setName({condition: 'have Septoria Leaf Spot'})
        }else if (prediction == 'Tomato___Spider_mites Two-spotted_spider_mite'){
            setPlantname({plant: 'Tomatos'})
            setName({condition: 'have Spider Mites'})
        }else if (prediction == 'Tomato___Tomato_mosaic_virus'){
            setPlantname({plant: 'Tomatos'})
            setName({condition: 'have Tomato Mosaic Virus'})
        }else if (prediction == 'Tomato___healthy'){
            setPlantname({plant: 'Tomatos'})
            setName({condition: 'are healthy!'})
        }
    }, [prediction]);   

    if (prediction){
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
            <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 28, fontWeight: 'bold', color: 'white', top: 45}}>
                    Our analysis revealed that ...
                </Text>
            </View>
            <View style={{alignItems: 'center', top: 80}}>
                <Image style={{width:230, height: 310}} source={{uri: "data:image/jpeg;base64," + base64 }}/>
            </View>
            <View style={{flex:0.5, alignItems: 'center', justifyContent: 'center', top: 60}}>
                <Text style={{fontSize: 28, fontWeight: 'bold', color: 'white'}}>
                    You are Growing: {plantname.plant}
                </Text>
                <Text style={{fontSize: 28, fontWeight: 'bold', color: 'white', top: 10}}>
                    Your {plantname.plant} {name.condition}
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

export default Results;
