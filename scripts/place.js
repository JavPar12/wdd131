// Dynamic footer dates
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Static weather values matching the HTML content
const tempC = 8;
const windKmh = 15;

// Required single-line arrow function for metric wind chill calculation
const calculateWindChill = (t, s) => 13.12 + 0.6215 * t - 11.37 * Math.pow(s, 0.16) + 0.3965 * t * Math.pow(s, 0.16);

// Evaluation block: executes calculation only if limits are met (<=10°C and >4.8 km/h)
if (tempC <= 10 && windKmh > 4.8) {
    const calculatedFactor = calculateWindChill(tempC, windKmh);
    document.getElementById("windchill").textContent = `${calculatedFactor.toFixed(1)} °C`;
} else {
    document.getElementById("windchill").textContent = "N/A";
}