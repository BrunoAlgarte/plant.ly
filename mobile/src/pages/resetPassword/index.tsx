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

type ResetPasswordScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ResetPassword'>;

export default function ResetPassword(){
    const navigation = useNavigation<ResetPasswordScreenNavigationProp>();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResetPassword = () => {
        setLoading(true);
        // Implementar lógica de reset de senha aqui
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
