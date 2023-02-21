
import React from "react";
import TournamentCard from "./tournamentCard";

const TournamentList = (foundTours: any) => {
    // const tournaments = props.props;
    console.log(foundTours.tournaments)
    const tournaments = foundTours.tournaments;
    let tournamentCards = tournaments.map((t: any) => (
      <TournamentCard key={t.id} tournament={t} />
    ));
    return tournamentCards;
};

export default TournamentList;