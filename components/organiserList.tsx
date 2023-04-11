import React from "react";
import OrganiserCard from "./organiserCard";

const OrganiserList = ({organisers}: any) => {
    console.log(organisers)
    let organiserCards = organisers.map((t: any) => (
      <OrganiserCard key={t.id} organiser={t} />
    ));
    return organiserCards;
};

export default OrganiserList;