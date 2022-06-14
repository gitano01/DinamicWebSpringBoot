
$('#downloadExcel').click(function () {

    alert("Entre a la function del boton");
    var json = [
        {
            "contactoid": 1,
            "contactonombre": "John",
            "contactoapellido": "Doe",
            "contactocorreo": "jonhdoe@dominio.com",
            "contactotelefono": "123-456-789",
            "contactodireccion": "address 123, street 1, city 1"
        },
        {
            "contactoid": 2,
            "contactonombre": "Emerson",
            "contactoapellido": "Wilks",
            "contactocorreo": "emerson@dominio.com",
            "contactotelefono": "123-456-788",
            "contactodireccion": "address 456, street 2, city 1"
        },
        {
            "contactoid": 3,
            "contactonombre": "Wade",
            "contactoapellido": "Savage",
            "contactocorreo": "wade@dominio.com",
            "contactotelefono": "123-456-787",
            "contactodireccion": "address 789, street 3, city 1"
        },
        {
            "contactoid": 4,
            "contactonombre": "Star",
            "contactoapellido": "Lott",
            "contactocorreo": "star@dominio.com",
            "contactotelefono": "123-456-786",
            "contactodireccion": "address 234, street 4, city 1"
        },
        {
            "contactoid": 5,
            "contactonombre": "Claudia",
            "contactoapellido": "James",
            "contactocorreo": "claudia@dominio.com",
            "contactotelefono": "123-456-785",
            "contactodireccion": "address 678, street 5, city 1"
        },
        {
            "contactoid": 6,
            "contactonombre": "Rafael",
            "contactoapellido": "James",
            "contactocorreo": "rafael@dominio.com",
            "contactotelefono": "123-456-785",
            "contactodireccion": "address 678, street 5, city 1"
        }
    ];



    $.ajax({
        type: 'ajax',
        method: 'post',
        url: 'http://localhost:8081/efevserv/gestion-excel/decargarExcelJSON',
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",

        success: function(data){
                alert("Vale verga we");
                if(data.success){
                        alert(url);
                }

        }
        
    })

});

