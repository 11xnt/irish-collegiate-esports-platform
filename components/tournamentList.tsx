
import React from "react";
import TournamentCard from "./tournamentCard";

const TournamentList = ({tournaments}: any) => {
    let tournamentCards = tournaments.map((t: any) => (
      <TournamentCard key={t.id} id={t.id} name={t.name} organiser={t.organiser.name} gameName={t.gameName} prize={t.prizePool} maxTeams={t.maxTeams}/>
    ));
    return tournamentCards;
};

export default TournamentList;