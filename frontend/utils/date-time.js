export function calculateSprintDays(startDate, endDate) {
    // Parse the dates into JavaScript Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the difference in milliseconds
    const differenceInMs = end - start;

    // Convert milliseconds to days
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

    return Math.abs(differenceInDays); // Return the absolute value to handle negative differences
}