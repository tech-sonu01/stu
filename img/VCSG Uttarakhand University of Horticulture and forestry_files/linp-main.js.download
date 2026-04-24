jQuery(function ($) {


    if (
        ed_school_plugin &&
        ed_school_plugin.data &&
        ed_school_plugin.data.styles &&
        ed_school_plugin.data.styles.length
    ) {
        var styles = ed_school_plugin.data.styles.join('');
        var styles = '<style id="style-ed-school-plugin">'+styles+'</style>';
        jQuery('head').append(styles);
    }


    if (
        ed_school_plugin &&
        ed_school_plugin.data &&
        ed_school_plugin.data.vcWidgets &&
        ed_school_plugin.data.vcWidgets.countdown &&
        ed_school_plugin.data.vcWidgets.countdown.items
    ) {


        var parser = /([0-9]{2})/gi;
        var currDate = '00:00:00:00:00';
        var nextDate = '00:00:00:00:00';
        var newDateFormat = '';

        var symbols = {
            years: '%Y',
            months: '%m',
            weeks: '%w',
            days: '%d',
            hours: '%H',
            minutes: '%M',
            seconds: '%S'
        };

        var template = '';
        template += '<div class="time <%= label %>">';
        template += '<span class="count curr top"><%= curr %></span>';
        template += '<span class="count next top"><%= next %></span>';
        template += '<span class="count next bottom"><%= next %></span>';
        template += '<span class="count curr bottom"><%= curr %></span>';
        template += '<span class="label"><%= label.length < 6 ? label : label.substr(0, 3)  %></span>';
        template += '</div>';
        template = _.template(template);

        $.each(ed_school_plugin.data.vcWidgets.countdown.items, function (i, countdown) {


            // Parse countdown string to an object
            function strfobj(str) {
                var parsed = str.match(parser),
                    obj = {};
                labels.forEach(function (label, i) {
                    obj[label] = parsed[i]
                });
                return obj;
            }

            // Return the time components that diffs
            function diff(obj1, obj2) {
                var diff = [];
                labels.forEach(function (key) {
                    if (obj1[key] !== obj2[key]) {
                        diff.push(key);
                    }
                });
                return diff;
            }

            var out = '';
            var labels = countdown.options.labels.split(/[\s,]+/);
            var $countdown = $('#' + countdown.id);

            // Build the layout
            var initData = strfobj(currDate);

            $.each(labels, function (i, label) {

                var symbol = symbols[label];
                if (symbol) {

                    if (i) {
                        newDateFormat += ':' + symbol;
                    } else {
                        newDateFormat += symbol;
                    }


                    //out += '<div class="date-block"><span class="date ' + label + '">' + symbol + '</span><span class="label">' + label + '</span></div>';
                }

                $countdown.append(template({
                    curr: initData[label],
                    next: initData[label],
                    label: label
                }));
            });

            //$countdown.countdown('2020/10/10', function (event) {
            //    var $this = $(this).html(event.strftime(out));
            //});



            $countdown.countdown(countdown.options.targetDate, function (event) {

                var newDate = event.strftime(newDateFormat),
                    data;

                if (newDate !== nextDate) {
                    currDate = nextDate;
                    nextDate = newDate;
                    // Setup the data
                    data = {
                        'curr': strfobj(currDate),
                        'next': strfobj(nextDate)
                    };
                    // Apply the new values to each node that changed
                    diff(data.curr, data.next).forEach(function (label) {
                        var selector = '.%s'.replace(/%s/, label),
                            $node = $countdown.find(selector);
                        // Update the node
                        $node.removeClass('flip');
                        $node.find('.curr').text(data.curr[label]);
                        $node.find('.next').text(data.next[label]);
                        // Wait for a repaint to then flip
                        _.delay(function ($node) {
                            $node.addClass('flip');
                        }, 50, $node);
                    });
                }
            });


        });


    }

});
