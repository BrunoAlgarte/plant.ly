import React from "react";
import {} from "react-native";

import { 
    Text,
    View,
    Image,
    TextInput 
} from "react-native";
import Logo from "../../assets/logo.png";
import { style } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { themas } from "../../global/themes";

export default function Login(){
    return(
        <View style={style.container}>
            <View style={style.boxTop}>
                <Image 
                    source={Logo}
                    style={style.logo}
                    resizeMode="contain"
                />
                <Text style={style.text}>Seja bem vindo!</Text>

            </View>
            <View style={style.boxMid}>
                <Text style={style.titleInput}>ENDEREÇO E-MAIL:</Text>
                <View style={style.boxInput}>
                    <TextInput style={style.input}/>
                    <MaterialIcons 
                        name= 'email'
                        size={20}
                        color={themas.colors.gray}
                    />
                </View>
                <Text style={style.titleInput}>SENHA:</Text>
                <View style={style.boxInput}>
                    <TextInput style={style.input}/>
                    <MaterialIcons 
                        name= 'password'
                        size={20}
                        color={themas.colors.gray}
                    />
                </View>
                
            </View>
            <View style={style.boxBottom}>
                
            </View>
        </View>
    )
}