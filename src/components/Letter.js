import React, { useContext} from "react";
import { AppContext } from "../App";

function Letter({letterPos, attempVal}) {
    const { board } = useContext(AppContext);
    const letter = board[attempVal][letterPos];
  return <div className = "letter" >{letter}</div>;
}

export default Letter;
