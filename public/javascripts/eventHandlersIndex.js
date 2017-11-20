/**
 * Created by dell on 2017/11/19.
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
    $('.newTopic').click(function() {
        var sid = ($.getUrlParam('sid'));
        window.location.href = '/thread/create?&secid=' + sid;
    })
});