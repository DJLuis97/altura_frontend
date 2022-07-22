<%-- 
    Document   : index
    Created on : 21/07/2022, 15:27:32
    Author     : Luis Suárez
--%>

<%@page contentType="text/html" pageEncoding="windows-1252"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
        <title>Personas</title>
        <!--Import Google Icon Font-->
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <!--Import materialize.css-->
        <link type="text/css" rel="stylesheet" href="../resources/css/materialize.css"  media="screen,projection"/>
        <!--Let browser know website is optimized for mobile-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body>
        <div class="container">
            <div class="row">
                <div class="col s12">
                    <h5>Personas</h5>
                    <a class="waves-effect waves-light btn modal-trigger" href="#modal_new_person">Nueva persona</a>
                </div>
                <div class="col s12">
                    <table id="table_people">
                        <thead>
                            <tr>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>&nbsp;</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- Modal para agregar personas -->
        <div id="modal_new_person" class="modal">
            <div class="modal-content">
                <h4>Nueva Persona</h4>
                <form>
                    <div class="row">
                        <div class="input-field col s6">
                            <input placeholder="Ingrese nombre..." id="people_new_name" type="text" class="validate">
                            <label for="people_new_name">Nombres</label>
                        </div>
                        <div class="input-field col s6">
                            <input id="people_new_last_name" type="text" class="validate">
                            <label for="people_new_last_name">Apellidos</label>
                        </div>
                    </div> 
                </form>
            </div>
            <div class="modal-footer">
                <a href="#!" class="waves-effect waves-green btn-flat action_new_person">Guardar <i class="material-icons right">send</i></a>
            </div>
        </div>
        <!-- Modal para actualizar personas -->
        <div id="modal_update_person" class="modal">
            <div class="modal-content">
                <h4>Actualizar</h4>
                <form>
                    <input type="hidden" id="people_update_id" />
                    <div class="row">
                        <div class="input-field col s6">
                            <input placeholder="Ingrese nombre..." id="people_update_name" type="text" class="validate">
                            <label for="people_update_name">Nombres</label>
                        </div>
                        <div class="input-field col s6">
                            <input id="people_update_last_name" type="text" class="validate">
                            <label for="people_update_last_name">Apellidos</label>
                        </div>
                    </div> 
                </form>
            </div>
            <div class="modal-footer">
                <a href="#!" class="waves-effect waves-green btn-flat action_update_person">Actualizar <i class="material-icons right">send</i></a>
            </div>
        </div>
        <!--JavaScript at end of body for optimized loading-->
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
        <script src="../resources/js/materialize.js"></script>
        <script src="index.js"></script>
    </body>
</html>