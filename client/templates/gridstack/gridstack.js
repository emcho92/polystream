Template.gridstack.helpers({
    tile: function () {
        return GridTiles.find();
    },
});
Template.gridstack.rendered = function () {
// Instantiate grid
    var gridstackOptions = {};
    $('.grid-stack').gridstack(gridstackOptions);

    // add onChange event listener
    $('.grid-stack').on('change',function (event, items) {
        _.each(items, function (item) {
            var attributes = item.el.data();
            GridTiles.update({_id:attributes.panelId}, {$set:{x:attributes.gsX,
                y:attributes.gsY,height:attributes.gsHeight, width:attributes.gsWidth}});
        });

    });

    Template.gridstackItem.rendered = function () {
        // For each widget that is created, we use add_widget to associate it with the grid
        var grid = $('.grid-stack').data('gridstack');
        grid.add_widget(this.$('.grid-stack-item'));
    };
};

Template.gridstackItem.events({
    'submit form': function(e) {
        e.preventDefault();

        var stream = {
            url: $(e.target).find('[name=url]').val()
        };

        GridTiles.insert(stream);
    }
});