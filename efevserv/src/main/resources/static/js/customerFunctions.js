

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
                  '<td>' + Resultado.resultado[i].clienteFechaCreacion.substring(0,10) + '</td>' +
                  '<td><a class="btn btn-danger" data="' + Resultado.resultado[i].clienteId + '"><i class="fa fa-remove"></i>eliminar</a></td>' +
                  '<td><a class="btn btn-warning" data-toggle="modal" data="' + Resultado.resultado[i].clienteId + '"><i class="fa fa-refresh"></i>editar</a></td>' +
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
function validarFormularioAgregar(){
    var formulario = document.getElementById('formularioCliente');
    var nombre = document.getElementById('nombreCliente');
    var apePat = document.getElementById('apellidoPaternoCliente');
    var apeMat = document.getElementById('apellidoMaternoCliente');

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
    
        if(bandera === true){
            return event.preventDefault();
        }else{
            false
        }
   });



}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//validar formulario Editar
function validarFormularioEditar(){
    var formulario = document.getElementById('formularioEditarCliente');
    var nombre = document.getElementById('nombreClienteEditar');

    var nombreError = document.getElementById('nombreError');  

    var regexp = /^[a-zA-ZÀ-ÿ\s]{1,255}$/;

    nombreError.style.color = 'red';
    
    

    formulario.addEventListener('submit', function (event) {
        
        var mensajeNombreError = [];
        
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

        nombreError.innerHTML = mensajeNombreError.join(',');
        
    
        if(bandera === true){
            return event.preventDefault();
        }else{
            false
        }
   });



}

///////////////////////////////////////////////////////////////////////////////////////////
function limpiar() {
    $('#nombreClienteEdit').val('');
    $('#apellidoPaternoClienteEdit').val('');
    $('#apellidoMaternoClienteEdit').val('');
    $('nombreError').hide();        
    $('apellidoPaternoError').hide();
    $('apellidoMaternoError').hide();
}
///////////////////////////////////////////////////////////////////////////////////////////
$('#agregarCliente').click(function () {
    //console.log("hola desde consola");
    $('#modalAgregar').modal('show');

});
// INSERTA CLIENTE - 
$("#submitbtnCliente").click(function( ){
   
    validarFormularioAgregar();

    
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
                    if ($('.modal-backdrop').is(':visible')) {
                        $('body').removeClass('modal-open'); 
                        $('.modal-backdrop').remove(); 
                      };
                    //$('#modalAgregarCliente').attr("display","block")

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
//EDITAR CLIENTE ///
$('#tableRows').on('click', '.btn-warning', function () {

    var id = $(this).attr("data");
    console.log(id);

    $.ajax({

        type: 'ajax',
        method: 'get',
        url: `http://localhost:8081/efevserv/clientes/obtenerCliente/`+ id,
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

            $('#clienteActivoE').html(select);
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


    //validarFormularioEditar();
    var id = $('#clienteIdEditar').val();

    //ajax
    $.ajax({

        type: 'ajax',
        method: 'put',
        url: 'http://localhost:8081/efevserv/clientes/actualizarCliente/'+id,
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',

        success: function () {

            llenadoTabla();
            limpiar();
            $('#modalEditar').modal('hide'); //hiden cerrar
            if ($('.modal-backdrop').is(':visible')) {
                $('body').removeClass('modal-open'); 
                $('.modal-backdrop').remove(); 
              };
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
        },

        error: function () {

        }
    });
   
}); //BTN-DANGER---------


/////////////////////////////////////////////////////////////////////////