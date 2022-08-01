import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/Auth";
import { View , Text , Image } from "react-native";




const AvatarInline = (props)=>{
    
    const {ipAddress} = useContext(AuthContext)

    const [image , setImage ] = useState()

    const form = {
        person: props.data
    }
    const getAvatar = ()=>{
        axios.post( ipAddress + '/workspace/task/getAvatar', form)
        .then(function (response) {
            setImage(response.data.image)
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    useEffect(()=>{
        getAvatar()
    },[])

    return(
        <Image key={props.key} style={{ marginLeft: -10, height: 30, width: 30, borderRadius: 50, }} source={{ uri: image ? image : 'https://spng.pngfind.com/pngs/s/5-53481_med-boukrima-specialist-webmaster-php-e-commerce-web.png' }} />
    )
}

export default AvatarInline