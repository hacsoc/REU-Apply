$(function() {
    var idIndex = window.location.href.indexOf("#");
    if(idIndex != -1) {
        var id = window.location.href.substring(idIndex);
        $("div.content-container").not(id).hide();
        $(id).show();
    }

    var sbnav = $(".sb-nav");
    var content = $("div.content");
    if(sbnav.height() < content.height()) {
        sbnav.height(content.height());
    }
});

$("ul.sb-select li a").click(function(evt) {
    var id = this.href.substring(this.href.indexOf("#"));
    $("div.content-container").not(id).hide();
    $(id).show();
});