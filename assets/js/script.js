const url = "https://digimon-api.vercel.app/api/digimon"

$(document).ready(function () {
  activeListDigimon()
});

function getDigimon(nombre) {
  const url = "https://digimon-api.vercel.app/api/digimon/name/" + nombre;

  $.ajax({
    type: "GET",
    url: url,
    dataType: "json",
    success: function (data) {
      $.each(data, function (i, item) {
        $("#imagen").html(`<img src="${item.img}" class="card-img-top" alt="...">`);
        $("#nombre").html(item.name);
        $("#nivel").html(item.level);
      });

      $('#modal-digimon').modal('show');
    }, //End of AJAX Success function  
  });
}

function activeOption() {
  $("#btnAllDigimon").even().removeClass("active")
  $("#btnListDigimon").even().removeClass("active")
}

function activeAllDigimon() {
  activeOption()
  $("#btnAllDigimon").even().addClass("active")
  $("#listadoDigimon").attr("hidden", true);
  $("#todosDigimo").attr("hidden", false);

  const contenido = document.querySelector("#todosDigimo>.card-group")

  fetch(url)
    .then(response => response.json())
    .then(datos => {
      for (item of datos) {

        contenido.innerHTML += `
              <div class="d-inline-flex p-2 col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <div class="card">
                  <img src="${item.img}" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title text-center">${item.name}</h5>
                    <p class="card-text text-center">${item.level}</p>
                  </div>
                </div>
              </div>
              `
        if (item.id == 3) { break; }
      }

    })
}

function activeListDigimon() {
  activeOption()
  $("#btnListDigimon").even().addClass("active")
  $("#listadoDigimon").attr("hidden", false);
  $("#todosDigimo").attr("hidden", true);

  $.ajax({
    'url': url,
    'method': "GET",
    'contentType': 'application/json',
  }).done(function (data) {
    $('#table-digimon').dataTable({
      "language": {
        "url": "https://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
      },
      "pageLength": 8,
      "dom": "frt<'row align-items-center'<'col-md-6 'i><'col-md-6 pt-3'p>>",
      "bLengthChange": false,
      "destroy":true,
      'responsive': true,
      "aaData": data,
      "columns": [
        { "data": "name" },
        { "data": "level" },
        {
          "data": "name", render: function (data, type, row, meta) {
            return type === 'display' ?
              `<button class='btn bg-black text-white' onclick='getDigimon("${data}")'><i class="fa-solid fa-eye"></i></button>` :
              data;
          }
        },
      ],
    })
  })
}
