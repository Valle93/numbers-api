const app = require('express')();
const port = process.env.PORT ||8080;

const server = app.listen(
    port,
    () => console.log('server open on ' + port)
)

const tooBig = 'must not be more than 6 digits'
const notNumber = 'must be a number'
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
var mapOfNumbers = new Map()
var indexOfMap = 1

app.get('/', (req, res) => {

    res.status(200).send('hello user')
})

function isItDigit(char){

    for(var i = 0; i < numbers.length; i++){

        if(char == numbers[i]){

            return true
        }
    }

    return false;
}

function isItNumber(input){

    for(var i = 0; i < input.length; i++){

        if(isItDigit(input.charAt(i)) == false){

            return false;
        }
    }

    return true;

}

app.post('/:number', (req, res) => {

    const input = req.params.number;

    if(input.length > 6){

        return res.status(200).send(tooBig);
    }

    if(isItNumber(input) == false){

        return res.status(200).send(notNumber)
    }

    const number = parseInt(input)

    mapOfNumbers.set(indexOfMap, number)

    indexOfMap++

    return res.status(200).send(input)

})

module.exports = server;