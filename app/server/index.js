const express = require('express'); 
const app = express(); 
const cors = require('cors');


app.use(express.json())


app.use(cors({ //allows us to communicate to client
    origin: 'http://localhost:3000'
}));


let historys = [ ]

app.get('/api', (req,res) => {

    res.send('Boggle Game API'); 

}); 


app.get('/api/historys', (req,res) => {

    res.send(historys); 

}); 


app.post('/api/historys', (req, res) =>{

    if(!req.body.board || req.body.board.length ==0 || !req.body.words || req.body.words.length < 0 || !req.body.found_words)
    { //handle invalid input
       res.status(400).send("Bad Input"); 
       return; 
    }

    const history = {

        id: historys.length + 1,
        board: req.body.board,
        words: req.body.words, 
        found_words: req.body.found_words, 
    }

    historys.push(history)
    res.send(history)


})


app.listen(1234); 
