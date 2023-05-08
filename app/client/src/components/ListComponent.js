import '../style/Game.css';

const ListComponent = ({word, onRemove, my_key}) => {

    return(

        <div className = "list_item" key = {my_key}>
            {word}
            { onRemove!=null ? <button key = {my_key} onClick={ ()=> {onRemove(word)}}>Remove</button> : <></>};

        </div>

    )
}

export default ListComponent