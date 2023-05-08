
import GameHistoryComponent from './GameHistoryComponent'


export default function History(current_history){


console.log(current_history)

const listItems = current_history.map( (history, key) =>//create list of potential words
<GameHistoryComponent 
 matrix = {history["board"]}
 words= {history["words"]}
 found_words = {history["found_words"]}
 my_key = {key}
/>


); 

    

return(

    <>
        <h3> Game History</h3>
        {listItems}
    </>
)





}