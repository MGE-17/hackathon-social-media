export function epochToTimePassed(time) {
  const now = Date.now(); // Current time in milliseconds
  const elapsedMs = now - time; // Time passed since epoch in milliseconds

  let minutes = 0;
  let hours = 0;
  let days = 0;
  let weeks = 0;
  let months = 0;
  let years = 0;
  // Convert milliseconds to different units
  const seconds = Math.floor(elapsedMs / 1000);
  if (seconds < 0) return "0 sec ago";
  if (seconds > 60) {
    minutes = Math.floor(seconds / 60);
    if (minutes > 60) {
      hours = Math.floor(minutes / 60);
      if (hours > 24) days = Math.floor(hours / 24);
      if (days >= 7) {
        weeks = Math.floor(days / 7);
        if (days >= 30) {
          months = Math.floor(days / 30);
          if (months >= 12) {
            years = Math.floor(days / 365);
            return years + " years ago";
          } else return months + " months ago";
        } else return weeks + " weeks ago";
      } else return hours + " hours ago";
    } else return minutes + " mins ago";
  } else return seconds + " sec ago";
}
