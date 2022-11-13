const app = require('express')();
const port = process.env.PORT ||8080;
const path = require('path');

const server = app.listen(
    port,
    () => console.log('server open on ' + port)
)

const tooBig = 'must not be more than 6 digits'
const notNumber = 'must be a number'
const notAnId = 'no number with such id'
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
var mapOfNumbers = new Map()
var indexOfMap = 1

app.get('/', (req, res) => {

    res.status(200).sendFile(path.join(__dirname) + "/views/index.html")
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

app.get('/getall', (req, res) => {

    return res.status(200).send(JSON.stringify(Object.fromEntries(mapOfNumbers)));
})

app.get('/getbyid/:id', (req, res) => {

    const inputid = req.params.id;

    if(isItNumber(inputid) == false){

        return res.status(200).send(notNumber);
    }

    const id = parseInt(inputid);

    if(mapOfNumbers.has(id) == false){

        return res.status(200).send(notAnId);
    }

    return res.status(200).send(mapOfNumbers.get(id) + '')

})

app.put('/:id/:number', (req, res) => {

    const inputid = req.params.id

    const inputnumber = req.params.number

    if(isItNumber(inputid) == false || isItNumber(inputnumber) == false){

        return res.status(200).send('id and number must be of type number !')
    }

    if(inputnumber.length > 6){

        return res.status(200).send(tooBig)
    }

    const id = parseInt(inputid);

    const number = parseInt(inputnumber)

    if(mapOfNumbers.has(id) == false){

        return res.status(200).send(notAnId)
    }

    mapOfNumbers.set(id, number);

    return res.status(200).send('number with id : ' + id + ' set to ' + number);

})

app.delete('/:id', (req, res) => {

    const inputid = req.params.id

    if(isItNumber(inputid) == false){

        return res.status(200).send(notNumber)
    }

    const id = parseInt(inputid)

    if(mapOfNumbers.has(id) == false){

        return res.status(200).send(notAnId)
    }

    mapOfNumbers.delete(id);

    return res.status(200).send('number with id : ' + id + ' deleted')

})

module.exports = server;