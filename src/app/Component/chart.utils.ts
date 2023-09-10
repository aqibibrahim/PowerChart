import { Response } from "./chart.interface";

export const fetchData = async (): Promise<Response> => {
  try {
    const response = await fetch("https://api.thunder.softoo.co/vis/api/dashboard/ssu/fixed");
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: [] };
  }
};
