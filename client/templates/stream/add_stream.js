Template.addStream.events({
    'submit form': function(e) {
        e.preventDefault();

        var stream = {
            x: 0,
            y: 0,
            width: 2,
            height: 2,
            url: $(e.target).find('[name=url]').val()
        };

        TempGridTiles.insert(stream);
    }
});

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}