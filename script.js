async function searchWord() {
  const word = document.getElementById("wordinput").value.trim();
  console.log('Word entered:', word);

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    const definition = data[0].meanings[0].definitions[0].definition;
    const example = data[0].meanings[0].definitions[0].example || "No example available.";
    const phonetic = data[0].phonetics[0]?.text || "No pronunciation found.";

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
      <h2>${word}</h2>
      <p><strong>Pronunciation:</strong> ${phonetic}</p>
      <p><strong>Meaning:</strong> ${definition}</p>
      <p><strong>Example:</strong> ${example}</p>
      <button onclick="speakWord('${word}')">🔊 Listen</button>
    `;

    resultDiv.style.display = "block";  // ✅ Show result only after fetch

  } catch (error) {
    console.log('Error:', error);
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<p style="color:red;">Word not found. Please try again.</p>`;
    resultDiv.style.display = "block";  // ✅ Also show error message
  }
}

// 🔍 Hide result while user is typing
document.getElementById("wordinput").addEventListener("input", function () {
  document.getElementById("result").style.display = "none";
});

// 🔁 Search on pressing "Enter"
document.getElementById("wordinput").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchWord();
  }
});

// 🔊 Voice pronunciation
function speakWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US';
  speechSynthesis.cancel(); // Cancel any ongoing speech
  speechSynthesis.speak(utterance);
}
