Template.addStream.events({
    'submit form': function(e) {
        e.preventDefault();

        var stream = {
            x: 0,
            y: 0,
            width: 2,
            height: 3,
            url: $(e.target).find('[name=url]').val()
        };

        TempGridTiles.insert(stream);
    },
    "keyup #search-box": _.throttle(function(e) {
        var text = $(e.target).val().trim();
        StreamSearch.search(text);
    }, 200)
});