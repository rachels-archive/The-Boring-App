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

const activityForm = document.getElementById("activityForm");

function handleSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  fetchActivity();

  document.getElementById("activityFormBtn").innerHTML = "Regenerate";
}

async function fetchActivity() {
  try {
    var type = document.getElementById("type").value;
    var participants = document.getElementById("participants").value;
    var priceRange = document.getElementById("priceRange").value;

    const url = `https://www.boredapi.com/api/activity?participants=${participants}&minPrice=0&maxPrice=${priceRange}&type=${type}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch activity");
    }

    const data = await response.json();
    if (!data || !data.activity) {
      document.getElementById("activityDesc").innerHTML =
        "try changing the preferences as no activity is found.";
    } else {
      const activity = data.activity;

      document.getElementById("activityDesc").innerHTML =
        activity.toLowerCase() + ".";
    }
  } catch (error) {
    console.error(error);
  }
}

activityForm.addEventListener("submit", handleSubmit);
