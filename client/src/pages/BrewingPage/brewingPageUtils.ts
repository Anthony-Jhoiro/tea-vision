const minimumTemperatureGradient = 70;
const maximumTemperatureGradient = 100;
const temperatureGradientRange =
  maximumTemperatureGradient - minimumTemperatureGradient;

export function getTemperatureClassName(
  brewingTemperatureInCelsius: number,
  temperatureGradientClassNames: string[],
) {
  const croppedTemperature = Math.max(
    0,
    Math.min(30, brewingTemperatureInCelsius - minimumTemperatureGradient),
  );

  const rad = temperatureGradientRange / temperatureGradientClassNames.length;

  return temperatureGradientClassNames[
    Math.min(
      Math.round(croppedTemperature / rad),
      temperatureGradientClassNames.length - 1,
    )
  ];
}

export function formatTime(brewingTime: number) {
  const seconds = Math.round(60 * (brewingTime % 1));
  const minutes = Math.floor(brewingTime);

  return `${minutes}:${seconds.toString(10).padStart(2, '0')}`;
}
