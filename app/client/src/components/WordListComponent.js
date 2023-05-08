
import { useState} from 'react';
import ListComponent from './ListComponent'
import '../style/Game.css';



const WordListComponent = ({wordList, onAdd, onRemove}) => {

    
    const [chosenWord, setChosenWord] = useState(''); 

   
    const listItems = wordList.map( (word, key) =>//create list of potential words
           <ListComponent 
            word = {word}
            onRemove= {onRemove}
            key = {key}
           />
); 


   return(
    <div>

            {wordList.length === 0 ? <h5> You haven't added any words!</h5> : <h5>Your Chosen Words</h5>}
  
        <div className="item_list"> 

        
       <ul>  {listItems} </ul>

       </div>

       <input
        type="text"
        onChange={(e)=>{ setChosenWord(e.target.value)}}
        value = {chosenWord}
        />
        <button onClick={ ()=>{
            //submit the chosen word to the list and reset
            onAdd(chosenWord); 
            setChosenWord(''); 
        }
            
            }>Add Word</button>;


    </div>
   ); 



}

export default WordListComponent