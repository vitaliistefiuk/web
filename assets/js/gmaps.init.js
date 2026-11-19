$(function () {
    if (typeof L !== 'undefined' && document.getElementById('map')) {
        map();
    }
});

function map() {
    var cityMap = L.map('map', {
        center: [48.91722222, 24.70722222],
        zoom: 12,
        zoomControl: false,
        scrollWheelZoom: false
    });

    L.control.zoom({
        zoomInTitle: 'Наблизити',
        zoomOutTitle: 'Віддалити'
    }).addTo(cityMap);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">Учасники OpenStreetMap</a>'
    }).addTo(cityMap);
}
