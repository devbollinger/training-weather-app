const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGJvbGxpbmdlcjgwIiwiYSI6ImNrYjNxaTFqbjBuZnIycnFwd2V3djlsMDAifQ.NTp3CU85q8u6qgbbRm2u5g&limit=1'

    request({ url, json: true }, (error, { body }) => {

    // console.log(response.body)

        if (error) {
            callback('Unable to connect to the api', undefined)

        }else if (body.features.length === 0) {
            callback('No match found', undefined)
        }
        else{

            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }

    })
}


module.exports = geocode
