import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useQuery} from "@apollo/client";
import { QUERY_FILES } from '../utils/queries'
import 'react-toastify/dist/ReactToastify.css';
import GIFpeople from "../images/original (1).webp"
import { SAVE_WORK} from "../utils/mutations";
import Auth from '../utils/auth'
import { useMutation } from "@apollo/client";
import Login from '../pages/Loginpage.js'

const AiNavBar = ({code, updateCodeMirrorValue, sendToParent, setFiles}) => {
  const [saveWork, {loading}] = useMutation(SAVE_WORK,{ refetchQueries: [QUERY_FILES],});
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [aiResponse, setAiResponse ] = useState("Generate Your Question By Pressing Get Question Above!");
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [aiCheckingWork, setAiCheckingWork] = useState(null)
  const [showDropdownLang, setShowDropdownLang] = useState(false);
  const [showDropdownLevel, setShowDropdownLevel] = useState(false);
  const [showDropdownConcept, setShowDropdownConcept] = useState(false);
  const [savedResponse, setSavedResponse] = useState(null);
  const [aiSolution, setAiSolution ] = useState(null)
  const [saveButton, setSaveButton] = useState(null)
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  const toggleDropdownLang = () => {
    setShowDropdownLang(!showDropdownLang); // drop down menu to toggle languages
  };
  
  const toggleDropdownLevel = () => {
    setShowDropdownLevel(!showDropdownLevel); //drop down menu to toggle difficulty level
  };
  
  const toggleDropdownConcept = () => {
    setShowDropdownConcept(!showDropdownConcept); // drop down menu to toggle concept
  };
  
  const handleLanguageSelection = (language) => {
    setSelectedLanguage(language === selectedLanguage ? null : language); //if language is selected change state of drop down menu
    toggleDropdownLang();
  };
  
  const handleLevelSelection = (level) => {
    setSelectedLevel(level === selectedLevel ? null : level); // if diffculty level is selected change state of drop down menu
    toggleDropdownLevel();
  };
  
  const handleConceptSelection = (concept) => {
    setSelectedConcept(concept === selectedConcept ? null : concept); // if concept level is selected change state of drop down menu
    toggleDropdownConcept();
  };
  
  
  const handleSelectedChoices = async (selectedLanguage, selectedLevel, selectedConcept) =>{   //send and recieve post request to openai after selecting all required fields
    if (selectedLanguage == null || selectedLevel == null || selectedConcept == null){
      toast("You Must Select a Language, Level and Concept before starting!");
      return; }
      let question = `Give me a coding algorithm question. The coding language is ${selectedLanguage}, make the difficulty level ${selectedLevel}, and make the concept on ${selectedConcept}. Give me starting data to work with but DO NOT show me how to solve it yet.`

      const url = window.location.origin + '/airesponse';
      const response = await toast.promise(
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',},
            body: JSON.stringify({ prompt: question}),
    }),
    {
      pending: `Thinking Of ${selectedLanguage} ${selectedConcept} Question 🤔`,
      success: 'New Question!👌',
      error: 'Error Recieving Response 🤯'
    });
    let responseData = await response.json();
    setAiResponse(responseData.data)
    setSavedResponse(responseData.data);
    setAiCheckingWork(null) 
    setSaveButton(null)
    return responseData; 
  }

const sendResponse = async () =>{ //send message including user's code to check on how user did
  let aiResponse = savedResponse;
  if (aiResponse === null){
    toast("You Must Select a Language, Level and Concept before getting a response!");
    return; 
  }

  let userCode = `${code}`
  let toAi = `How does my code look? The question I was asked is here in quotes: "${aiResponse}". and my code is here in quotes: "${userCode}"... Analyze the code indept and the question! Tell me if the solution code answers the question in the correct language. If it is not correct give me a hint on how i would solve it but do not show me the full solution.`

  const url = window.location.origin + '/airesponse';
    const response = await toast.promise(
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',},
      body: JSON.stringify({ prompt: toAi}),
    }),{
      pending: 'Reviewing Your Code 📄 🤔',
      success: 'Reviewed 🤓',
      error: 'Error Recieving Response 🤯'
    });
    let responseData = await response.json();
    setAiCheckingWork(responseData.data) //set chat to aiResponse
  }

const getSolution = async (selectedLanguage) =>{ //get solution code from ai if user could not figure it out

  if (aiResponse === "Generate Your Question By Pressing Get Question Above!"){
    toast("You Must Select a Language, Level and Concept and Generate A Question Before Recieving a Solution!");
    return;
  }
  let toAi = `Can you show me the solution code. The question was ${aiResponse}. The programming language is ${selectedLanguage}`

  const url = window.location.origin + '/airesponse';
    const response = await toast.promise(
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: toAi}),
    }
    ),{
      pending: 'Thinking of Solution 🤔',
      success: 'Solution Found 👌',
      error: 'Error Recieving Response 🤯'
    });
    let responseData = await response.json();
    
    const newCodeString = responseData.data.replace(/\s{2,}/g, '\n');

    setAiSolution(responseData.data)
    setSaveButton(<button style={{ marginLeft: '10px', padding: '8px 15px', border: 'none', backgroundColor: '#4caf50',
    color: '#ffffff', borderRadius: '3px', cursor: 'pointer'}} onClick={()=> saveFile()}> Save Algorithm Solution</button>)
    updateCodeMirrorValue(newCodeString)
}

setFiles("filesssssss")
const saveFile = async ()=>{
try{
const question = `${aiResponse}`
let solution = document.querySelector(".cm-content").innerText;
let files = question + '\n' + `${solution}`;

const {data} = await saveWork({
  variables: { solutionData: {
    question: question,
    solution: solution
  }}})
toast("Saved ✅")
}catch(err){
  console.error.apply(err)
  toast("Error Saving")
}
}
return (
  <>
  <nav className =" flex flex-col -z-[399] " style={{ backgroundColor: "#000", padding: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className=" ">
        <div className="relative z-[0]">
          <button className="language  " style={{color: "#fff",cursor: "pointer",backgroundColor: "transparent",border: "none",
              outline: "none",padding: "5px",}} onClick={toggleDropdownLang}>
            {selectedLanguage ? selectedLanguage : "Languages"} ▼ 
          </button>
          {showDropdownLang && (
            <ul className="  -z-9"
              style={{ position: "absolute", backgroundColor: "#333", color: "#fff", padding: "10px", borderRadius: "5px",
                top: "100%", left: "0",}}>
              <li>
                <a style={{ textDecoration: "none", color: "#fff", zIndex: "1", cursor: "pointer" }}
                  onClick={() => handleLanguageSelection("JavaScript")}> JavaScript</a>
              </li>
              <li>
                <a style={{ textDecoration: "none", color: "#fff", zIndex: "1", cursor: "pointer" }}
                  onClick={() => handleLanguageSelection("Python")}>Python</a>
              </li>
              <li>
                <a style={{ textDecoration: "none", color: "#fff", zIndex: "1", cursor: "pointer" }}
                  onClick={() => handleLanguageSelection("C++")}> C++</a>
              </li>
            </ul>)}
            </div>
        </div>
        <div className="relative">
          <button style={{color: "#fff",cursor: "pointer", backgroundColor: "transparent", border: "none",
          outline: "none", padding: "5px",}} onClick={toggleDropdownLevel}>
          {selectedLevel ? selectedLevel : "Difficulty Level"} ▼
          </button>
          {showDropdownLevel && (
            <ul style={{ position: "absolute", backgroundColor: "#333", color: "#fff", padding: "10px", borderRadius: "5px",
            top: "100%", left: "-10px", zIndex: "1", }}>
              <li>
                <a style={{ textDecoration : "none", color: "#fff", zIndex: "1", cursor: "pointer" }}
                  onClick={() => handleLevelSelection("Beginner")}>Beginner </a>
                  </li>
                  <li>
                  <a style={{ textDecoration: "none", color: "#fff", zIndex: "1", cursor: "pointer" }}
                  onClick={() => handleLevelSelection("Intermediate")}>Intermediate</a>
                  </li>
                  <li>
                <a style={{ textDecoration : "none", color: "#fff", zIndex: "1", cursor: "pointer" }}
                  onClick={() => handleLevelSelection("Difficult")}>Difficult</a>
                  </li>
                  <li>
                <a style={{ textDecoration : "none", color: "#fff", zIndex: "1", cursor: "pointer" }}
                  onClick={() => handleLevelSelection("Very Difficult")}>Very Difficult</a>
                  </li>
                  </ul>)} </div>
                  <div className="relative">
                  <button style={{color: "#fff",cursor: "pointer",backgroundColor: "transparent",border: "none",
                  outline: "none",padding: "5px",}}onClick={toggleDropdownConcept}>
                  {selectedConcept ? selectedConcept : "Concept"} ▼
                  </button>
                  {showDropdownConcept && (
                  <ul style={{position: "absolute",backgroundColor: "#333",color: "#fff",padding: "10px",borderRadius: "5px",
                  top: "100%",left: "-30px", zIndex: "9999",}}>
                  <li>
                  <a style={{ textDecoration: "none", color: "#fff", zIndex: "9999", cursor: "pointer" }}
                  onClick={() => handleConceptSelection("Functions")}>Functional Programming</a>
                  </li>
                  <li>
                  <a style={{ textDecoration: "none", color: "#fff", zIndex: "9999", cursor: "pointer" }}
                  onClick={() => handleConceptSelection("Arrays")}>Arrays</a>
                  </li>
                  <li>
                  <a style={{ textDecoration: "none", color: "#fff", zIndex: "9999", cursor: "pointer" }}
                  onClick={() => handleConceptSelection("Strings")}>Strings</a>
                  </li>
                  <li>
                  <a style={{ textDecoration: "none", color: "#fff", zIndex: "9999", cursor: "pointer" }}
                  onClick={() => handleConceptSelection("Regular Expressions")}>Regular Expressions</a>
                  </li>
                  <li>
                  <a style={{ textDecoration: "none", color: "#fff", zIndex: "9999", cursor: "pointer" }}
                  onClick={() => handleConceptSelection("OOP (Object Oriented Programming)")}>
                  OOP (Object Oriented Programming)
                  </a>
                  </li> </ul>)}
                  </div> </div>
                  <div style={{ marginTop: "10px", color: "#fff" }}>
                  Selected Choices: {selectedLanguage} {selectedLevel} {selectedConcept}
                  <br />
                  <button style={{marginLeft: '10px', padding: '8px 15px', border: 'none', backgroundColor: '#4caf50',
                  color: '#ffffff', borderRadius: '3px', cursor: 'pointer'}} onClick={() => handleSelectedChoices(selectedLanguage, selectedLevel, selectedConcept)}>
                  Get Question
                    </button>
               </div>
                  </nav>
                  <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', margin: 0, padding: '20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#ffffff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '5px', overflow: 'hidden' }}>
        <div style={{ backgroundColor: '#f0f0f0', padding: '10px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>
          Chat
        </div>
        <div style={{ padding: '20px', maxHeight: '400px', overflowY: 'scroll' }}>
          <div style={{ marginBottom: '10px' }}>
            <span style={{ fontWeight: 'bold' }}>Question:</span>
            <div style={{ marginTop: '5px', overflowY: 'scroll', overflowX: 'scroll' }}>  
              {aiResponse}
              </div>
              <div style={{ marginTop: '5px', overflowY: 'scroll', overflowX: 'scroll', color: '#40140A' }}>  
              {aiCheckingWork}
              </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#f0f0f0' }}>
          <button style={{ marginLeft: '10px', padding: '8px 15px', border: 'none', backgroundColor: '#4caf50',
           color: '#ffffff', borderRadius: '3px', cursor: 'pointer'}} onClick={()=> sendResponse()}> Submit Your Code</button>
           <button style={{ marginLeft: '10px', padding: '8px 15px', border: 'none', backgroundColor: '#4caf50',
           color: '#ffffff', borderRadius: '3px', cursor: 'pointer'}} onClick={()=> getSolution(selectedLanguage)}> Get Solution</button>
           {saveButton}
        </div> 
      </div>
    </div>
    <ToastContainer />
        </>  ); };
       export default AiNavBar;

               
