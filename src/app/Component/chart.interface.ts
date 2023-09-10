export interface Data {
  name: string;
  date: string;
  start: string;
  end: string;
  value: string[];
  itemStyle: {
    normal: {
      color: string;
    };
  };
}

export interface Response {
  data: { date: string; sourceTag: string; minute_window: string }[];
}
