export const formatNumbers = (value) => {
  if (!value) {
    return "NA";
  }
  return parseFloat(value)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

export const getMedianRating = (scores) => {
  if (!scores.length) return 0;

  let sorted = scores.sort((a, b) => a - b);
  let half = Math.floor((scores.length - 1) / 2);

  return scores.length % 2 === 0
    ? (sorted[half] + sorted[half + 1]) / 2
    : sorted[half];
};

export const getStandardDeviation = (array) => {
  if (array.length < 2) return 0;

  const n = array.length;
  const mean = array.reduce((a, b) => a + b) / n;
  const result = Math.sqrt(
    array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / (n - 1)
  );

  return `$${formatNumbers(result)}`;
};

export const meanBoxOffice = (total, length) => {
  return formatNumbers(total / length);
};
