Template.gridstack.helpers({
    tile: function () {
        //return GridTiles.find();

        var stream = {
            x: 0,
            y: 1,
            width: 2,
            height: 2,
            url: "ee"
        };

        Session.set("nesto", stream);

        var streamArray = [];
        for (var key in Session.keys) {
            var object = JSON.parse(Session.keys[key]);
            streamArray.push({
                x: object.x,
                y: object.y,
                width: object.width,
                height: object.height,
                url: object.url
            });
        }

        return streamArray;
    },
});
Template.gridstack.rendered = function () {
    var gridstackOptions = {};
    $('.grid-stack').gridstack(gridstackOptions);

    // add onChange event listener
    $('.grid-stack').on('change',function (event, items) {
        _.each(items, function (item) {
            var attributes = item.el.data();
            //GridTiles.update({_id:attributes.panelId}, {$set:{x:attributes.gsX,
            //    y:attributes.gsY,height:attributes.gsHeight, width:attributes.gsWidth}});
            Session.set({_id:attributes.panelId}, {x:attributes.gsX, y:attributes.gsY, height:attributes.gsHeight, width: attributes.gsWidth});

            $('.grid-stack-item-content').each(function(index) {
                console.log($(this))
                //console.log($(this).children()[1].width);
                //console.log($(this).children()[1].height);
                //console.log($(this)[0].offsetWidth);
                //console.log($(this)[0].offsetHeight);
                $(this).children()[0].width = $(this)[0].offsetWidth;
                $(this).children()[0].height = $(this)[0].offsetHeight - 20;
            });
        });

    });

    Template.gridstackItem.rendered = function () {
        var grid = $('.grid-stack').data('gridstack');
        grid.add_widget(this.$('.grid-stack-item'));
    };
};

Template.gridstackItem.events({
    'submit form': function(e) {
        e.preventDefault();

        var stream = {
            x: 0,
            y: 1,
            width: 2,
            height: 2,
            url: $(e.target).find('[name=url]').val()
        };

        //GridTiles.insert(stream);
        Session.set("nesto", stream);
    }
});