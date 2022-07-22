let editing_row;

const showPerson = _id => {
    let person;
    $.ajax({
        cache: false,
        url: `http://localhost:8080/api/person/${_id}`,
        type: 'GET',
        async: false,
        success: (data, textStatus, jqXHR) => {
            person = data;
        },
        error: (jqXHR, textStatus, errorThrown) => {
            M.toast({html: 'Algo malo paso al intentar obtener a la persona', classes: 'rounded'});
        }
    });

    return person;
};

function editPeople(row) {
    editing_row = row;
    //let cloneRow = row.clone();
    //let nextRow = row.next();
    let id = row.attr("data-id");
    let person = showPerson(id);
    if (person) {
        $("#people_update_name").val(person.name);
        $("#people_update_last_name").val(person.lastName);
        $("#people_update_id").val(person.id);
        $("#modal_update_person").modal("open");
    }
}

function deletePeople(row) {
    console.log("borrar fila", row);
    let id = row.attr("data-id");
    let person = showPerson(id);
    if (person) {
        if (confirm(`¿Estas seguro de que quieres eliminar a ${person.name} ?`)) {
            $.ajax({
                cache: false,
                url: `http://localhost:8080/api/person/${id}`,
                type: 'DELETE',
                async: true,
                success: function (data, textStatus, jqXHR) {
                    M.toast({html: data});
                    let count = parseInt($(".people-count").text());
                    $(".people-count").html(count - 1);
                    row.remove();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    M.toast({html: 'No pudimos eliminar a esa persona', classes: 'rounded'});
                }
            });
        }
    }
}

function addRowOnPeopleTable(person) {
    $('#table_people > tbody').append(buildRow(person));
}

const buildRow = person => {
    return `<tr data-id="${person.id}">
        <td>${person.name}</td>
        <td>${person.lastName}</td>
        <td><a class="waves-effect waves-light btn-small" onclick="editPeople($(this).closest('tr'))">Editar</a></td>
        <td><a class="waves-effect waves-light btn-small" onclick="deletePeople($(this).closest('tr'))">Borrar</a></td>
    </tr>`;
};

function indexPeople(page) {
    $.ajax({
        cache: false,
        url: `http://localhost:8080/api/person?page=${page}`,
        type: 'GET',
        async: true,
        headers: {
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        success: function (data, textStatus, jqXHR) {
            $('#table_people > tbody').empty();
            $(".pagination_people").empty();
            $(".people-count").html(data.totalElements);
            $.each(data.content, function (index, value) {
                addRowOnPeopleTable(value);
            });
            for (let i = 0; i < data.totalPages; i++) {
                let output;
                if (i === data.pageable.pageNumber) {
                    output = `<li onclick="indexPeople(${i})" class="disabled"><a href="#!">${i + 1}</a></li>`;
                } else {
                    output = `<li onclick="indexPeople(${i})" class="waves-effect"><a href="#!">${i + 1}</a></li>`;
                }
                $(".pagination_people").append(output);

            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            M.toast({html: 'Algo inesperado paso al obtener los registros', classes: 'rounded'});
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

$(document).ready(function () {
    $('.modal').modal();
    indexPeople(0);
    $('.action_new_person').click(function (event) {
        event.preventDefault();
        $('.action_new_person').prop('disabled', true);

        $.ajax({
            cache: false,
            url: 'http://localhost:8080/api/person',
            type: 'POST',
            async: true,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "name": $("#people_new_name").val(),
                "lastName": $("#people_new_last_name").val()
            }),
            success: function (data, textStatus, jqXHR) {
                M.toast({html: 'Registro guardado con éxito'});
                console.log(data);
                addRowOnPeopleTable(data);
                let count = parseInt($(".people-count").text());
                $(".people-count").html(count + 1);
                $("#modal_new_person").modal("close");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                M.toast({html: 'Error al guardar la persona', classes: 'rounded'});
                console.log(jqXHR, textStatus, errorThrown);
            },
            finally: function () {
                $('.action_new_person').prop('disabled', false);
            }
        });
    });
    $(".action_update_person").click(function () {
        $.ajax({
            cache: false,
            url: 'http://localhost:8080/api/person',
            type: 'POST',
            async: true,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "name": $("#people_update_name").val(),
                "lastName": $("#people_update_last_name").val(),
                "id": $("#people_update_id").val()
            }),
            success: function (data, textStatus, jqXHR) {
                M.toast({html: 'Registro actualizado con éxito'});
                let nextRow = editing_row.next();
                editing_row.remove();
                console.log("tamaño siguiente fila", nextRow.children().length);
                if (nextRow.children().length) {
                    console.log("dentro del IF");
                    $(buildRow(data)).insertBefore(nextRow);
                } else {
                    console.log("dentro del ELSE");
                    addRowOnPeopleTable(data);
                }
                $("#modal_update_person").modal("close");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                M.toast({html: 'Error al actualizar la persona', classes: 'rounded'});
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    });
});