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
    $(document).ready(function() {
        var sectionList = $('#example').DataTable();
        $('#example tbody').on( 'click', 'tr', function () {
            if ( $(this).hasClass('selected') ) {
                $(this).removeClass('selected');
            }
            else {
                //sectionList.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        } );
    } );
});