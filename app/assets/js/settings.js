function changeColor(color) {
    $.when($.ajax({
        url: `http://localhost:3000/changeColor?color=${color}`,
        type: 'GET'
    }));
}