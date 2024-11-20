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

type ResetPasswordScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ResetPassword'>;

export default function ResetPassword(){
    const navigation = useNavigation<ResetPasswordScreenNavigationProp>();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword || !email) {
            Alert.alert("Erro", "Por favor, preencha todos os campos");
            return;
        }

        setLoading(true);
        try {
            const response = await api.patch("/v1/auth/resetPassword", {
                email: email.toLowerCase().trim(),
                current_password: currentPassword,
                new_password: newPassword,
                password_validation: confirmPassword
            });

            if (response.status === 200) {
                Alert.alert("Sucesso", "Senha alterada com sucesso!", [
                    {
                        text: "OK",
                        onPress: () => navigation.goBack()
                    }
                ]);
            }
        } catch (error) {
            const mensagem = axios.isAxiosError(error) 
                ? error.response?.data?.message || "Erro ao alterar senha"
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
                <Text style={style.titleInput}>EMAIL</Text>
                <View style={style.boxInput}>
                    <TextInput 
                        style={style.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Digite seu email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <MaterialIcons 
                        name="email"
                        size={20}
                        color={themas.colors.primary}
                    />
                </View>

                <Text style={style.titleInput}>SENHA ATUAL</Text>
                <View style={style.boxInput}>
                    <TextInput 
                        style={style.input}
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        placeholder="Digite sua senha atual"
                        secureTextEntry
                    />
                    <MaterialIcons 
                        name="lock"
                        size={20}
                        color={themas.colors.primary}
                    />
                </View>

                <Text style={style.titleInput}>NOVA SENHA</Text>
                <View style={style.boxInput}>
                    <TextInput 
                        style={style.input}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholder="Digite sua nova senha"
                        secureTextEntry
                    />
                    <MaterialIcons 
                        name="lock"
                        size={20}
                        color={themas.colors.primary}
                    />
                </View>

                <Text style={style.titleInput}>CONFIRMAR NOVA SENHA</Text>
                <View style={style.boxInput}>
                    <TextInput 
                        style={style.input}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Confirme sua nova senha"
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
                    onPress={handleResetPassword}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={themas.colors.primary} />
                    ) : (
                        <Text style={style.loginButtonText}>Alterar Senha</Text>
                    )}
                </TouchableOpacity>

                <View style={style.registerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={style.registerButton}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
