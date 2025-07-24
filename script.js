const input = document.getElementById("wordinput");
const button = document.querySelector("button");
const resultBox = document.getElementById("result");

button.addEventListener("click", async () => {
  const word = input.value.trim();
  if (word === "") {
    resultBox.innerHTML = "<p>Please enter a word</p>";
    resultBox.style.display = "block";
    return;
  }

  resultBox.innerHTML = "<p>Loading...</p>";
  resultBox.style.display = "block";

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();

    if (data.title === "No Definitions Found") {
      resultBox.innerHTML = `<p>No definition found for "${word}"</p>`;
    } else {
      const meaning = data[0].meanings[0].definitions[0].definition;
      const example = data[0].meanings[0].definitions[0].example || "No example available.";
      const phonetic = data[0].phonetics[0]?.text || "No phonetic available.";

      resultBox.innerHTML = `
        <p><strong>Word:</strong> ${word}</p>
        <p><strong>Definition:</strong> ${meaning}</p>
        <p><strong>Example:</strong> ${example}</p>
        <p><strong>Phonetic:</strong> ${phonetic}</p>
      `;
    }
  } catch (error) {
    resultBox.innerHTML = "<p>Error fetching definition. Please try again.</p>";
  }
});
