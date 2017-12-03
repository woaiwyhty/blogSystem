/**
 * Created by dell on 2017/11/23.
 */
$(document).ready(function () {
    (function ($) {
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        }
    })(jQuery);
    var sectionList = $('#example').DataTable();
    $('#example,#userTable,#adminTable tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            //sectionList.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );
    var userList = $('#userTable').DataTable({
        "lengthMenu": [[10], [10]],
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "/db/user",
            "type": "POST"
        },
        "columns": [
            { "data": "idNumber" },
            { "data": "username" },
            { "data": "password" }
        ]
    }), adminList = $('#adminTable').DataTable({
        "lengthMenu": [[10], [10]],
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "/db/user/admin",
            "type": "POST"
        },
        "columns": [
            { "data": "idNumber" },
            { "data": "username" },
            { "data": "password" }
        ]
    });
    $('a[data-toggle="tab"]').on( 'shown.bs.tab', function (e) {
        if($(this).hasClass('admin')) {
            $('#tab-table-admin').show();
            $('#tab-table-user').hide();
        } else if($(this).hasClass('user')) {
            $('#tab-table-admin').hide();
            $('#tab-table-user').show();
        }
    } );
    $('#tab-table-admin').hide();

});