import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss"

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  let currentSpots = "";
  const formatSpots = () => {
    
    if (props.spots > 1) {
      currentSpots = props.spots + " spots remaining"
      return currentSpots;
    } else
    if (props.spots === 1) {
      currentSpots = "1 spot remaining"
      return currentSpots;
    } else
    if (props.spots === 0) {
      currentSpots = "no spots remaining"
      return currentSpots;
    } else
    currentSpots = props.spots;
    return currentSpots;
  }

  formatSpots();


  return (
    <li 
      className={dayClass} 
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2 className="text--regular" >{props.name}</h2>
      <h3 className="text--light">{currentSpots}</h3>
    </li>
  );
}