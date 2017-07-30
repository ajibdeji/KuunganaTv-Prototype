// $('#channel-business').on('click', function() {
//     // alert($('#video-broadcast').attr('src'));
//     $(this).addClass('active');
//     $('#video-broadcast').attr('src', 'http://localhost:4000/business');
// });

// $('#channel-politics').on('click', function() {
//     // alert($('#video-broadcast').attr('src'));
//     $(this).addClass('active');
//     $('#video-broadcast').attr('src', 'http://localhost:4000/politics');
// });

$('#channel-list .list-group-item').on('click', function(e) {
    e.preventDefault();
    // alert(e.target.id);
    activeClass(e.target.id, 'channel-list', 'active');
    var channel = $(`#${e.target.id}`).attr('data-channel');
    $('#video-broadcast').attr('src', `http://localhost:4000/${channel}`);

});

function activeClass(item, list, className) {
    $(`#${list} a`).each(function(index, a) {
        $(a).removeClass(className);
    });
    $(`#${item}`).addClass(className);
}