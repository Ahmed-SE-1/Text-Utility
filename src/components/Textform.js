import React from "react";
import { useState } from "react";

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
  sv: "Swedish"
  // Add more as needed
};


  const handleUpper = () => {
    console.log("Click");
    let newtext = text.toUpperCase();
    setText(newtext);
  };

  const handleLower = () => {
    let newtext = text.toLowerCase();
    setText(newtext);
  };

  const handleClear = () => {
    let newtext = "";
    setText(newtext);
  };

  const handleCopy = () => {
    let copy = document.getElementById("myBox");
    copy.select();
    navigator.clipboard.writeText(copy.value);
  };

  const handleSpaces = () => {
    let spaces = text.split(/[ ]+/);
    setText(spaces.join(" "));
  };

  const detectLanguage = async (inputtext) => {
  try {
    const response = await fetch("https://ws.detectlanguage.com/0.2/detect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer f9b89a878ceda1cde75672cd07a43319"
      },
      body: JSON.stringify({ q: inputtext })
    });

    const { data } = await response.json();
    const result = data.detections[0];
    const code = result.language;
    const confidence = result.confidence;
    
    const fullName = languageNames[code] || "Unknown Language";

    props.alert(
      `Detected language: ${fullName.toUpperCase()} (${code}) — ${(confidence * 100).toFixed(1)}% confidence`,
      "success"
    );
    setText(fullName.toUpperCase())
  } catch (error) {
    console.error("Error detecting language:", error);
    props.alert("Language detection failed", "danger");
  }
};

const caesarEncrypt = (inputtext, shift = 3) => {
  const encryptedText = inputtext.replace(/[a-z]/gi, (char) => {
    const base = char === char.toUpperCase() ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
  });
  props.alert(`Encrypt Text: ${encryptedText}`, "success");
  setText(encryptedText)
};

const caesarDecrypt = (inputtext, shift = 3) => {
  const decryptedText = inputtext.replace(/[a-z]/gi, (char) => {
    const base = char === char.toUpperCase() ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - base + (26 - shift)) % 26) + base);
  });
  props.alert(`Decrypt Text: ${decryptedText}`, "success");
  setText(decryptedText)
};

const extractNumbers = (inputtext) => {
  const numbers = inputtext.match(/\d+/g)?.map(Number) || [];
  props.alert(`Numbers Found: ${numbers.join(", ") || "None"}`, "success");
  setText(numbers.join(", "))
};

const extractEmails = (inputtext) => {
  const emails = inputtext.match(/\S+@\S+\.\S+/g) || [];
  props.alert(`Emails Found: ${emails.join(", ") || "None"}`, "success");
  setText(emails.join(", "))
};

  const removeduplicate = () => {
    let duplicate = text.split(/\s+/);
    let unique = [...new Set(duplicate)];
    setText(unique.join(" "));
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const [text, setText] = useState("");
  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "light" ? "black" : "white" }}
      >
        <div className="container mb-3">
          <h1>{props.heading}</h1>
          <div className="mb-3">
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
          </div>
          <button className="btn btn-primary me-3" onClick={handleUpper}>
            Convert To UpperCase
          </button>
          <button className="btn btn-primary me-3" onClick={handleLower}>
            Convert To LowerCase
          </button>
          <button className="btn btn-danger me-3" onClick={handleClear}>
            Clear Text
          </button>
          <button className="btn btn-primary me-3" onClick={handleCopy}>
            Copy Text
          </button>
          <button className="btn btn-danger me-3" onClick={handleSpaces}>
            Remove Extra Spaces
          </button>
          <button className="btn btn-success me-3" onClick={removeduplicate}>
            Remove Duplicate Words
          </button>
          <button className="btn btn-info me-3 my-3" onClick={()=>detectLanguage(text)}>
            Detect Language
          </button>
          <button className="btn btn-info me-3 my-3" onClick={()=>caesarEncrypt(text,3)}>
            Encrypt Text
          </button>
          <button className="btn btn-info me-3 my-3" onClick={()=>caesarDecrypt(text,3)}>
            Decrypt Text
          </button>
          <button className="btn btn-info me-3 my-3" onClick={()=>extractNumbers(text)}>
            Extract Numbers
          </button>
          <button className="btn btn-info me-3 my-3" onClick={()=>extractEmails(text)}>
            Extract Emails
          </button>
        </div>
        <div className="container">
          <h2>Text Summary</h2>
          <p>
            {text.split(" ").length} words {text.length} characters
          </p>
          <p>{text.split(" ").length * 0.008} Minutes to read the Content.</p>
          <h2>Preview</h2>
          <p>{text}</p>
        </div>
      </div>
    </>
  );
}
