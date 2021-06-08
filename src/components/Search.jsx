import React, { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Popmov from "./Popmov";
import Newpagination from "./Newpagination";
import axios from "axios";

const Search = () => {
  const [type, settype] = useState(0);
  const [pages, setpages] = useState(1);
  const [numofpages, setnumofpages] = useState();
  const [searchtext, setsearchtext] = useState("");
  const [output, setoutput] = useState();
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  const Itemsearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
        process.env.REACT_APP_SECRET_KEY
      }&language=en-US&query=${searchtext}&page=${pages}&include_adult=false`
    );
    setoutput(data.results);
    setnumofpages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    Itemsearch();
  }, [type, pages]);

  return (
    <div className="bar">
      <ThemeProvider theme={theme}>
        <div className="double">
          <TextField
            style={{ width: 1000 }}
            label="Search"
            variant="filled"
            onChange={(e) => setsearchtext(e.target.value)}
          />
          <Button
            onClick={Itemsearch}
            style={{ marginLeft: 10 }}
            variant="contained"
          >
            <SearchIcon />
          </Button>
        </div>
        <div className="tabs">
          <Tabs
            value={type}
            indicatorColor="secondary"
            textColor="theme"
            onChange={(event, newvalue) => {
              settype(newvalue);
              setpages(1);
            }}
          >
            <Tab style={{ width: "50%" }} label=" Search Movies" />
            <Tab style={{ width: "50%" }} label=" Search TV Series" />
          </Tabs>
        </div>
      </ThemeProvider>
      <div className="popular">
        {output &&
          output.map((p) => (
            <Popmov
              key={p.id}
              id={p.id}
              poster={p.poster_path}
              title={p.title || p.name}
              date={p.first_air_date || p.release_date}
              mediatype={type ? "tv" : "movie"}
              rating={p.vote_average}
            />
          ))}
      </div>
      {searchtext &&
        !output &&
        (type ? <h3>No Series found</h3> : <h3>No Movie found</h3>)}
      <div>
        <ThemeProvider theme={theme}>
          {numofpages > 1 && (
            <Newpagination setpages={setpages} numofpages={numofpages} />
          )}
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Search;
