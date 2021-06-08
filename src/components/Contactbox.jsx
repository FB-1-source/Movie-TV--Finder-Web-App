import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#666699",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function Contactbox({ children, mediatype, id }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [output, setoutput] = useState();
  const [video, setvideo] = useState();
  const img500 = "https://image.tmdb.org/t/p/w500/";
  const noimg = "https://www.movienewz.com/img/films/poster-holder.jpg";

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchdata = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediatype}/${id}?api_key=${process.env.REACT_APP_SECRET_KEY}&language=en-US`
    );
    setoutput(data);
  };

  const fetchvideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediatype}/${id}/videos?api_key=${process.env.REACT_APP_SECRET_KEY}&language=en-US`
    );
    setvideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchdata();
    fetchvideo();
  }, []);

  return (
    <>
      <div type="button" className="mt" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {output && (
            <div className={classes.paper}>
              <div className="contentbox">
                <img
                  src={
                    output.backdrop_path
                      ? `${img500}/${output.backdrop_path}`
                      : noimg
                  }
                  alt={output.name || output.title}
                  className="contentimg"
                />
                <img
                  src={
                    output.poster_path
                      ? `${img500}/${output.poster_path}`
                      : noimg
                  }
                  alt={output.name || output.title}
                  className="contentimg2"
                />
                <div className="sidecont">
                  <span className="contenttitle">
                    {output.name || output.title}(
                    {(
                      output.first_air_date ||
                      output.release_date ||
                      "N/A"
                    ).substring(0, 4)}
                    )
                  </span>
                  <div className="contenttagline">
                    {output.tagline && <i>{output.tagline}</i>}
                  </div>
                  <span className="contentoverview">{output.overview}</span>
                  <div></div>
                  <Button
                    style={{ width: "100%" }}
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    {" "}
                    Watch The Trailer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}
