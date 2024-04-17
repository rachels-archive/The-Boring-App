document.addEventListener("DOMContentLoaded", function () {
  const range = document.getElementById("priceRange");
  const output = document.getElementById("priceValue");

  // Set initial bubble position
  setBubblePosition(range, output);

  // Update bubble position when slider value changes
  range.addEventListener("input", function () {
    setBubblePosition(this, output);
  });

  // Trigger input event on page load to set initial bubble position
  range.dispatchEvent(new Event("input"));
});

function setBubblePosition(range, output) {
  output.textContent = `$${range.value}`;

  const min = parseInt(range.min);
  const max = parseInt(range.max);
  const percent = ((range.value - min) / (max - min)) * 100;

  const thumbWidth =
    parseFloat(getComputedStyle(range).getPropertyValue("--thumb-width")) || 14;
  const thumbOffset = (
    (percent * (range.offsetWidth - thumbWidth / 2)) / 100 +
    thumbWidth / 2
  ).toFixed(2);

  output.style.left = `${thumbOffset}px`;
}
