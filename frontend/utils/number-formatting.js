export default function roundToClosest(number) {
    const decimalPart = number % 1; // Get the decimal part of the number
  
    if (decimalPart < 0.65) {
      return Math.floor(number * 10) / 10; // Round down to nearest .X
    } else {
      return Math.ceil(number * 10) / 10; // Round up to nearest .X
    }
  }
  
//   console.log(customRound(4.63)); // 4.6
//   console.log(customRound(4.66)); // 4.7
//   console.log(customRound(4.64)); // 4.6
  