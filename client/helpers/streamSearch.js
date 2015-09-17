var options = {
    keepHistory: 1000 * 60 * 5,
    localSearch: true
};
var fields = ['name'];

StreamSearch = new SearchSource('streams', fields, options);

Template.searchResult.helpers({
    getStreams: function() {
        return StreamSearch.getData({
            transform: function(matchText, regExp) {
                return matchText.replace(regExp, "<b>$&</b>")
            },
            sort: {isoScore: -1}
        });
    },

    isLoading: function() {
        return StreamSearch.getStatus().loading;
    }
});

Template.searchResult.events({
    'click #searchResultItem': function(e) {
        var stream = {
            x: 0,
            y: 0,
            width: 2,
            height: 3,
            url: $(e.target).find('[name=url]').context.innerHTML
        };

        TempGridTiles.insert(stream);
    }
});

Template.searchResult.rendered = function() {
    StreamSearch.search('');
};

Template.searchBox.events({
    "keyup #search-box": _.throttle(function(e) {
        var text = $(e.target).val().trim();
        StreamSearch.search(text);
    }, 200)
});