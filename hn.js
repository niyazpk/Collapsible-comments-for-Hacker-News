javascript:(function() {
    function getScript(url, success) {
        var script = document.createElement('script');
        script.src = url;
        var head = document.getElementsByTagName('head')[0],
        done = false;
        script.onload = script.onreadystatechange = function() {
            if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                done = true;
                success();
                script.onload = script.onreadystatechange = null;
                head.removeChild(script);
            }
        };
        head.appendChild(script);
    }
    getScript('//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js',
    function() {
        if (typeof jQuery !== 'undefined') {
            if (!$('body').hasClass('collapsible-comments')) {
                
                $('body').addClass('collapsible-comments');
                var span_html = '<span style=\'cursor:pointer;margin-left:10px;\' class=\'expand-handle\'>[-]</span>';
                
                if (window.location.href.indexOf('item?id=') != -1) {
                    $('center > table > tbody > tr:eq(2) > td > table:eq(1) span.comhead').append(span_html);
                } else if (window.location.href.indexOf('threads?id=') != -1) {
                    $('center > table > tbody > tr > td > table span.comhead').append(span_html);
                }

                $('.expand-handle').live('click',
                function() {

                    current_level_width = parseInt($(this).closest('tr').find('td:eq(0) > img').attr('width'), 10);

                    $(this).closest('table').closest('tr').nextAll().each(function(index, el) {
                        var elWidth = parseInt($('tbody > tr > td > img', this).attr('width'), 10);
                        console.log(elWidth > current_level_width, typeof elWidth);
                        if (elWidth > current_level_width) {
                            if (elWidth <= inner_level_width) {
                                inner_level_width = 1000;
                                $(this).hide();
                            }
                            if (inner_level_width == 1000 && $('.comment', this).css('display') == 'none') {
                                inner_level_width = elWidth;
                            }
                        } else {
                            return false;
                        }
                    });

                    inner_level_width = 1000;
                    $(this).text('[+]').addClass('expand-handle-collapsed').removeClass('expand-handle');
                    $(this).closest('div').nextAll().hide();
                    $(this).closest('div').parent().prev().hide();
                    $(this).closest('div').css({
                        'margin-left': '18px',
                        'margin-bottom': '5px'
                    });
                });

                $('.expand-handle-collapsed').live('click',
                function() {

                    current_level_width = parseInt($(this).closest('tr').find('td > img').attr('width'), 10);

                    $(this).closest('table').closest('tr').nextAll().each(function(index, el) {
                        var elWidth = parseInt($('tbody > tr > td > img', this).attr('width'), 10);
                        if (elWidth > current_level_width) {
                            if (elWidth <= inner_level_width) {
                                inner_level_width = 1000;
                                $(this).show();
                            }
                            if (inner_level_width == 1000 && $('.comment', this).css('display') == 'none') {
                                inner_level_width = elWidth;
                            }
                        } else {
                            return false;
                        }
                    });

                    inner_level_width = 1000;
                    $(this).text('[-]').addClass('expand-handle').removeClass('expand-handle-collapsed');
                    $(this).closest('div').nextAll().show();
                    $(this).closest('div').parent().prev().show();
                    $(this).closest('div').css({
                        'margin-left': '0',
                        'margin-bottom': '-10px'
                    });
                });
            }
        }
    });

    var current_level_width = 0;
    var inner_level_width = 1000;

})();


