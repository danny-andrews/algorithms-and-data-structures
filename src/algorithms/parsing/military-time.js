/*
 * toMillitaryTime: Given a string in civilian time format and returns the time in military format.
 *
 * Signature: (time = String) -> String
 *
 * Time/Space Complexity: O(1)/O(1)
 *
 * Examples:
 * 1. toMillitaryTime("9:45am") -> "0945"
 * 2. toMillitaryTime("12:00am") -> "0000"
 * 3. toMillitaryTime("12:00pm") -> "1200"
 * 4. toMillitaryTime("4:01pm") -> "1601"
 *
 * Hints:
 * 1. What are the edge-cases to be aware of?
 * 2. Regular expressions may be helpful for parsing.
 * 3. Look into the % operator.
 */
const TIME_REGEX = /^(1[0-2]|0?[1-9]):([0-5][0-9])( ?[ap]m)$/;

const parseCivilianTime = (time) => {
  const [, hours, minutes, period] = time.match(TIME_REGEX);

  return {
    hours: Number(hours),
    minutes,
    period: period.toUpperCase(),
  };
};

const toMilitaryTime = (time) => {
  const { hours, minutes, period } = parseCivilianTime(time);
  const militaryHours = (hours % 12) + (period === "PM" ? 12 : 0);

  return militaryHours.toString().padStart(2, "0") + minutes;
};

export default toMilitaryTime;
