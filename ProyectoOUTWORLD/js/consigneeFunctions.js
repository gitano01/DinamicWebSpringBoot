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
            if(Resultado.resultado.length > 0){


                    document.getElementById('notaRegistro').style.display= 'none';
                    document.getElementById('notaRegistro').style.visibility= 'hidden';

                    document.getElementById('cabecerosTabla').style.visibility= 'visible';
                    document.getElementById('tablaConsignatarios').style.visibility= 'visible';


            var cuerpo;
            for (var i = 0; i < Resultado.resultado.length; i++) {
                cuerpo += '<tr>' +
                    '<td>' + Resultado.resultado[i].consignatarioId + '</td>' +
                    '<td>' + Resultado.resultado[i].consignatarioNombre + '</td>' +
                    '<td>' + Resultado.resultado[i].consignatarioActivo + '</td>' +
                    '<td>' + Resultado.resultado[i].consignatarioFechaCreacion.substring(0, 10) + '</td>' +
                    '<td><a class="btn btn-outline-info" data-toggle="modal" data="' + Resultado.resultado[i].consignatarioId + '">  <i class="fa fa-eye"></i>   Ver</a></td>' +
                    '<td><a class="btn btn-warning" data-toggle="modal" data="' + Resultado.resultado[i].consignatarioId + '"><i class="fa fa-pencil  "></i>  Editar</a></td>' +
                    '<td><a class="btn btn-danger" data="' + Resultado.resultado[i].consignatarioId + '"><i class="fa fa-trash"></i>  Eliminar</a></td>' +
                    '</tr>'
            }
            $('#tableRows').html(cuerpo);
        }else{
            document.getElementById('notaRegistro').style.visibility= 'visible';
            document.getElementById('cabecerosTabla').style.display= 'none';
            document.getElementById('cabecerosTabla').style.visibility= 'hidden';

        }
        },

        error: function () {

        }
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//validar formulario
function validarFormularioAgregar() {

    var formulario = document.getElementById('formularioAgregarConsignatario');
    var nombre = document.getElementById('nombreConsignatario');
    var apePat = document.getElementById('apellidoPaternoConsignatario');
    var apeMat = document.getElementById('apellidoMaternoConsignatario');

    var nombreError = document.getElementById('nombreError');
    var apePatError = document.getElementById('apellidoPaternoError');
    var apeMatError = document.getElementById('apellidoMaternoError');

    var regexp = /^[a-zA-ZÀ-ÿ\s]{1,255}$/;

    var bandera = true;

    var banderaNombre = true;
    var banderaApellidoPaterno = true;
    var banderaApellidoMaterno = true;


    console.log("Negocio4");

    var mensajeNombreError = [];
    var mensajeApePatError = [];
    var mensajeApeMatError = [];
    var mensajeNombreValido = "";
    var mensajeApePatValido = "";
    var mensajeApeMatValido = "";

    if (nombre.value === null || nombre.value === '') {
        console.log("Entre a validar si estaba vacio");
        mensajeNombreError.push("*El nombre es requerido");
        banderaNombre = false;
    } else {

        if (regexp.test(nombre.value) === false) {
            mensajeNombreError.push("*El nombre no cumple el formato");
            console.log("*El nombre no cumple el formato");
            banderaNombre = false;
        } else {
            banderaNombre = true;
        }
    }



    if (apePat.value === null || apePat.value === '') {
        mensajeApePatError.push("*El apellido paterno es requerido");
        banderaApellidoPaterno = false;
    } else {
        if (regexp.test(apePat.value) === false) {
            mensajeApePatError.push("*El apellido paterno no cumple el formato");
            banderaApellidoPaterno = false;
        } else {
            banderaApellidoPaterno = true;
        }
    }



    if (apeMat.value === null || apeMat.value === '') {
        mensajeApeMatError.push("*El apellido materno es requerido");
        banderaApellidoPaterno = false
    } else {
        if (regexp.test(apeMat.value) === false) {
            mensajeApeMatError.push("*El apellido materno no cumple el formato");
            banderaApellidoMaterno = false;
        } else {
            banderaApellidoMaterno = true;
        }
    }



    console.log(banderaNombre);
    console.log(banderaApellidoPaterno);
    console.log(banderaApellidoMaterno);

    if (banderaNombre === true && banderaApellidoPaterno === true && banderaApellidoMaterno === true) {
        bandera = true;

        mensajeNombreValido = "Nombre Válido";
        mensajeApePatValido = "Apellido Paterno Válido";
        mensajeApeMatValido = "Apellido Materno Válido";
    } else {
        bandera = false;
    }


    if (bandera === false) {
        nombreError.style.color = 'red';
        apePatError.style.color = 'red';
        apeMatError.style.color = 'red';

        nombreError.innerHTML = mensajeNombreError.join(',');
        apePatError.innerHTML = mensajeApePatError.join(',');
        apeMatError.innerHTML = mensajeApeMatError.join(',');

        nombreError.style.display = 'block';
        apePatError.style.display = 'block';
        apeMatError.style.display = 'block';

        setTimeout(() => {
            nombreError.style.color = 'red';
            apePatError.style.color = 'red';
            apeMatError.style.color = 'red';
            $('#nombreConsignatario').val('');
            $('#apellidoPaternoConsignatario').val('');
            $('#apellidoMaternoConsignatario').val('');
            $('nombreError').val('');
            $('apellidoPaternoError').val('');
            $('apellidoMaternoError').val('');
            nombreError.style.display = 'none';
            apePatError.style.display = 'none';
            apeMatError.style.display = 'none';
            nombreError.innerHTML = '';
            apePatError.innerHTML = '';
            apeMatError.innerHTML = '';
        }, 3000);

        return bandera;

    } else {



        console.log("entre donde debe ser verdecito");

        nombreError.style.display = 'block';
        apePatError.style.display = 'block';
        apeMatError.style.display = 'block';

        nombreError.style.color = 'green';
        apePatError.style.color = 'green';
        apeMatError.style.color = 'green';

        nombreError.style.display = 'block';
        apePatError.style.display = 'block';
        apeMatError.style.display = 'block';

        nombreError.innerHTML = mensajeNombreValido;
        apePatError.innerHTML = mensajeApePatValido;
        apeMatError.innerHTML = mensajeApeMatValido;

        setTimeout(() => {

            $('#nombreConsignatario').val('');
            $('#apellidoPaternoConsignatario').val('');
            $('#apellidoMaternoConsignatario').val('');
            $('nombreError').val('');
            $('apellidoPaternoError').val('');
            $('apellidoMaternoError').val('');
            nombreError.style.display = 'none';
            apePatError.style.display = 'none';
            apeMatError.style.display = 'none';

        }, 10000);

        console.log(bandera);
        return bandera;

    }



}


///////////////////////////validar Consignatario

function validarFormularioEditar() {
    console.log("Entre")
    console.log("Negocio");
    var formulario = document.getElementById('formularioEditarConsignatario');
    var nombre = document.getElementById('nombreConsignatarioEditar');

    console.log("Negocio2");
    var nombreError = document.getElementById('nombreErrorEditar');

    console.log("Negocio3");
    var regexp = /^[a-zA-ZÀ-ÿ\s]{1,255}$/;

    var bandera = true;

    var banderaNombre = true;



    console.log("Negocio4");

    var mensajeNombreError = [];

    var mensajeNombreValido = "";


    if (nombre.value === null || nombre.value === '') {
        console.log("Entre a validar si estaba vacio");
        mensajeNombreError.push("*El nombre es requerido");
        banderaNombre = false;
    } else {

        if (regexp.test(nombre.value) === false) {
            mensajeNombreError.push("*El nombre no cumple el formato");
            console.log("*El nombre no cumple el formato");
            banderaNombre = false;
        } else {
            banderaNombre = true;
        }
    }



    console.log(banderaNombre);


    if (banderaNombre === true) {
        bandera = true;

        mensajeNombreValido = "Nombre Válido";

    } else {
        bandera = false;
    }


    if (bandera === false) {
        nombreError.style.color = 'red';


        nombreError.innerHTML = mensajeNombreError.join(',');


        nombreError.style.display = 'block';


        setTimeout(() => {
            nombreError.style.color = 'red';

            nombreError.style.display = 'none';

            nombreError.innerHTML = '';

        }, 3000);

        return bandera;

    } else {



        console.log("entre donde debe ser verdecito");

        nombreError.style.display = 'block';

        nombreError.style.color = 'green';


        nombreError.innerHTML = mensajeNombreValido;


        setTimeout(() => {


            $('nombreErrorEditar').val('');

            nombreError.style.display = 'none';


        }, 5000);

        console.log(bandera);
        return bandera;

    }

}

///////////////////////////////////////////////////////////////////////////////////////////
function limpiar() {
    $('#nombreConsignatario').val('');
    $('#apellidoPaternoConsignatario').val('');
    $('#apellidoMaternoConsignatario').val('');
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


                select += '<option value="' + Resultado.resultado[i].clienteId + '" >' + Resultado.resultado[i].clienteNombre + '</option>'
                //select +='<option value="'+cliente[i].clienteId+'" >'+cliente[i].clienteNombre+'</option>'
            }

            $('#selectCliente').html(select);

        },

        error: function () {

        }
    });


    $('#modalAgregar').modal('show');
    console.log("entreeee");

});
/*******************************GUARDAR REGISTRO************************************************************ */
$('#submitbtnConsignatarioAgregar').click(function () {

    if (validarFormularioAgregar() === true) {

        var nombreCompleto = $('#nombreConsignatario').val() + " " + $('#apellidoPaternoConsignatario').val() + " " + $('#apellidoMaternoConsignatario').val();
        var consignatarioActivo = $('#consignatarioActivo').val();
        var idCliente = $('#selectCliente').val();
        console.log(nombreCompleto + "| " + consignatarioActivo + " |" + idCliente);
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
                $('#modalAgregar').modal('hide'); //hiden cerrar
                window.location.reload();

            },
            error: (Resultado) => {
                var errorResponse = JSON.stringify(Resultado.responseJSON);
                console.log(JSON.stringify(Resultado));
                console.log(errorResponse);
                alert(errorResponse);
                limpiar();
            }//cierra ajax
        });//cierra llenado de tablas
    }
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
            $('#nombreConsignatarioEditar').val(Resultado.resultado.consignatarioNombre);
            $('#consignatarioIdEditar').val(Resultado.resultado.consignatarioId);

            if (Resultado.resultado.consignatarioActivo == true) {

                select += '<option value="true" selected >Activo</option>' +
                    '<option value="false" >Inactivo</option>'

            } else if (Resultado.resultado.consignatarioActivo == false) {
                select += '<option value="true"  >Activo</option>' +
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

                        if (Resultado.resultado.clienteId == Resultado.resultado[i].clienteId) {

                            select += '<option value="' + Resultado.resultado[i].clienteId + '" selected >' + Resultado.resultado[i].clienteNombre + '</option>'

                        }
                        select += '<option value="' + Resultado.resultado[i].clienteId + '" >' + Resultado.resultado[i].clienteNombre + '</option>'

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

            $('#modalEditar').modal('show');

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

$('#submitbtnConsignatarioEditar').click(function () {


    if (validarFormularioEditar() === true) {
        var id = $('#consignatarioIdEditar').val();
        var nombre = $('#nombreConsignatarioEditar').val();
        var activo = $('#consignatarioActivoEditar').val();
        var idCliente = $('#selectClienteEditar').val();

        var json = {
            "consignatarioId": id,
            "consignatarioActivo": activo,
            "consignatarioNombre": nombre,
            "clienteId": idCliente

        }

        console.log(json);

        //ajax
        $.ajax({

            type: 'ajax',
            method: 'PUT',
            url: 'http://localhost:8081/efevserv/consignatarios/actualizarConsignatario/' + id,
            data: JSON.stringify(json),
            contentType: 'application/json; charset=utf-8',

            success: function () {

                llenadoTabla();

                $('#modalEditar').modal('hide'); //hiden cerrar
            },

            error: (Resultado) => {
                var errorResponse = JSON.stringify(Resultado);

                console.log(JSON.stringify(Resultado));
                console.log(errorResponse);
                limpiar();
            }
        }); //ajax
    }
}); //cierra btn editar
/***++++++++++++++++++++++++++++++++++++++++++++FIN EDITAR++++++++++++++++++++++++++++++ */
///ELIMINAR CONSIGNATARIO

$('#tableRows').on('click', '.btn-danger', function () {
    var id = $(this).attr("data");

    $.ajax({

        type: 'ajax',
        method: 'delete',
        url: 'http://localhost:8081/efevserv/consignatarios/eliminar/' + id,

        success: function (Resultado) {

            llenadoTabla();
            window.location.reload();
            alert(JSON.stringify(Resultado.resultado));

        },

        error: (Resultado) => {
            var errorResponse = JSON.stringify(Resultado.responseJSON);
            console.log(JSON.stringify(Resultado));
            console.log(errorResponse);
            alert(errorResponse);
            limpiar();
        }


    }); //ajax
});
