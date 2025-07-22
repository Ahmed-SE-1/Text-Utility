import React from 'react';
import {useState} from 'react'


export default function Textform(props) {

    const handleUpper= ()=>{
        console.log("Click")
        let newtext = text.toUpperCase();
        setText(newtext);
    }

    const handleLower=()=>{
        let newtext = text.toLowerCase();
        setText(newtext);
    }

    const handleClear= ()=>{
      let newtext = "";
      setText(newtext);
    }

    const handleCopy=()=>{
      let copy = document.getElementById("myBox")
      copy.select();
      navigator.clipboard.writeText(copy.value);
    }

    const handleSpaces =()=>{
      let spaces = text.split(/[ ]+/)
      setText(spaces.join(" "));
    }

    const handleChange = (event)=>{
        setText(event.target.value)
    }

    const[text,setText] = useState("")
  return (
    <>
    <div className='container' style={{color:props.mode==="light"?"black":"white"}}>
    <div className='container mb-3'>
        <h1>{props.heading }</h1>
      <div className='mb-3'>
        <textarea className="form-control" value={text} style={{backgroundColor:props.mode==="light"?"white":"black" ,color:props.mode==="light"?"black":"white"}} onChange={handleChange} id="myBox" rows="8"></textarea>
      </div>
      <button className="btn btn-primary me-3" onClick={handleUpper}>Convert To UpperCase</button>
      <button className="btn btn-primary me-3" onClick={handleLower}>Convert To LowerCase</button>
      <button className="btn btn-danger me-3" onClick={handleClear}>Clear Text</button>
      <button className="btn btn-primary me-3" onClick={handleCopy}>Copy Text</button>
      <button className="btn btn-danger me-3" onClick={handleSpaces}>Remove Extra Spaces</button>
    </div>
    <div className="container">
      <h2>Text Summary</h2>
      <p>{text.split(" ").length} words  {text.length} characters</p>
      <p>{text.split(" ").length * 0.008} Minutes to read the Content.</p>
      <h2>Preview</h2>
      <p>{text}</p>
    </div>
    </div>
    </>
  )
}
