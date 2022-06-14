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
        url: 'http://localhost:8081/efevserv/clientes/obtenerClientes',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',

        success: function (Resultado) {

            console.log("bien->" + JSON.stringify(Resultado.resultado));

            var cuerpo;
            for (var i = 0; i < Resultado.resultado.length; i++) {
                cuerpo += '<tr>' +
                    '<td>' + Resultado.resultado[i].clienteId + '</td>' +
                    '<td>' + Resultado.resultado[i].clienteNombre + '</td>' +
                    '<td>' + Resultado.resultado[i].clienteActivo + '</td>' +
                    '<td>' + Resultado.resultado[i].clienteFechaCreacion.substring(0, 10) + '</td>' +
                    '<td><a class="btn btn-outline-info" data-toggle="modal" data="' + Resultado.resultado[i].clienteId + '">  <i class="fa fa-eye"></i>   Ver</a></td>' +
                    '<td><a class="btn btn-warning" data-toggle="modal" data="' + Resultado.resultado[i].clienteId + '"><i class="fa fa-pencil  "></i>  Editar</a></td>' +
                    '<td><a class="btn btn-danger" data="' + Resultado.resultado[i].clienteId + '"><i class="fa fa-trash"></i>  Eliminar</a></td>' +
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
function validarFormularioAgregar() {
    console.log("Negocio");
    var formulario = document.getElementById('formularioAgregarCliente');
    var nombre = document.getElementById('nombreCliente');
    var apePat = document.getElementById('apellidoPaternoCliente');
    var apeMat = document.getElementById('apellidoMaternoCliente');
    console.log("Negocio2");
    var nombreError = document.getElementById('nombreError');
    var apePatError = document.getElementById('apellidoPaternoError');
    var apeMatError = document.getElementById('apellidoMaternoError');
    console.log("Negocio3");
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
            $('#nombreCliente').val('');
            $('#apellidoPaternoCliente').val('');
            $('#apellidoMaternoCliente').val('');
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

            $('#nombreCliente').val('');
            $('#apellidoPaternoCliente').val('');
            $('#apellidoMaternoCliente').val('');
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////

///validar preliminar
function validarFormularioEditar() {
    console.log("Entre")
    console.log("Negocio");
    var formulario = document.getElementById('formularioEditarCliente');
    var nombre = document.getElementById('nombreClienteEditar');

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
    $('#nombreCliente').val('');
    $('#apellidoPaternoCliente').val('');
    $('#apellidoMaternoCliente').val('');
    $('#nombreClienteEditar').val('');
    $('#apellidoPaternoClienteEditar').val('');
    $('#apellidoMaternoClienteEditar').val('');
    $('nombreError').val('');
    $('apellidoPaternoError').val('');
    $('apellidoMaternoError').val('');

}
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
$('#agregarCliente').click(function () {
    //console.log("hola desde consola");
    $('#modalAgregar').modal('show');

});
// INSERTA CLIENTE -
$("#submitbtnCliente").click(function () {

    if (validarFormularioAgregar() === true) {


        var nombreCompleto = $('#nombreCliente').val() + " " + $('#apellidoPaternoCliente').val() + " " + $('#apellidoMaternoCliente').val();
        var clienteActivo = $('#clienteActivo').val();

        var json = { "clienteNombre": nombreCompleto, "clienteActivo": clienteActivo };

        $.ajax({
            type: 'ajax',
            method: 'post',
            url: 'http://localhost:8081/efevserv/clientes/agregarCliente',
            data: JSON.stringify(json),
            contentType: 'application/json; charset=utf-8',

            success: function () {
                llenadoTabla();
                limpiar();
                $('#modalAgregar').modal('hide'); //hiden cerrar
                $('#modalAgregar').attr("display", "block")
                limpiar();

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
//EDITAR CLIENTE ///
$('#tableRows').on('click', '.btn-warning', function () {

    var id = $(this).attr("data");
    console.log(id);

    $.ajax({

        type: 'ajax',
        method: 'get',
        url: `http://localhost:8081/efevserv/clientes/obtenerCliente/` + id,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',

        success: function (Resultado) {

            var select;
            $('#clienteIdEditar').val(Resultado.resultado.clienteId);
            $('#nombreClienteEditar').val(Resultado.resultado.clienteNombre);

            if (Resultado.resultado.clienteActivo == true) {

                select += '<option value="true" selected >Activo</option>' +
                    '<option value="false" >Inactivo</option>'

            } else if (Resultado.resultado.clienteActivo == false) {
                select += '<option value="true"  >Activo</option>' +
                    '<option value="false" selected>Inactivo</option>'
            }

            $('#clienteActivoEditar').html(select);
            //console.log('entre o no?');
            $('#modalEditar').modal('show');
            //console.log('entre o no?');

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


/**+++++++++++++++++++++++++++++++++++++btn de edita para guardar valores+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++/ */
$('#submitbtnClienteEditar').click(function () {

    console.log("Entre aqui chavo");

    if (validarFormularioEditar() === true) {

        var id = $('#clienteIdEditar').val();


        var nombreCompleto = $('#nombreClienteEditar').val();
        var clienteActivo = $('#clienteActivoEditar').val();

        var json = { "clienteNombre": nombreCompleto, "clienteActivo": clienteActivo };

        //ajax
        $.ajax({

            type: 'ajax',
            method: 'put',
            url: 'http://localhost:8081/efevserv/clientes/actualizarCliente/' + id,
            data: JSON.stringify(json),
            contentType: 'application/json; charset=utf-8',

            success: function () {

                llenadoTabla();
                limpiar();
                $('#modalEditar').modal('hide'); //hiden cerrar

            },

            error: (Resultado) => {
                var errorResponse = JSON.stringify(Resultado.responseJSON);
                console.log(JSON.stringify(Resultado));
                console.log(errorResponse);
                alert(errorResponse);
                limpiar();
            }
        }); //ajax
    }//cierra validadr form Editar
}); //cierra btn editar
/***++++++++++++++++++++++++++++++++++++++++++++FIN EDITAR++++++++++++++++++++++++++++++ */
/////////////VEr registro invovando al QR

$('#tableRows').on('click', '.btn-warning',(){
 console.log();

});




/////////////////////////////////////////////////////////////////////////////////////////////
///ELIMINAR REGISTRO

$('#tableRows').on('click', '.btn-danger', function () {
    var id = $(this).attr("data");

    /********************COMPARAR SI CUAL SE QUIERE ELIMINAR  UN CLIENTE Y ESTE EXITE DENTRO CONSIGNATARIO MANDE UN ALERT */
    $.ajax({

        type: 'ajax',
        method: 'get',
        url: 'http://localhost:8081/efevserv/consignatarios/obtenerConsignatarios',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',

        success: function (Resultado) {

            console.log(JSON.stringify(Resultado.resultado));
            console.log(Resultado.resultado.length);
            if (Resultado.resultado.length > 0) {
                var cuerpo;
                for (var i = 0; i < Resultado.resultado.length; i++) {



                    if (id == Resultado.resultado[i].clienteId) {

                        alert("lo sentimos no se puede eliminar, hay otros campos ocuapndo este registro");
                        break;
                    } else {

                        /*************************************SI NO HAY REGISTROS QUE DEPENDAN SE ELIMINARA********************************************************************** */
                        //ajax
                        $.ajax({

                            type: 'ajax',
                            method: 'delete',
                            url: 'http://localhost:8081/efevserv/clientes/eliminar/' + id,

                            success: function (especie) {
                                llenadoTabla();
                            },

                            error: (Resultado) => {
                                var errorResponse = JSON.stringify(Resultado.responseJSON);
                                console.log(JSON.stringify(Resultado));
                                console.log(errorResponse);
                                alert(errorResponse);
                                limpiar();
                            }


                        }); //ajax

                    }

                }
            } else {
                alert("No hay registros de consignatarios en la base de datos, procederé a eliminar el cliente");
                $.ajax({

                    type: 'ajax',
                    method: 'delete',
                    url: 'http://localhost:8081/efevserv/clientes/eliminar/' + id,

                    success: () => {
                        llenadoTabla();
                    },

                    error: (Resultado) => {
                        var errorResponse = JSON.stringify(Resultado.responseJSON);
                        console.log(JSON.stringify(Resultado));
                        console.log(errorResponse);
                        alert(errorResponse);
                        limpiar();
                    }
                }); //ajax
            }
        },

        error: function () {

        }
    });

}); //BTN-DANGER---------


/////////////////////////////////////////////////////////////////////////
