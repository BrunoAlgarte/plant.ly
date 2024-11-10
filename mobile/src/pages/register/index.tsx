import React, { useState } from "react";
import { 
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator 
} from "react-native";
import Logo from "../../assets/logo.png";
import { style } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { themas } from "../../global/themes";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function Register(){
    const navigation = useNavigation<RegisterScreenNavigationProp>();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = () => {
        setLoading(true);
        // Implementar lógica de cadastro aqui
    }

    return(
        <View style={style.container}>
            <View style={style.boxTop}>
                <Image 
                    source={Logo}
                    style={style.logo}
                    resizeMode="contain"
                />
            </View>
            
            <View style={style.boxMid}>
                <Text style={style.titleInput}>NOME COMPLETO</Text>
                <View style={style.boxInput}>
                    <TextInput 
                        style={style.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Digite seu nome completo"
                        autoCapitalize="words"
                    />
                    <MaterialIcons 
                        name="person"
                        size={20}
                        color={themas.colors.primary}
                    />
                </View>

                <Text style={style.titleInput}>ENDEREÇO E-MAIL</Text>
                <View style={style.boxInput}>
                    <TextInput 
                        style={style.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Digite seu e-mail"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <MaterialIcons 
                        name="email"
                        size={20}
                        color={themas.colors.primary}
                    />
                </View>

                <Text style={style.titleInput}>SENHA</Text>
                <View style={style.boxInput}>
                    <TextInput 
                        style={style.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Digite sua senha"
                        secureTextEntry
                    />
                    <MaterialIcons 
                        name="lock"
                        size={20}
                        color={themas.colors.primary}
                    />
                </View>

                <Text style={style.titleInput}>CONFIRMAR SENHA</Text>
                <View style={style.boxInput}>
                    <TextInput 
                        style={style.input}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Confirme sua senha"
                        secureTextEntry
                    />
                    <MaterialIcons 
                        name="lock"
                        size={20}
                        color={themas.colors.primary}
                    />
                </View>

                <TouchableOpacity 
                    style={style.loginButton}
                    onPress={handleRegister}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={themas.colors.primary} />
                    ) : (
                        <Text style={style.loginButtonText}>Cadastrar</Text>
                    )}
                </TouchableOpacity>

                <View style={style.registerContainer}>
                    <Text style={style.registerText}>Já tem uma conta?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={style.registerButton}>Fazer login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}