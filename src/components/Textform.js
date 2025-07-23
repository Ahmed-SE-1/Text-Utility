import React, { useState } from "react";

export default function Textform(props) {
  const languageNames = {
    en: "English",
    fr: "French",
    es: "Spanish",
    it: "Italian",
    de: "German",
    ru: "Russian",
    ja: "Japanese",
    zh: "Chinese",
    ar: "Arabic",
    ur: "Urdu",
    hi: "Hindi",
    pt: "Portuguese",
    nl: "Dutch",
    ko: "Korean",
    pl: "Polish",
    tr: "Turkish",
    sv: "Swedish",
  };

  const [text, setText] = useState("");
  const [targetLang, setTargetLang] = useState("");

  const handleUpper = () => {
    setText(text.toUpperCase());
  };

  const handleLower = () => {
    setText(text.toLowerCase());
  };

  const handleClear = () => {
    setText("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    props.alert("Text copied to clipboard!", "success");
  };

  const handleSpaces = () => {
    setText(text.split(/[ ]+/).join(" "));
  };

  const removeduplicate = () => {
    const words = text.split(/\s+/);
    const unique = [...new Set(words)];
    setText(unique.join(" "));
  };

  const detectLanguage = async (inputtext) => {
    try {
      const response = await fetch("https://ws.detectlanguage.com/0.2/detect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer f9b89a878ceda1cde75672cd07a43319",
        },
        body: JSON.stringify({ q: inputtext }),
      });

      const { data } = await response.json();
      const result = data.detections[0];
      const code = result.language;
      const confidence = result.confidence;

      const fullName = languageNames[code] || "Unknown Language";

      props.alert(
        `Detected language: ${fullName.toUpperCase()} (${code}) — ${(
          confidence * 100
        ).toFixed(1)}% confidence`,
        "success"
      );
      setText(fullName.toUpperCase());
    } catch (error) {
      console.error("Error detecting language:", error);
      props.alert("Language detection failed", "danger");
    }
  };

  const caesarEncrypt = (inputtext, shift = 3) => {
    const encryptedText = inputtext.replace(/[a-z]/gi, (char) => {
      const base = char === char.toUpperCase() ? 65 : 97;
      return String.fromCharCode(
        ((char.charCodeAt(0) - base + shift) % 26) + base
      );
    });
    props.alert(`Encrypted Text: ${encryptedText}`, "success");
    setText(encryptedText);
  };

  const caesarDecrypt = (inputtext, shift = 3) => {
    const decryptedText = inputtext.replace(/[a-z]/gi, (char) => {
      const base = char === char.toUpperCase() ? 65 : 97;
      return String.fromCharCode(
        ((char.charCodeAt(0) - base + (26 - shift)) % 26) + base
      );
    });
    props.alert(`Decrypted Text: ${decryptedText}`, "success");
    setText(decryptedText);
  };

  const extractNumbers = (inputtext) => {
    const numbers = inputtext.match(/\d+/g)?.map(Number) || [];
    props.alert(`Numbers Found: ${numbers.join(", ") || "None"}`, "success");
    setText(numbers.join(", "));
  };

  const extractEmails = (inputtext) => {
    const emails = inputtext.match(/\S+@\S+\.\S+/g) || [];
    props.alert(`Emails Found: ${emails.join(", ") || "None"}`, "success");
    setText(emails.join(", "));
  };

  const translator = async (inputText) => {
    if (!inputText.trim()) {
      props.alert("Please enter text to translate.", "warning");
      return;
    }

    if (!targetLang) {
      props.alert("Please select a target language.", "warning");
      return;
    }

    try {
      const langPair = `en|${targetLang}`; // Assuming source is English
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        inputText
      )}&langpair=${langPair}`;

      const response = await fetch(url);
      const data = await response.json();

      const translated = data?.responseData?.translatedText;

      if (!translated) {
        props.alert("No translation returned", "danger");
        return;
      }

      props.alert("Translation successful", "success");
      setText(translated);
    } catch (error) {
      console.error("Translation error:", error);
      props.alert("Translation failed", "danger");
    }
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div
      className="container"
      style={{ color: props.mode === "light" ? "black" : "white" }}
    >
      <div className="container mb-3">
        <h1>{props.heading}</h1>
        <textarea
          className="form-control"
          value={text}
          style={{
            backgroundColor: props.mode === "light" ? "white" : "black",
            color: props.mode === "light" ? "black" : "white",
          }}
          onChange={handleChange}
          id="myBox"
          rows="8"
        ></textarea>

        <div className="d-flex flex-wrap gap-2 my-3">
          <button className="btn btn-primary" onClick={handleUpper}>
            UpperCase
          </button>
          <button className="btn btn-primary" onClick={handleLower}>
            LowerCase
          </button>
          <button className="btn btn-danger" onClick={handleClear}>
            Clear
          </button>
          <button className="btn btn-primary" onClick={handleCopy}>
            Copy
          </button>
          <button className="btn btn-danger" onClick={handleSpaces}>
            Remove Spaces
          </button>
          <button className="btn btn-success" onClick={removeduplicate}>
            Remove Duplicates
          </button>
          <button className="btn btn-info" onClick={() => detectLanguage(text)}>
            Detect Language
          </button>
          <button className="btn btn-info" onClick={() => caesarEncrypt(text)}>
            Encrypt
          </button>
          <button className="btn btn-info" onClick={() => caesarDecrypt(text)}>
            Decrypt
          </button>
          <button className="btn btn-info" onClick={() => extractNumbers(text)}>
            Extract Numbers
          </button>
          <button className="btn btn-info" onClick={() => extractEmails(text)}>
            Extract Emails
          </button>
        </div>

        <select
          className="form-select my-2"
          style={{
            color: props.mode === "Light" ? "black" : "white",
            backgroundColor: props.mode === "light" ? "black" : "red",
          }}
          aria-label="Language select"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
        >
          <option >Select Language</option>
          {Object.entries(languageNames).map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>

        <button className="btn btn-info my-2" onClick={() => translator(text)}>
          Translate Text
        </button>
      </div>

      <div className="container">
        <h2>Text Summary</h2>
        <p>
          {wordCount} words | {text.length} characters
        </p>
        <p>{(wordCount * 0.008).toFixed(2)} minutes to read</p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Nothing to preview."}</p>
      </div>
    </div>
  );
}
