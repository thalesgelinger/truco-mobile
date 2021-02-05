import React, { useEffect, useState } from 'react';
import { Background, PlayerCard } from '../../components';
import background from '../../assets/images/background.png';
import { Container, PlayersList, SearchInput, StartButton } from './styles';
import db from '../../../mocks/db.json';

interface Player {
  id: number;
  image: string;
  name: string;
  status: string;
}

export function Lobby() {
  const [players, setPlayers] = useState<Player[]>(db.players);
  const [oponents, setOponents] = useState<Player[]>([]);

  useEffect(() => {
    setPlayers(db.players);
  }, []);

  function isOponent(oponent: Player) {
    return oponents.some((player) => oponent === player);
  }

  function handleSetOponents(oponent: Player) {
    if (isOponent(oponent)) {
      setOponents(oponents.filter((player) => player.id !== oponent.id));
      return;
    }

    setOponents([...oponents, oponent]);
  }

  function playersFilter(searchText: string) {
    if (!searchText) {
      setPlayers(db.players);
      return;
    }
    setPlayers(players.filter((player) => player.name.startsWith(searchText)));
  }

  return (
    <Background source={background}>
      <Container>
        <SearchInput
          placeholder="Pesquisar jogadores"
          onChangeText={playersFilter}
        />
        <PlayersList
          data={players}
          renderItem={({ item: player }: { item: Player }) => (
            <PlayerCard
              info={player}
              selectPlayer={handleSetOponents}
              isSelected={isOponent(player)}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-around' }}
          showsVerticalScrollIndicator={false}
        />
        <StartButton>
          {oponents.length / 1 === 1 ? 'Jogar' : oponents.length + '/1'}
        </StartButton>
      </Container>
    </Background>
  );
}