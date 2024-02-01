// prevent auto form submission
export function onKeyDown(keyEvent: any) {
  if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
    keyEvent.preventDefault();
  }
}

// remove dash and space from the number
export const removeDashAndSpace = (value: string) => {
  return value.replace(/[- ]/g, "");
};

// Format Date Time 2023-11-19T08:58:06.435Z => 11/19/2023, 1:58:06 PM
export function formatDateTime(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const date = new Date(dateString);
  const formattedDateTime = date.toLocaleString("en-US", options);

  return formattedDateTime;
}
// 2023-11-21T19:00:00.000Z => 11/22/2023
export function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const date = new Date(dateString);
  const formattedDateTime = date.toLocaleString("en-US", options);

  return formattedDateTime;
}

// "2023-11-21T11:00:00.644Z" ===> 4:00:00 PM
export function formatTime(inputDateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const date = new Date(inputDateString);
  const formattedDateTime = date.toLocaleString("en-US", options);

  return formattedDateTime;
}

export function getNameInitials(name: string) {
  const words = name?.split(" ");
  const initials = words?.map((word) => word.charAt(0).toUpperCase());
  return initials?.join("");
}

export const capitalizeFirstLetter = (str: string) => {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
};

// 1200 => 1,200
export function thousandSeparatorNumber(number: number) {
  // Check if the input is a valid number
  if (typeof number !== "number" || isNaN(number)) {
    return "Invalid number";
  }

  // Convert the number to a string
  const numberString = number.toString();

  // Split the string into integer and decimal parts
  const [integerPart, decimalPart] = numberString.split(".");

  // Add thousand separators to the integer part
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  // Combine the formatted integer part and the decimal part (if exists)
  const formattedNumber = decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;

  return formattedNumber;
}

// 2023-11-21T19:00:00.000Z => Nov 2023
export function formatMonthYear(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
  };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
}

export const generateColor = (str: string) => {
  const colors = [
    { background: "#E7E7FF", color: "#696CFF" }, // A, B, C,
    { background: "#E5F9FD", color: "#03C3EC" }, // D, E, F,
    { background: "#FFEBE8", color: "#FF3E1D" }, // G, H, I,
    { background: "#FFF2D6", color: "#FFAB00" }, // J, K, L,
    { background: "#F0FCEA", color: "#82E14F" }, // M, N, O,
    { background: "#FCE4F3", color: "#F73C7E" }, // P, Q, R,
    { background: "#E4F1FF", color: "#1E9FFF" }, // S, T, U,
    { background: "#F0F0F0", color: "#909399" }, // V, W, X,
    { background: "#F8F0FF", color: "#B37FEB" }, // Y, Z
  ];

  const firstLetter = str?.charAt(0)?.toUpperCase();

  switch (firstLetter) {
    case "A":
    case "B":
    case "C":
      return colors[0];
    case "D":
    case "E":
    case "F":
      return colors[1];
    case "G":
    case "H":
    case "I":
      return colors[2];
    case "J":
    case "K":
    case "L":
      return colors[3];
    case "M":
    case "N":
    case "O":
      return colors[4];
    case "P":
    case "Q":
    case "R":
      return colors[5];
    case "S":
    case "T":
    case "U":
      return colors[6];
    case "V":
    case "W":
    case "X":
      return colors[7];
    case "Y":
    case "Z":
      return colors[8];
    default:
      return colors[Math.floor(Math.random() * colors.length)];
  }
};
