import React from "react"
import { Image, View,Text, SafeAreaView, StyleSheet} from 'react-native'
import { Entypo } from '@expo/vector-icons';

const Home = () => {
    return(
        <SafeAreaView style={styles.container}>
            <Image
                source ={require('../../Leaves.jpg')}
                style={styles.Image}
            >
            </Image>
            <View style={styles.Textoverlay}> 
                <Text style={styles.title}>
                Plant Medic
                </Text>
            </View>
            <View style={styles.leaf}>
                <Entypo name="leaf" size={280} color="#147d30" />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 0,
        backgroundColor: '#65c267'
    },  
    Image: {
        flex: 1,
        opacity: 0.2,
    },
    title: {
      fontSize: 70,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      top: 450,
    },
    leaf: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 180,
      alignItems: 'center',
    },
    Textoverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent'
    }
})

export default Home
