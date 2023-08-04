import React, { useState } from "react";
import Create from "./Create";

export default function TaskPage() {
  const [clicked, setClicked] = useState("");
  return (
    <>
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            width: "30%",
            backgroundColor: "plum",
          }}
        >
          <header>NOTE HUB</header>
          {/* <ul> */}
          <div
            onClick={() => {
              setClicked("Create");
            }}
          >
            Create
          </div>

          <div
            onClick={() => {
              setClicked("UpComing");
            }}
          >
            Upcoming
          </div>

          <div
            onClick={() => {
              setClicked("Today");
            }}
          >
            Today
          </div>

          <div
            onClick={() => {
              setClicked("Bin");
            }}
          >
            Bin
          </div>

          <div
            onClick={() => {
              setClicked("Help & Support");
            }}
          >
            Help & Support
          </div>

          <footer>Logout</footer>
          {/* </ul> */}
        </div>
        <div
          style={{
            width: "70%",
            // backgroundColor: "blue",
          }}
        >
          {clicked === "Create" ? (
            <Create />
          ) : (
            <p> Displaying something {clicked}</p>
          )}
        </div>
      </div>
    </>
  );
}
