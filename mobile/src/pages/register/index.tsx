import { 
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert 
} from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from "@expo/vector-icons";
import { themas } from "../../global/themes";
import Logo from "../../assets/logo.png";
import React, { useState } from "react";
import api from "../../utils/api";
import { style } from "./styles";
import axios from "axios";

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

interface RegisterResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export default function Register(){
    const navigation = useNavigation<RegisterScreenNavigationProp>();
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!name || !lastName || !email || !password || !confirmPassword) {
            Alert.alert("Erro", "Por favor, preencha todos os campos");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Erro", "As senhas não coincidem");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                name: name.trim(),
                last_name: lastName.trim(),
                email: email.toLowerCase().trim(),
                password: password.trim(),
                plants: []
            };
            
            const response = await api.post<RegisterResponse>("/v1/users", payload);

            if (response.status === 201) {
                Alert.alert("Sucesso", "Cadastro realizado com sucesso!", [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate('Login')
                    }
                ]);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('Detalhes do erro:', {
                    status: error.response?.status,
                    data: error.response?.data,
                    headers: error.response?.headers
                });
            }
            const mensagem = axios.isAxiosError(error) 
                ? error.response?.data?.message || "Erro ao realizar cadastro"
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
                <Text style={style.titleInput}>NOME</Text>
                <View style={style.boxInput}>
                    <TextInput 
                        style={style.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Digite seu nome"
                        autoCapitalize="words"
                    />
                    <MaterialIcons 
                        name="person"
                        size={20}
                        color={themas.colors.primary}
                    />
                </View>

                <Text style={style.titleInput}>SOBRENOME</Text>
                <View style={style.boxInput}>
                    <TextInput 
                        style={style.input}
                        value={lastName}
                        onChangeText={setLastName}
                        placeholder="Digite seu sobrenome"
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