import React, { useEffect, useState } from 'react'
import { Avatar, Card, IconButton, Text } from 'react-native-paper'
import apiFilmes from '../../services/apiFilmes'
import { ScrollView } from 'react-native'

const FilmesDetalhes = ({ navigation, route }) => {

    const [filme, setFilme] = useState({}) 
    const [atores, setAtores] = useState([]) 

    useEffect(() => {
        const id = route.params.id
        apiFilmes.get(`/movie/${id}?language=pt-BR`).then(resultado => {
            setFilme(resultado.data)
        })
        apiFilmes.get(`/movie/${id}/credits?language=pt-BR`).then(resultado => {
            setAtores(resultado.data.cast)  
        })
    }, [])

    return (
       <>
        <ScrollView style={{margin: 10}}>
        <Card style={{display: 'flex', flexDirection: 'row', marginBottom: 5, backgroundColor: 'grey', color: 'white'}}>
          <Card.Cover style={{}} source={{ uri: 'https://image.tmdb.org/t/p/w500/' + filme.backdrop_path }} />
          <Card.Content style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{textAlign: "center" }} variant="titleLarge">{filme.title}</Text>
            <Text style={{textAlign: "center" }} variant="bodyMedium">{filme.overview}</Text>
          </Card.Content>
        </Card>
        <Card style={{display: 'flex', flexDirection: 'row', marginBottom: 5, backgroundColor: 'grey', color: 'white'}}> 
            <Card.Content style={{justifyContent: 'flex-start'}}>
            <Text variant="bodyMedium">duração:{filme.runtime}M</Text>
            <Text variant="bodyMedium">Popularidade:{filme.popularity}M</Text>
            <Text variant="bodyMedium">Custo de Produção: {filme.budget}</Text>
            </Card.Content>
        </Card>

        {atores.map(item =>(
             <Card key={item.id} style={{margin: 3, backgroundColor: 'grey', color: 'white'}}
             onPress={()=>navigation.push('atores-detalhes', {id: item.id})}>
             
                <Card.Title
                    title={item.chacracter}
                    subtitle={item.name}
                    left={(props) => (
                        <Avatar.Image
                        {...props}
                        size={44}
                        source={{
                            uri: `https://image.tmdb.org/t/p/w500${item.profile_path}`,
                        }}
                        />
                    )}
                />
            </Card>
        ))}



        </ScrollView>
       </>
    )
}

export default FilmesDetalhes