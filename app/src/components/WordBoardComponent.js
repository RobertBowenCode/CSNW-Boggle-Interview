
import '../style/Game.css';

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

export default WordBoardComponent




