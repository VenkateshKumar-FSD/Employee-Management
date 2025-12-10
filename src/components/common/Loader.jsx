import React from "react";

function Loader() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.7)",
      }}
    >
      <img src="https://i.gifer.com/VAyR.gif" alt="Loading..." width="70" />
    </div>
  );
}

export default Loader;
