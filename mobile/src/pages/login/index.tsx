import React, { useState } from "react";
import { 
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert 
} from "react-native";
import Logo from "../../assets/logo.png";
import { style } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { themas } from "../../global/themes";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import api from "../../utils/api";
import axios from "axios";

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function Login(){
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await api.post<LoginResponse>("/v1/auth/login", {
                email,
                password,
            });

            const { user, token } = response.data;
            Alert.alert("Sucesso", "Login realizado com sucesso!");
            
        } catch (error) {
            const mensagem = axios.isAxiosError(error) 
                ? error.response?.data?.message || "Erro de autenticação"
                : "Ocorreu um erro inesperado";
                
            Alert.alert("Erro", mensagem);
        } finally {
            setLoading(false);
        }
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
                {/* <Text style={style.welcomeText}>Faça login para continuar</Text> */}
                
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

                <TouchableOpacity 
                    style={style.loginButton}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={themas.colors.primary} />
                    ) : (
                        <Text style={style.loginButtonText}>Login</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                    <Text style={style.forgotPassword}>Alterar senha</Text>
                </TouchableOpacity>

                <View style={style.registerContainer}>
                    <Text style={style.registerText}>Não tem uma conta?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={style.registerButton}>Criar conta</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}