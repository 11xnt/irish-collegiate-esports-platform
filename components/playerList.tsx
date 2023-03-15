import React from "react";
import PlayerCard from "./playerCard";

const PlayerList = ({players}: any) => {
    let playerCards = players.map((t: any) => (
      <PlayerCard key={t.id} player={t} />
    ));
    return playerCards;
};

export default PlayerList;