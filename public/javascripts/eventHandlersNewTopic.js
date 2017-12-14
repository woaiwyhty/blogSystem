/**
 * Created by dell on 2017/11/18.
 */
$(document).ready(function () {
    (function ($) {
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r !== null) return decodeURI(r[2]);
            return null;
        }
    })(jQuery);
    CKEDITOR.replace( 'editor' ,{
        width: '100%',
        height: 500
    });
    $('.submitTopic').click(function() {
        var sid = ($.getUrlParam('secid'));
        var postBody = {
            title: $('.new_topic_title').val(),
            content: CKEDITOR.instances.editor.getData(),
            sectionID: sid
        };
        $.post('/thread', postBody, function(res) {
            if(res.retCode === 0) {
                window.location.href = '../../?&sid=' + sid;
            }
        });
    });
});