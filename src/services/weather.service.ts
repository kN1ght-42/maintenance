import { appError } from "../utils/appError.js";
import { config } from "../config.js";

const fetchWithTimeout = async (
  url: string,
  timeout = config.requestTimeoutMs,
) => {
  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    return await fetch(url, {
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw appError(
        504,
        "WEATHER_TIMEOUT",
        "Превышено время ожидания погодного сервиса",
      );
    }

    throw appError(
      502,
      "WEATHER_API_ERROR",
      "Не удалось получить данные от погодного сервиса",
    );
  } finally {
    clearTimeout(timer);
  }
};

export const getWeather = async (lat: number, lon: number) => {
  if (!config.weatherApiUrl) {
    throw appError(500, "WEATHER_CONFIG_ERROR", "Погодный сервис не настроен");
  }

  const url = new URL(config.weatherApiUrl);

  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set(
    "daily",
    "temperature_2m_max,temperature_2m_min,precipitation_sum",
  );
  url.searchParams.set("forecast_days", "3");
  url.searchParams.set("timezone", "auto");

  const response = await fetchWithTimeout(url.toString());

  if (!response.ok) {
    throw appError(502, "WEATHER_API_ERROR", "Погодный сервис вернул ошибку", [
      {
        field: "status",
        message: `Погодный сервис вернул статус ${response.status}`,
      },
    ]);
  }

  let data: {
    daily?: {
      time?: string[];
      temperature_2m_min?: number[];
      temperature_2m_max?: number[];
      precipitation_sum?: number[];
    };
  };

  try {
    data = await response.json();
  } catch {
    throw appError(
      502,
      "WEATHER_API_ERROR",
      "Погодный сервис вернул некорректный JSON",
    );
  }

  if (
    !data.daily?.time ||
    !data.daily.temperature_2m_min ||
    !data.daily.temperature_2m_max ||
    !data.daily.precipitation_sum
  ) {
    throw appError(
      502,
      "WEATHER_API_ERROR",
      "Погодный сервис вернул неполные данные",
    );
  }

  return data.daily.time.map((date, index) => ({
    date,
    min: data.daily!.temperature_2m_min![index],
    max: data.daily!.temperature_2m_max![index],
    precipitation: data.daily!.precipitation_sum![index],
  }));
};
