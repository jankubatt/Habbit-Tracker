/*
    Author: Jan Kubat
    Web: jankubat-it.cz
    Twitter: JanKubat8
*/

function changeColor(color) {
    $.ajax({
        url: `/changeColor?color=${color}`,
        type: 'GET'
    });
}