import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    SafeAreaView,
    StatusBar,
    FlatList,
    Image,
    ActivityIndicator,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components/header';
import { themas } from '../../global/themes';
import { style } from './styles';
import { RootStackParamList } from '../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import api from '../../utils/api';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type MainScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

interface Plant {
    _id: string;
    name: string;
    type: string;
    image: string;
    date_created: string;
}

export function MainScreen() {
    const [plants, setPlants] = useState<Plant[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<MainScreenNavigationProp>();
    const [userId, setUserId] = useState<string>('');

    const fetchPlants = async () => {
        try {
            const storedUserId = await AsyncStorage.getItem('@PlantApp:userId');
            if (!storedUserId) {
                Alert.alert('Erro', 'Usuário não identificado');
                navigation.navigate('Login');
                return;
            }
            
            setUserId(storedUserId);
            const { data } = await api.get(`/v1/plants/user/${storedUserId}`);
            setPlants(data.plants);
        } catch (error) {
            console.error('Erro ao buscar plantas:', error);
            Alert.alert('Erro', 'Não foi possível carregar as plantas');
        } finally {
            setLoading(false);
        }
    };

    const deletePlant = async (plantId: string) => {
        try {
            await api.delete(`/v1/plants/${plantId}`);
            setPlants(plants.filter(plant => plant._id !== plantId));
            Alert.alert('Sucesso', 'Planta removida com sucesso!');
        } catch (error) {
            Alert.alert('Erro', 'Erro ao deletar planta');
        }
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('@PlantApp:userId');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível fazer logout');
        }
    };

    useEffect(() => {
        fetchPlants();
    }, []);

    const renderPlantItem = ({ item }: { item: Plant }) => (
        <View style={style.plantCard}>
            <View style={style.plantInfo}>
                <Image 
                    source={item.image ? { uri: item.image } : require('../../assets/logo_novo.png')}
                    style={style.plantImage}
                />
                <View style={style.plantDetails}>
                    <Text style={style.plantName}>{item.name}</Text>
                    <Text style={style.plantType}>{item.type}</Text>
                    <Text style={style.plantDate}>
                        Adicionado em: {new Date(item.date_created).toLocaleDateString()}
                    </Text>
                </View>
            </View>
            
            <View style={style.buttonContainer}>
                <TouchableOpacity 
                    style={style.viewButton}
                    onPress={() => navigation.navigate('PlantDetails', { id: item._id })}
                >
                    <Text style={style.buttonText}>Ver</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={style.deleteButton}
                    onPress={() => deletePlant(item._id)}
                >
                    <Feather name="trash-2" size={24} color={themas.colors.white} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={style.container}>
            <StatusBar 
                backgroundColor={themas.colors.white}
                barStyle="dark-content"
            />
            
            <View style={style.content}>
                <View style={style.header}>
                    <Text style={style.title}>Minhas plantas</Text>
                    <TouchableOpacity 
                        style={style.logoutButton}
                        onPress={handleLogout}
                    >
                        <Text style={style.logoutButtonText}>Sair</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={style.addButton}
                    onPress={() => navigation.navigate('AddPlant')}
                >
                    <Text style={style.addButtonText}>Adicionar Planta</Text>
                </TouchableOpacity>

                {loading ? (
                    <ActivityIndicator size="large" color={themas.colors.primary} />
                ) : plants.length === 0 ? (
                    <View style={style.emptyContainer}>
                        <Image 
                            // source={require('../../assets/vasinho_triste.png')}
                            style={style.emptyImage}
                        />
                        <Text style={style.emptyText}>Nenhuma planta cadastrada</Text>
                    </View>
                ) : (
                    <FlatList 
                        data={plants}
                        renderItem={renderPlantItem}
                        keyExtractor={item => item._id}
                        contentContainerStyle={style.plantList}
                    />
                )}
            </View>
        </SafeAreaView>
    );
} 

export default MainScreen;