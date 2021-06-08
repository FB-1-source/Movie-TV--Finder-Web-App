import React, { useEffect, useState } from "react";
import Popmov from "./Popmov";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Newpagination from "./Newpagination";
import axios from "axios";

function Main() {
  const [output, setoutput] = useState();
  const [pages, setpages] = useState(1);
  const url2 = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_SECRET_KEY}&page=${pages}`;
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  const fetching = async () => {
    const { data } = await axios.get(url2);
    setoutput(data.results);
  };

  useEffect(() => {
    fetching();
  }, [pages]);

  return (
    <div>
      <div className="head">
        <h2>Trending Today</h2>
      </div>
      <div className="popular">
        {output &&
          output.map((p) => (
            <Popmov
              key={p.id}
              id={p.id}
              poster={p.poster_path}
              title={p.title || p.name}
              date={p.first_airdate || p.release_date}
              mediatype={p.media_type}
              rating={p.vote_average}
            />
          ))}
      </div>
      <div>
        <ThemeProvider theme={theme}>
          <Newpagination setpages={setpages} />
        </ThemeProvider>
      </div>
    </div>
  );
}

export default Main;
