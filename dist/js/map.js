
var map;
function parkingMap() {
    map = new google.maps.Map(document.getElementById('parking_map'), {
        center: { lat: 40.6427133, lng: -8.7455922 },
        zoom: 18,
        mapTypeId: 'satellite'
    });
};


function getMarkers() {
    $.when(
        $.ajax('https://pasmo.es.av.it.pt/api/parking/availableSensors?state=available'),
        $.ajax('https://pasmo.es.av.it.pt/api/parking/latestValues')
    )
        .then(function (avail, latest) {
            var data = []
            for (var i in avail[0].sensor_info) {
                data[i] = {
                    'pos': new google.maps.LatLng(parseFloat(avail[0].sensor_info[i]['lat']), parseFloat(avail[0].sensor_info[i]['long'])),
                    'icon': "./img/p_logo.png",
                    'sensor_id': avail[0].sensor_info[i]['sensor_id']
                }
            };
            handleOccupationRequest(latest[0], data)
        })
        .fail(function (err) {
            console.log('Something went wrong', err);
        });
}

function handleOccupationRequest(latest, data){

    for (var d in latest) {
        for(var i in data){
            if(data[i].sensor_id == latest[d].sensor_id){
                data[i].icon="./img/p_logo_" +latest[d].status+ ".png"

                marker = new google.maps.Marker({
                    position: data[i].pos,
                    map: map,
                    icon: data[i].icon
                  });
            }
        }
    }
}
