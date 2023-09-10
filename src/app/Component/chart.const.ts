import { startOfDay, endOfDay, eachMinuteOfInterval, format } from "date-fns";

export const colorMap: Record<string, string> = {
  Main: "#B798F5",
  Solar: "#02E10C",
  DG: "#403F3D",
  Battery: "#FDE602",
  "Solar+Battery": "#86B0FF",
  "Battery+Solar": "#86B0FF",
  "Main+Solar": "#7243D0",
  "Main+Battery": "#32864B",
  "Main+Solar+Battery": "#8BC486",
  "DG+Battery": "magenta",
  "DG+Solar+Battery": "cyan",
  "DG+Battery+Solar": "cyan",
  Undetermined: "#BBE3FD",
  "": "white",
};

export const startTime = startOfDay(new Date());
export const endTime = endOfDay(new Date());
export const timeoptions = eachMinuteOfInterval({ start: startTime, end: endTime }, { step: 5 }).map((time) =>
  format(time, "HH:mm")
);
