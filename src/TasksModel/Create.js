import React, { useState } from "react";
import InputBox from "../components/inputBox/InputBox";
import Button from "../components/button/Button";

export default function Create() {
  const [formTask, setFormTask] = useState({
    entry: "",
    day: "",
    time: "",
  });
  function deleteTask() {
    if (window.confirm("Are you sure want to delete?")) {
      console.log("deleted");
    } else {
      console.log("Not Deleted");
    }
  }
  return (
    <>
      <div>
        <div>
          <div>
            <h2>Create New Task</h2>
          </div>
          <form
            onChange={(e) => {
              setFormTask({ ...formTask, [e.target.name]: e.target.value });
            }}
            style={{
              height: "80%",
              display: "flex",
              flexDirection: "column",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e.timeStamp);
              console.log(formTask);
              console.log("Submitted");
            }}
          >
            <fieldset
              style={{
                padding: "4px",
                margin: "6px",
              }}
            >
              <legend>Description</legend>
              <textarea id="w3review" name="entry" rows="4" cols="50">
                At w3schools.com you will learn how to make a website. They
                offer free tutorials in all web development technologies.
              </textarea>
            </fieldset>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <fieldset
                style={{
                  padding: "4px",
                  margin: "6px",
                }}
              >
                <legend>Day</legend>
                <InputBox type="date" name="day" />
              </fieldset>
              <fieldset
                style={{
                  padding: "4px",
                  margin: "6px",
                }}
              >
                <legend>Time</legend>
                <InputBox type="time" name="time" />
              </fieldset>
            </div>
          </form>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button
            type="Submit"
            value="Save"
            //   onClick={() => console.log("Saved")}
            onSubmit={() => console.log("Saved")}
          />
          <Button
            type="button"
            value="Delete"
            onClick={() => {
              deleteTask();
            }}
          />
        </div>
      </div>
    </>
  );
}
