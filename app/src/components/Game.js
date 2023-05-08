
import { useState } from "react";

import '../style/Game.css';
import './global.js'

export default function Game()
{

  
    let n = global.board_size
    const [wordMatrix, setMatrix] = useState(Array.from({length: n},()=> Array.from({length: n}, () => null)));    //should create an empty 4 by 4 array.
    const [isFilled, setIsFilled] = useState(false);                                                                 //boolean to check that the array is full

    const [wordList, setWordList] = useState([]); 
    const [showResults, setShowResults] = useState(false); //bool for checking if to render results

    //Result State
    const [FoundWords, setFoundWords] = useState([]);
    const [notFoundWords, setNotFoundWords] = useState([]); 





  

    //State change function handlers. 
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

    const handleResults = (found_words, not_found_words) =>{

        setFoundWords(found_words)
        setNotFoundWords(not_found_words); 
        setShowResults(true); 

    }




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


         { //only display play button if we can play
            isFilled && wordList.length >0 ? 
            <button onClick = { ()=> {
                
                
                console.log("tried playing")
                console.log(wordList)
                console.log(wordMatrix)
        
        }}>Play Boggle!</button > :
            <h4> Please add some words and fill in the word board to play Boggle</h4>
         }


         {global.finished_game ? <ResultComponent 
            include = {FoundWords}
            excluded= {notFoundWords}
         />: <></>}



        </div>
    
        </>

    ); 



}

function PlayBoggle(boggle_board, words, updateResults)
{
    words.array.forEach(word => {

         let entrance = word.charAt(0); 

         for(let i = 0; i < 4; i++)
         {
            for(let j = 0; j < 4; j++)
            {
                if(entrance == boggle_board[i][j])
                { //we found an entrance in the boggle board to start searching 
                    global.paint_map = Array.from({length: n},()=> Array.from({length: n}, () => false)) //get a fresh unpainted map
                    recursivelyFindAllWords(word, word, i, j, boggle_board) //recursively search if it can be found
                    global.finish_traversal = false; 
                }

            }

         }
        
        

    });

    //handle game finished
    global.finished_game = true; 

    let found_words = global.found_words;
    let not_found_words = words

     found_words.forEach(

        (word) =>
        {
            not_found_words = not_found_words.filter((e) => e!== word);

        }


     )

     updateResults(found_words, not_found_words); 



}



//Algorithm is O(m*n), where m is largest word in the list and n is the number of words. 
function recursivelyFindAllWords(word, remaining, row , col, boggle_board)
{

    if(global.finish_traversal)
    { //we have finished this current word traversal
        return; //just return we're done
        
    }
    

    //base case
    if(remaining.length == 0)
    { //if we've traversed 2d array and have gotten to each word
        global.found_words.push(word); 
    }

  

   //Edge Case Checking
    if(checkInBounds(row,col) == false  )
    { //we're out of bounds 
        return; 
    }
    else if(global.paint_map[row][col])
    { //we've been here already
        return; 
    }


    
    if(boggle_board[row][col] == remaining.char(0))
    { //we found the next spot!

        global.painted_map[row][col] = true; 

        //try all of the other directions
        let new_remaining = remaining.substring(1); //get remaining letters we need to find

        recursivelyFindAllWords(word,  new_remaining, row-1, col, boggle_board) //square above

        recursivelyFindAllWords(word,  new_remaining, row+1, col, boggle_board) //square below

        recursivelyFindAllWords(word,  new_remaining, row, col-1, boggle_board) //square left

        recursivelyFindAllWords(word,  new_remaining, row, col+1, boggle_board) //square right

        recursivelyFindAllWords(word,  new_remaining, row-1, col-1, boggle_board) //upper left corner

        recursivelyFindAllWords(word,  new_remaining, row+1, col+1, boggle_board) //lower right

        recursivelyFindAllWords(word,  new_remaining, row+1, col-1, boggle_board) //lower left

        recursivelyFindAllWords(word,  new_remaining, row-1, col+1, boggle_board) //upper right


    }


}


function checkInBounds(row, col)
{

    if(row < 0)
    {

    }
    else if(row >= global.board_size)
    {


    } else if (col < 0)
    {


    }
    else if ( col >= global.board_size)
    {


    }

}




const ResultComponent = ({included, excluded})=>
{


    const included_words = included.map( (word, key)=>   <ListComponent 
    word = {word}
    onRemove= {null}
    key = {key}
   /> )

   const not_included_words = excluded.map( (word, key)=>   <ListComponent 
    word = {word}
    onRemove= {null}
    key = {key}
   /> )

   return(

    <div>
        <div>
            <h3>
                Found Words
            </h3>
            {included_words}

        </div>

        <div>
            <h3>
                Missed Words
            </h3>
            {not_included_words}

        </div>
       


    </div>

   ); 

}






//


const WordBoardComponent = ({onFill,  matrix})=>
{ //this is going to display a board and have functions that will change the state of 2d array in Game component 

    return(
    <div className="Board">
        <h3>
            Word Board
        </h3>
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


const ListComponent = ({word, onRemove, my_key}) => {

    return(

        <div className = "list_item" key = {my_key}>
            {word}
            { onRemove!=null ? <button key = {my_key} onClick={ ()=> {onRemove(word)}}>Remove</button> : <></>};

        </div>

    )
}

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

            {wordList.length ==0 ? <h5> You haven't added any words!</h5> : <h5>Your Chosen Words</h5>}
  
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


