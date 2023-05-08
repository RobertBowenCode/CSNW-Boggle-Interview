
import { useState } from "react";
import '../style/Game.css';
export default function Game()
{

    let n = 4
    const [wordMatrix, setMatrix] = useState(Array.from({length: n},()=> Array.from({length: n}, () => null)));    //should create an empty 4 by 4 array.
    const [isFilled, setIsFilled] = useState(false);                                                                 //boolean to check that the array is full

    const [wordList, setWordList] = useState(["value1","value2"]); 
    const [showResults, setShowResults] = useState(false); //bool for checking if to render results


    let found_words = []
    let not_found_words = []
    
    const handleMatrixFill = (row, column, event) => {

        let result = event.target.value.replace(/[^-a-z]/ig,''); //get rid of any non alphabet letters

        if(result.length>1)
        {
            result = result.charAt(0) //make it so it can only be one character long
        }


        let copy = [...wordMatrix];
        copy[row][column] = result
        setMatrix(copy);

        let isFilled = true


        for(let i =0; i < 4; i++)
        { //check if all of the entries are filled. 
            for(let j =0; j < 4; j++)
            {
                if(copy[i][j] == null)
                { //haven't filled this yet
                    isFilled =false
                }
                else if(copy[i][j].length <1)
                { //filled but got rid of letter
                    isFilled = false
                }

                }
        }

        setIsFilled(isFilled)

        console.log(copy);
        console.log(isFilled); 
    };


    const handleListAddition = (word) => {
    
    
        word = word.replace(/[^-a-z]/ig,'');
        let list_copy = wordList; 

        if(word != null)
        { //check if we have a valid input
            if(word.length > 0)
            {
                list_copy.push(word) //add the word to the list
                setWordList(list_copy)
                console.log(list_copy)
            }

        }

     
     


    }; 

    const handleListRemoval = (word) => {


        let list_copy = wordList; 
        let result = list_copy.filter(e => e !== word); // return the other words. 
        setWordList(result)
        console.log(result)
    }; 





    return(
        <>

       <h3>Boggle Game</h3>
       <h4>
        Current Game
       </h4>

       <div className = "game_interface">

        <WordBoardComponent
            onFill ={handleMatrixFill }
            matrix ={wordMatrix}
         />

         <WordListComponent
            wordList ={wordList}
            onAdd ={handleListAddition}
            onRemove ={handleListRemoval}
         />

        </div>
    
        </>

    ); 



}


const WordBoardComponent = ({onFill,  matrix})=>
{ //this is going to display a board and have functions that will change the state of 2d array in Game component 

    return(
    <div className="Board">
        
        <table>
            <tbody>
            {matrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {row.map((column, columnIndex) => (
                        <td key={columnIndex}>
                        <input
                        type="text"
                        onChange={(e) => onFill(rowIndex, columnIndex, e)}
                        value={matrix[rowIndex][columnIndex] == null ? '' : matrix[rowIndex][columnIndex]  }
                        />
                        </td>
                    ))}
                </tr>
                ))}
            </tbody>
        </table>

        <div className="caption">
        <h5>Fill Me In!</h5>
        </div>

    </div>
    ); 


}


const ListComponent = ({word, onRemove}) => {

    return(

        <div className = "list_item">
            {word}
            <button onClick={ ()=> {onRemove(word)}}>Remove</button>;

        </div>

    )
}

const WordListComponent = ({wordList, onAdd, onRemove}) => {

    
    const [chosenWord, setChosenWord] = useState(''); 

   
    const listItems = wordList.map( (word) =>//create list of potential words
           <ListComponent 
            word = {word}
            onRemove= {onRemove}
           />
); 


   return(
    <div>
        <h5>    
            Your Chosen Words!
        </h5>
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

const results = () =>{



}


