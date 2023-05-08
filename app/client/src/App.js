
import './style/App.css';
import Header from "./components/AppHeader"
import Game from "./components/Game"
import History from './components/History'

import { useState, useEffect } from 'react';




function App() {


  const [historys, setHistory] = useState([]); 
  const [showHistory, setShowHistory] = useState(false); 
  let startup = true; 

  useEffect(() => {
    if(startup)
    {
      fetch('/api/historys').then(res => res.json()).then(new_history =>{
        setHistory(new_history); 
   
      });
      startup = false; 
  } 
  }, []);

  useEffect (() => {

    if(historys.length > 0)
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
     
      "words" : words, 
      "found_words" : found_words,
      "board" : board,

        }

    fetch('http://localhost:1234/api/historys', 
    {
      mode: 'cors',
      method: 'POST', 
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(new_history), 
    

    }).then( ()=> 
    {

      console.log("history added"); 

    })

    

    //update state

    console.log(historys)
    setHistory( [ // with a new array
    ...historys, // that contains all the old items
    new_history // and one new item at the end
  ]); 


  }




  return(
    <div className ="app">
      <Header/>
      <Game onSaveHistory ={ addToHistory }/>
      {showHistory ? <History current_history = {historys}/> : <> <h2>No Available Game History</h2></>}
    </div>
  )

}




export default App;
