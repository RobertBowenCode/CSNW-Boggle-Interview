

import ListComponent from './ListComponent'
import '../style/Game.css';



const GameHistoryComponent = ({my_key, matrix, words, found_words}) => {

    let not_found_words = words

    found_words?.forEach(

       (word) =>
       {
           not_found_words = not_found_words.filter((e) => e!== word);

       }


    )



    const not_found_list = not_found_words.map( (word, key) =>//create list of potential words
    <ListComponent 
     word = {word}
     onRemove= {null}
     key = {key}
    />)

    const found_list =  found_words.map( (word, key) =>//create list of potential words
    <ListComponent 
     word = {word}
     onRemove= {null}
     key = {key}
    />)



    return(
        <div className="Board" key = {my_key}>
            <h3>
                Word Board
            </h3>
            <table>
                <tbody>
                {matrix.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((column, columnIndex) => (
                            <td key={columnIndex}>
                            {matrix[rowIndex][columnIndex] == null ? '' : matrix[rowIndex][columnIndex]  }
                            </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>

            <div className="caption" >
            </div>



            <div  >
            <div >
                <h3 className='found'>
                    Found Words
                </h3>
                <ul>{found_list}</ul>
                

            </div>

            <div   >
                <h3 className='not_found'>
                    Missed Words
                </h3>
                <ul> {not_found_list} </ul>
                

            </div>
        


        </div>
    </div>
       

       

    )
}

export default GameHistoryComponent