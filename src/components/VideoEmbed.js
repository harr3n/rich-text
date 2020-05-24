import React from "react";

const getEmbedUrl = (url) => {
  if (!url) return;

  const urlObj = new URL(url);
  const host = urlObj.hostname.replace("www.", "");

  if (host === "youtube.com" || host === "youtu.be") {
    return `https://www.youtube.com/embed/${getYouTubeID(url)}?controls=1`;
  } else if (host === "vimeo.com") {
    return `https://player.vimeo.com/video/${getVimeoId(
      url
    )}?title=1&byline=0&portrait=0`;
  }
};

const getYouTubeID = (url) => {
  url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return url[2] !== undefined ? url[2].split(/[^0-9a-z_-]/i)[0] : url[0];
};

const getVimeoId = (url) => {
  return /(vimeo(pro)?\.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/.exec(url)[3];
};

const VideoEmbed = ({ block, contentState }) => {
  const data = contentState.getEntity(block.getEntityAt(0)).getData();

  return (
    <>
      <iframe
        title="video"
        width="560"
        height="315"
        src={getEmbedUrl(data.src)}
        allowFullScreen
        frameBorder="0"
      />
    </>
  );
};

export default VideoEmbed;
