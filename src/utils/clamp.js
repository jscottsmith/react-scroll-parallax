export default function clamp(number, lower, upper) {
    number = number <= upper ? number : upper;
    number = number >= lower ? number : lower;
    return number;
}
