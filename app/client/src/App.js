
import './style/App.css';
import Header from "./components/AppHeader"
import Game from "./components/Game"
import { useState, useEffect } from 'react';




function App() {


  const [historys, setHistory] = useState([]); 
  const [showHistory, setShowHistory] = useState(false); 


  useEffect(() => {
    fetch('/api/historys').then(res => res.json()).then(history =>{

      setHistory({history: history}); 
      console.log(history); 
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






  return(
    <div className ="app">
      <Header/>
      <Game/>
      
    </div>
  )

}




export default App;
