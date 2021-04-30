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
const toMilitaryTime = (time) => {
  const parse = (time) => {
    const [, hoursStr, minutes, period] = time.match(
      /(\d{1,2}):(\d{2})(\w{2})/
    );

    return {
      hours: Number(hoursStr),
      minutes: Number(minutes),
      period: period.toUpperCase(),
    };
  };

  const formatTime = (time) => time.toString().padStart(2, "0");

  const { hours, minutes, period } = parse(time);

  return [(hours % 12) + (period === "PM" ? 12 : 0), minutes]
    .map(formatTime)
    .join("");
};
