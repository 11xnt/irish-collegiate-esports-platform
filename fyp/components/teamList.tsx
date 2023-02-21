import React from "react";
import TeamCard from "./teamCard";

const TeamList = ({teams}: any) => {
    let teamCards = teams.map((t: any) => (
      <TeamCard key={t.id} team={t} />
    ));
    return teamCards;
};

export default TeamList;