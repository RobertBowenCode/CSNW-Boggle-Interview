import './global.js';
import '../style/Game.css';
import ListComponent from './ListComponent'


const ResultComponent = ({found_words, all_words})=>
{

    
    let not_found_words = all_words

    found_words?.forEach(

       (word) =>
       {
           not_found_words = not_found_words.filter((e) => e!== word);

       }


    )

       //create lists
    const included_words = found_words.map( (word, key)=>   
    <ListComponent 
    word = {word}
    onRemove= {null}
    key = {key}
   /> )



   const not_included_words = not_found_words.map( (word, key)=>   
   <ListComponent 
    word = {word}
    onRemove= {null}
    key = {key}
   /> )

   return(

    <div>
        <div>
            <h3 className='found'>
                Found Words
            </h3>
            <ul>{included_words}</ul>
            

        </div>

        <div>
            <h3 className='not_found'>
                Missed Words
            </h3>
            <ul> {not_included_words} </ul>
            

        </div>
       


    </div>

   ); 

}


export default ResultComponent