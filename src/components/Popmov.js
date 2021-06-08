import React from "react";
import { Badge } from "@material-ui/core";
import Contactbox from "./Contactbox";

const Popmov = ({ id, poster, title, date, mediatype, rating }) => {
  const img = "https://image.tmdb.org/t/p/w300";
  const noimg = "https://www.movienewz.com/img/films/poster-holder.jpg";
  return (
    <Contactbox mediatype={mediatype} id={id}>
      <img src={poster ? `${img}/${poster}` : noimg} alt={title} />
      <div className="lower">
        {title ? <b>{title}</b> : ""}
        <div className="rating">
          <Badge badgeContent={rating ? rating : "N/A"} color="primary"></Badge>
        </div>
      </div>
    </Contactbox>
  );
};

export default Popmov;
