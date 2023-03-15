
import React from "react";
import TournamentCard from "./tournamentCard";

const TournamentList = ({tournaments}: any) => {
    // const tournaments = props.props;
    let tournamentCards = tournaments.map((t: any) => (
      <TournamentCard key={t.id} tournament={t} />
    ));
    return tournamentCards;
};

export default TournamentList;