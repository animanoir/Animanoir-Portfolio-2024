import React, { useState, useEffect } from "react";
import "@/styles/lastFm.css";
import useLastFmData from "@/components/hooks/useLastFmData.js";

export const LastFm = () => {
  const lfmData = useLastFmData();
  const [albumImageState, setAlbumImageState] = useState({
    x: 0,
    y: 0,
  });
  const [onMouseEnter, setOnMouseEnter] = useState(false);

  const handleMouseEnter = (albumImage) => {
    if (albumImage) {
      setOnMouseEnter(true);
    }
  };

  const handleMouseLeave = () => {
    setOnMouseEnter(false);
  };

  const handleMouseMove = (e) => {
    setAlbumImageState({ ...albumImageState, x: e.clientX, y: e.clientY });
  };

  const buildLastFmData = () => {
    const { error } = lfmData;
    const track = lfmData?.recenttracks?.track;

    if (error) {
      return (
        <div className={lastFmStyles.container}>
          <p>{error}</p>
        </div>
      );
    }

    if (!track) {
      return (
        <div className="lastfmContainer">
          <p>Fetching from Last.FM servers...</p>
        </div>
      );
    }

    const [
      {
        name: songName,
        artist: { "#text": artistName },
        album: { "#text": albumName },
        image,
      } = {},
    ] = track;
    const albumImage = image?.[image.length - 1]?.["#text"];

    return (
      <div className="lastfmContainer fadeInQuick">
        <span
          onMouseEnter={() => handleMouseEnter(albumImage)}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          Listening now to <b className="songInfo">{songName}</b> by{" "}
          <b className="songInfo">{artistName}</b>{" "}
          <img src="/images/playingBars.gif" alt="Now playing" />
        </span>
        <div
          className="albumCover"
          style={{
            zIndex: onMouseEnter ? 1 : -1,
            left: albumImageState.x,
            top: 43,
            opacity: onMouseEnter ? 1 : 0,
          }}
        >
          <img src={albumImage} alt={albumName} />
        </div>
      </div>
    );
  };
  return buildLastFmData();
};

export default LastFm;
