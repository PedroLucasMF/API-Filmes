import React, { useEffect, useState } from "react";
import { Card, Text } from "react-native-paper";
import apiFilmes from "../../services/apiFilmes";

const Atores = ({ navigate, route }) => {
  const [ator, setAtor] = useState({});

  useEffect(() => {
    const id = route.params.id;
    apiFilmes.get(`/person/${id}`).then((resultado) => {
      setAtor(resultado.data);
    });
  }, []);

  return (
    <>
      <Card>
          <Card.Cover style={{width: 300, paddingLeft: 150}} source={{ uri: 'https://image.tmdb.org/t/p/w500/' + ator.profile_path }} />
          <Card.Content>
            <Text variant="titleLarge">{ator.name}</Text>
            <Text variant="bodyMedium">{ator.overview}</Text>
          </Card.Content>
        </Card>
    </>
  );
};

export default Atores;
