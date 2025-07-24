const input = document.getElementById("input");
const button = document.getElementById("btn");
const resultBox = document.getElementById("result");

input.focus();

// Press "Enter" to search
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    button.click();
  }
});

button.addEventListener("click", async () => {
  const word = input.value.trim();

  if (word === "") {
    resultBox.innerHTML = "<p>Please enter a word.</p>";
    return;
  }

  resultBox.innerHTML = "<p>Loading...</p>"; // Show loading message

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    if (!response.ok) {
      throw new Error("Word not found");
    }

    const data = await response.json();

    const meaning = data[0].meanings[0].definitions[0].definition;
    const example = data[0].meanings[0].definitions[0].example || "No example available.";
    const partOfSpeech = data[0].meanings[0].partOfSpeech;
    const phonetic = data[0].phonetic || "Not available";

    resultBox.innerHTML = `
      <p><strong>Word:</strong> ${word}</p>
      <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
      <p><strong>Phonetic:</strong> ${phonetic}</p>
      <p><strong>Meaning:</strong> ${meaning}</p>
      <p><strong>Example:</strong> ${example}</p>
    `;
  } catch (error) {
    resultBox.innerHTML = `<p style="color:red;">Error: ${error.message}. Please try again.</p>`;
    console.error("Fetch error:", error);
  }
});
