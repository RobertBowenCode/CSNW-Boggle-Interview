
import { useState } from "react";
import '../style/Game.css';
export default function Game()
{

    let n = 4
    const [wordMatrix, setMatrix] = useState(Array.from({length: n},()=> Array.from({length: n}, () => null)));    //should create an empty 4 by 4 array.
    const [isFilled, setIsFilled] = useState(false);                                                                 //boolean to check that the array is full

    const[wordList, setWordList] = useState(Array());  //here is 
    const [didPlay, setDidPlay] = useState(false); 

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





    return(
        <>

       <h3>Boggle Game</h3>
       <h4>
        Current Game
       </h4>

       <div className = "game_interface">
        <WordBoard 
            onFill ={handleMatrixFill }
            matrix ={wordMatrix}
         />

        </div>
    
        </>

    ); 



}


const WordBoard= ({onFill,  matrix})=>
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


const WordList = (list, onAdd) =>{




}

const results = () =>{


    
}


