import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/Auth";
import { View , Text , Image } from "react-native";




const TaggedPersons = (props)=>{
    
    const {ipAddress} = useContext(AuthContext)

    const [name , setName ] = useState()
    const [image , setImage ] = useState()
    const [status , setStatus] = useState()

    const form = {
        person: props.data
    }
    const getAvatar = ()=>{
        axios.post( ipAddress + '/workspace/task/getAvatar', form)
        .then(function (response) {
            setName(response.data.name)
            setImage(response.data.image)
            setStatus(response.data.status)
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    useEffect(()=>{
        getAvatar()
    },[])

    return(
        <View key={props.key} style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
        <Image  style={{ height: 40, width: 40, borderRadius: 50 }} source={{ uri: image ? image : 'https://spng.pngfind.com/pngs/s/5-53481_med-boukrima-specialist-webmaster-php-e-commerce-web.png' }} />
        <View>
            <Text style={{ fontSize: 16, fontFamily: "Poppins_400Regular", marginLeft: 15 }}>{name}</Text>
            <Text style={{ fontSize: 12, marginLeft: 15, fontFamily: "Poppins_400Regular", color: "gray", marginTop: -6 }}>{status ? status : "Pending"}</Text>
        </View>
    </View>
    )
}

export default TaggedPersons