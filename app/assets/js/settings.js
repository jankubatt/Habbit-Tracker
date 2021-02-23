function changeColor(color) {
    $.ajax({
        url: `/changeColor?color=${color}`,
        type: 'GET'
    });
}