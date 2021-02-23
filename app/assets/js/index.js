const habbits = document.getElementById("habbits");
const edit = document.getElementById("edit");
const inputName = document.getElementById("name");
const text = document.getElementById("test");
const btnEdit = document.getElementById("btnEdit");
const btnDelete = document.getElementById("btnDelete");
const stats = document.getElementById("stats");
const levelBar = document.getElementById("levelBar");
const levelText = document.getElementById("levelText");
const nextLevelText = document.getElementById("nextLevelText");
let color = "success";

let editTitle = document.getElementById("title");
let selectedId = 0;
let successRate = 0;

setColor();
loadHabbits();

function loadHabbits() {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let obj = JSON.parse(xhr.responseText);
            successRate = 0;

            for (let i = 0; i < obj.habbits.length; i++) {
                let name = obj.habbits[i].name;
                let days = Math.floor((Date.now() - obj.habbits[i].date) / 86400000);
                let status = ((days >= 60) ? "adapted" : "not adapted");
                let id = parseInt(obj.habbits[i].id);
                let progress = ((days <= 60) ? parseInt(days / 60 * 100) : "100");

                if (status == "adapted") {
                    successRate += 1;
                }

                habbits.innerHTML += `<div class="card m-3">
                                            <div class="card-body">
                                            <button style="display:none;" type="button" onclick="showEdit(${id}, '${name}' )" class="btn btn-${color} float-right cardEditBtn"><i class="fas fa-pencil-alt"></i></button>
                                                <h4>${name}</h4>
                                                <p>Days: ${days}<br>Status: ${status}</p>
                                                <div class="progress w-${progress}" style="margin-left: auto; margin-right:auto;">
                                                    <div class="progress-bar bg-${color} progress-bar-striped progress-bar-animated"role="progressbar" aria-valuenow="${days}" aria-valuemin="0" aria-valuemax="60" style="width: ${progress}%"></div>
                                                </div>
                                            </div>
                                        </div>`;
            }

            levelBar.innerHTML = `
                <div class="progress" style="margin-left: auto; margin-right:auto;">
                    <div class="progress-bar bg-${color} progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="${successRate%5}" aria-valuemin="0" aria-valuemax="5" style="width: ${successRate%5*20}%"></div>
                </div>`

            levelText.innerHTML = "Level " + parseInt(successRate / 5);
            nextLevelText.innerHTML = "Level " + (parseInt(successRate / 5) + 1);

            stats.innerHTML = `Habbits: ${obj.habbits.length}<br>Success rate: ${(isNaN((parseInt(100/obj.habbits.length*successRate))) ? 0 : parseInt(100/obj.habbits.length*successRate))}%`;
        }
    }

    xhr.open("GET", "habbits.json", true);
    xhr.send();
}

function showEdit(id, name) {
    editTitle.innerHTML = name;
    $("#edit").animate({
        left: "-20em"
    }, 250);
    $("#edit").animate({
        left: "50em"
    }, 250);

    selectedId = id;
}

function closeEdit() {
    $("#edit").animate({
        left: "-20em"
    }, 250);
}

function editButtonToggle() {
    $(".cardEditBtn").toggle();
}

function setColor() {
    let colorGet = "";

    $.ajax({
        url: 'settings.json',
        async: false,
        dataType: 'json',
        success: function (response) {
            colorGet = response.settings.color;
            console.log("Color loaded");
        }
    });

    color = colorGet;
}

function editHabbit() {
    $.ajax({
            method: "POST",
            url: "/editHabbit",
            data: {
                id: selectedId,
                name: inputName.value
            }
        })
        .done(function (msg) {
            console.log("Data Saved: " + msg);
            closeEdit();
            habbits.innerHTML = "";
            loadHabbits();
        });
}

function deleteHabbit() {
    $.ajax({
        method: "POST",
        url: "/deleteHabbit",
        data: {
            id: selectedId,
        }
    })
    .done(function (msg) {
        console.log("Data Removed: " + msg);
        closeEdit();
        habbits.innerHTML = "";
        loadHabbits();
    });
}