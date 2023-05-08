
import './style/App.css';
import Header from "./components/AppHeader"
import Game from "./components/Game"
import History from './components/History'
import axios from "axios"
import { useState, useEffect } from 'react';




function App() {


  const [historys, setHistory] = useState([]); 
  const [showHistory, setShowHistory] = useState(false); 


  useEffect(() => {
    fetch('/api/historys').then(res => res.json()).then(new_history =>{

      setHistory({new_history: new_history}); 
      console.log(new_history); 
    }); 
  }, []);

  useEffect (() => {

    if(showHistory.length > 0)
    {
      setShowHistory(true); 
    }
    else{
      setShowHistory(false); 
    }

  }, [historys])



  const addToHistory = (board, found_words, words) =>
  {

   
    const new_history = {
      "board" : board, 
      "words" : words, 
      "found_words" : found_words,
    }

    fetch('http://localhost:1234/api/historys', 
    {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(new_history), 

    }).then( ()=> 
    {

      console.log("history added"); 

    })


    //update state
    let history_copy = historys; 
    history_copy.push(new_history); 
    setHistory(history_copy); 


  }




  return(
    <div className ="app">
      <Header/>
      <Game onSaveHistory ={addToHistory}/>
      {showHistory ? <History current_history = {historys}/> : <> <h2>No Available Game History</h2></>}
    </div>
  )

}




export default App;
