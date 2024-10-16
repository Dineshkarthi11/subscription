import React from "react";

export default function GoogleMap({ address }) {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    address
  )}&output=embed`;

  return (
    <div className="overflow-auto rounded-xl">
      <iframe
        title="Google Map"
        src={mapSrc}
        width="100%"
        height="400px"
        style={{ border: 0, outline: 0 }}
        allowFullScreen
      ></iframe>
    </div>
  );
}
