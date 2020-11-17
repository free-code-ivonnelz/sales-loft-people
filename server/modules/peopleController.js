const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const peopleApi = process.env.SALES_LOFT || 'https://api.salesloft.com/v2/people.json';
const apiKey = process.env.API_KEY;

const PeopleController = {

    //get all employees
    getPeople: function (req, res) {
        const options = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + apiKey
            }
        }
        axios.get(`${peopleApi}`, options).then(response => {
            res.status(200).json(response.data.data);
        }).catch(error => {
            res.status(500).send(error);
        });
    }
}

module.exports = exports = PeopleController;