$(document).ready(function () {
    {
        llenadoTabla();
    }

});

function llenadoTabla() {

    //ajax
    $.ajax({

        type: 'ajax',
        method: 'get',
        url: 'http://localhost:8081/efevserv/consignatarios/obtenerConsignatarios',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',

        success: function (Resultado) {

            console.log("bien->" + JSON.stringify(Resultado.resultado));

            var cuerpo;
            for (var i = 0; i < Resultado.resultado.length; i++) {
                cuerpo += '<tr>' +
                    '<td>' + Resultado.resultado[i].consignatarioId + '</td>' +
                    '<td>' + Resultado.resultado[i].consignatarioNombre + '</td>' +
                    '<td>' + Resultado.resultado[i].consignatarioActivo + '</td>' +
                    '<td>' + Resultado.resultado[i].consignatarioFechaCreacion.substring(0, 10) + '</td>' +
                    '<td><a class="btn btn-warning" data-toggle="modal" data="' + Resultado.resultado[i].consignatarioId + '"><i class="fa-refresh"></i>editar</a></td>' +
                    '</tr>'
            }
            $('#tableRows').html(cuerpo);
        },

        error: function () {

        }
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//validar formulario
function validarFormulario() {
    
    var formulario = document.getElementById('formularioConsignatario');
    var nombre = document.getElementById('nombreConsigner');
    var apePat = document.getElementById('apellidoPaternoConsigner');
    var apeMat = document.getElementById('apellidoMaternoConsigner');

    var nombreError = document.getElementById('nombreError');
    var apePatError = document.getElementById('apellidoPaternoError');
    var apeMatError = document.getElementById('apellidoMaternoError');

    var regexp = /^[a-zA-ZÀ-ÿ\s]{1,255}$/;

    nombreError.style.color = 'red';
    apePatError.style.color = 'red';
    apeMatError.style.color = 'red';


    formulario.addEventListener('submit', function (event) {

        var mensajeNombreError = [];
        var mensajeApePatError = [];
        var mensajeApeMatError = [];
        var bandera = false;


        if (nombre.value === null || nombre.value === '') {
            mensajeNombreError.push("*El nombre es requerido");
            bandera = true;
        }
        if (regexp.test(nombre.value) === false) {
            mensajeNombreError.push("*El nombre no cumple el formato");
            console.log("*El nombre no cumple el formato");
            bandera = true;
        }


        if (apePat.value === null || apePat.value === '') {
            mensajeApePatError.push("*El apellido paterno es requerido");
            bandera = true;
        }
        if (regexp.test(apePat.value) === false) {
            mensajeApePatError.push("*El apellido paterno no cumple el formato");
            bandera = true;
        }


        if (apeMat.value === null || apeMat.value === '') {
            mensajeApeMatError.push("*El apellido materno es requerido");
            bandera = true
        }
        if (regexp.test(apeMat.value) === false) {
            mensajeApeMatError.push("*El apellido materno no cumple el formato");
            bandera = true;
        }

        nombreError.innerHTML = mensajeNombreError.join(',');
        apePatError.innerHTML = mensajeApePatError.join(',');
        apeMatError.innerHTML = mensajeApeMatError.join(',');

        if (bandera === true) {
            return event.preventDefault();
        } else {
            false
        }
    });



}

///////////////////////////////////////////////////////////////////////////////////////////
function limpiar() {
    $('#nombreConsigner').val('');
    $('#apellidoPaternoConsigner').val('');
    $('#apellidoMaternoConsigner').val('');
    $('nombreError').hide();
    $('apellidoPaternoError').hide();
    $('apellidoMaternoError').hide();
}
///////////////////////////////////////////////////////////////////////////////////////////

/************************ABRIR MODAL PARA REGISTRAR UNO NUEVO******************************************************** */
$('#agregarConsignatario').click(function () {

    //ajax
    $.ajax({

        type: 'ajax',
        method: 'get',
        url: 'http://localhost:8081/efevserv/clientes/obtenerClientes',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',

        success: function (Resultado) {

            console.log(JSON.stringify(Resultado.resultado));

            var select;
            for (var i = 0; i < Resultado.resultado.length; i++) {
                console.log(Resultado.resultado[i].clienteId);

                select += '<option value="' + Resultado.resultado[i].clienteId + '" >' + Resultado.resultado[i].clienteNombre + '</option>'
                //select +='<option value="'+cliente[i].clienteId+'" >'+cliente[i].clienteNombre+'</option>'
            }

            $('#selectCliente').html(select);
            
        },

        error: function () {

        }
    });


    $('#modalAgregarConsignatario').modal('show');

});
/*******************************GUARDAR REGISTRO************************************************************ */
$('#submitbtnConsignatario').click(function () {

    validarFormulario();

    var nombreCompleto = $('#nombreConsigner').val() + " " + $('#apellidoPaternoConsigner').val() + " " + $('#apellidoMaternoConsigner').val();
            var consignatarioActivo = $('#consignatarioActivo').val();
            var idCliente = $('#selectCliente').val();
            console.log(nombreCompleto + "| " + consignatarioActivo+" |"+idCliente);
        var json = {
            "clienteId": idCliente,
            "consignatarioNombre": nombreCompleto,
            "consignatarioActivo": consignatarioActivo
            
            
        }

        $.ajax({
            type: 'ajax',
            method: 'post',
            url: 'http://localhost:8081/efevserv/consignatarios/agregarConsignatario',
            data: JSON.stringify(json),
            contentType: 'application/json; charset=utf-8',

            success: function () {

                llenadoTabla();
                $('#modalAgregarConsignatario').modal('hide'); //hiden cerrar

            },
            error: (Resultado) => {
                var errorResponse = JSON.stringify(Resultado.responseJSON);
                console.log(JSON.stringify(Resultado));
                console.log(errorResponse);
                alert(errorResponse);
                limpiar();
            }//cierra ajax
        });//cierra llenado de tablas
    
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//EDITAR CONSIGNATARIO ///

/***********************************ABRIR MODAL ARA EDITAR***************************************** */

$('#tableRows').on('click', '.btn-warning', function () {

    var id = $(this).attr("data");

    $.ajax({

        type: 'ajax',
        method: 'get',
        url: 'http://localhost:8081/efevserv/consignatarios/getConsignatario/' + id,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',

        success: function (Resultado) {

            var select;
            $('#nombreConsignerEditar').val(Resultado.resultado.consignatarioNombre);
            $('#consignatarioIdEditar').val(Resultado.resultado.consignatarioId);

            if (Resultado.resultado.consignatarioActivo == true) {

                select +='<option value="true" selected >Activo</option>' +
                         '<option value="false" >Inactivo</option>'

            } else if (Resultado.resultado.consignatarioActivo == false) {
                select +='<option value="true"  >Activo</option>' +
                '<option value="false" selected>Inactivo</option>'
            }
 /**********************************cargar los cliente para editar *****************************************/
        $.ajax({

            type: 'ajax',
            method: 'get',
            url: 'http://localhost:8081/efevserv/clientes/obtenerClientes',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
    
            success: function (Resultado) {
    
                console.log(JSON.stringify(Resultado));
    
                var select;
                for (var i = 0; i < Resultado.resultado.length; i++) {
                    
                    if(Resultado.resultado.clienteId==Resultado.resultado[i].clienteId){

                        select +='<option value="'+Resultado.resultado[i].clienteId+'" selected >'+Resultado.resultado[i].clienteNombre+'</option>'
                   
                    }
                    select +='<option value="'+Resultado.resultado[i].clienteId+'" >'+Resultado.resultado[i].clienteNombre+'</option>'
                   
                }
    
                $('#selectClienteEditar').html(select);
            },
    
            error: (Resultado) => {
                var errorResponse = JSON.stringify(Resultado.responseJSON);
                console.log(JSON.stringify(Resultado));
                console.log(errorResponse);
                alert(errorResponse);
                limpiar();
            }
        });
        /*************************************************** */
            $('#consignatarioActivoEditar').html(select);

            $('#modalEditarConsignatario').modal('show');

        },
        error: (Resultado) => {
            var errorResponse = JSON.stringify(Resultado.responseJSON);
            console.log(JSON.stringify(Resultado));
            console.log(errorResponse);
            alert(errorResponse);
        }//cierra ajax
    });//cierra llenado de tablas
});
/*********************************    GUARDAR CAMBIOS    ************************************************************ */

$('#submitbtnConsignatario').click(function () {
    var id=$('#consignatarioIdEditar').val();
    var nombre = $('#nombreConsignerEditar').val();
    var activo = $('#consignatarioActivoEditar').val();
    var idCliente  = $('#selectClienteEditar').val();
   
    if (nombre == "" || nombre == null) {
        alert("nombre es  dato requerido ");
    }
    else if (activo == "" || activo == null) {
        alert(" estatus es dato requerido ");
    }else if (idCliente == "" || idCliente == null) {
        alert("cliente dato requerido ");
    }

    var json =   {
        "consignatarioId":id,
        "consignatarioActivo": activo,
        "consignatarioNombre": nombre,
        "clienteId": idCliente
        
    }

    
   //ajax
   $.ajax({

       type: 'ajax',
       method: 'PUT',
       url: 'http://localhost:8081/efevserv/actualizarConsignatario/'+ id,
       data: JSON.stringify(json),
       contentType: 'application/json; charset=utf-8',

       success: function () {

          llenadoTabla();
        
           $('#modalEditarConsignatario').modal('hide'); //hiden cerrar
       },

       error: (Resultado) => {
        var errorResponse = JSON.stringify(Resultado.responseJSON);
        console.log(JSON.stringify(Resultado));
        console.log(errorResponse);
        alert(errorResponse);
        limpiar();
       }
   }); //ajax
}); //cierra btn editar
/***++++++++++++++++++++++++++++++++++++++++++++FIN EDITAR++++++++++++++++++++++++++++++ */




























































































































































