import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    SafeAreaView,
    StatusBar,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Alert
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { style } from './styles';
import { themas } from '../../global/themes';
import api from '../../utils/api';

interface RouteParams {
    id: string;
}

interface Plant {
    _id: string;
    name: string;
    type: string;
    image: string;
    date_created: string;
}

interface Species {
    name: string;
    scientific_name: string;
    watering_tips: string;
    sunlight_tips: string;
    soil_tips: string;
    temperature_min: number;
    temperature_max: number;
    growth_time: string;
}

export function PlantDetails() {
    const [plant, setPlant] = useState<Plant | null>(null);
    const [species, setSpecies] = useState<Species | null>(null);
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const navigation = useNavigation();
    const { id } = route.params as RouteParams;

    const fetchPlantDetails = async () => {
        try {
            const { data: plantData } = await api.get(`/v1/plants/${id}`);
            setPlant(plantData);
            
            const { data: speciesData } = await api.get(`/v1/species/name/${plantData.type}`);
            setSpecies(speciesData);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os detalhes da planta');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlantDetails();
    }, [id]);

    if (loading) {
        return (
            <View style={style.loadingContainer}>
                <ActivityIndicator size="large" color={themas.colors.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={style.container}>
            <StatusBar 
                backgroundColor={themas.colors.white}
                barStyle="dark-content"
            />
            
            <View style={style.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color={themas.colors.primary} />
                </TouchableOpacity>
            </View>

            <ScrollView style={style.content}>
                <View style={style.plantHeader}>
                    <Image 
                        source={plant?.image ? { uri: plant.image } : require('../../assets/logo_novo.png')}
                        style={style.plantImage}
                    />
                    <Text style={style.plantName}>{plant?.name}</Text>
                    <Text style={style.plantType}>{plant?.type}</Text>
                    <Text style={style.plantDate}>
                        Adicionado em: {plant?.date_created ? new Date(plant.date_created).toLocaleDateString() : ''}
                    </Text>
                </View>

                <View style={style.infoSection}>
                    <InfoItem
                        icon="tag"
                        title="Tipo"
                        value={species?.name}
                    />
                    <InfoItem
                        icon="book"
                        title="Nome científico"
                        value={species?.scientific_name}
                    />
                    <InfoItem
                        icon="droplet"
                        title="Rega"
                        value={species?.watering_tips}
                    />
                    <InfoItem
                        icon="sun"
                        title="Sol"
                        value={species?.sunlight_tips}
                    />
                    <InfoItem
                        icon="target"
                        title="Solo"
                        value={species?.soil_tips}
                    />
                    <InfoItem
                        icon="thermometer"
                        title="Temperatura"
                        value={`Min ${species?.temperature_min}°C - Max ${species?.temperature_max}°C`}
                    />
                    <InfoItem
                        icon="trending-up"
                        title="Crescimento"
                        value={species?.growth_time}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

interface InfoItemProps {
    icon: string;
    title: string;
    value?: string;
}

const InfoItem = ({ icon, title, value }: InfoItemProps) => (
    <View style={style.infoItem}>
        <View style={style.infoHeader}>
            <Feather name={icon as any} size={24} color={themas.colors.primary} />
            <Text style={style.infoTitle}>{title}:</Text>
        </View>
        <Text style={style.infoValue}>{value}</Text>
    </View>
);

export default PlantDetails;
