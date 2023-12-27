import { useQuery } from "react-query";

export const useFetchWeather = (url: string) => {
  async function fetchWeather() {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching marine weather data:", error);
    }
  }

  const weather = useQuery({
    queryKey: [url],
    queryFn: fetchWeather,
  });

  return weather.data;
};
