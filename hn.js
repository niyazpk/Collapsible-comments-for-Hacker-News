javascript:(function() {
    var otherlib = false;
    if (typeof jQuery == 'undefined' && typeof $ == 'function') {
        otherlib = true;
    }
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
    getScript('http://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js',
    function() {
        if (typeof jQuery != 'undefined') {
            if (otherlib) {
                $jq = jQuery.noConflict();
            }
            if (!jQuery('body').hasClass('collapsible-comments')) {
                jQuery('body').addClass('collapsible-comments');
                var span_html = '<span style=\'cursor:pointer;margin-left:10px;\' class=\'expand-handle\'>[-]</span>';
                if (window.location.href.indexOf('item?id=') != -1) {
                    jQuery('center > table > tbody > tr:eq(2) > td > table:eq(1) span.comhead').append(span_html);
                } else if (window.location.href.indexOf('threads?id=') != -1) {
                    jQuery('center > table > tbody > tr > td > table span.comhead').append(span_html);
                }
                jQuery('.expand-handle').live('click',
                function() {
                    current_level_width = jQuery(this).parents('tr').eq(0).find('td > img').attr('width');
                    jQuery(this).parents('table').eq(0).parents('tr').eq(0).nextAll().each(function(index, el) {
                        if (jQuery('tbody > tr > td > img', this).attr('width') > current_level_width) {
                            if (jQuery('tbody > tr > td > img', this).attr('width') <= inner_level_width) {
                                inner_level_width = 1000;
                                jQuery(this).hide();
                            }
                            if (inner_level_width == 1000 && jQuery('.comment', this).css('display') == 'none') {
                                inner_level_width = jQuery('tbody > tr > td > img', this).attr('width');
                            }
                        } else {
                            return false;
                        }
                    });
                    inner_level_width = 1000;
                    jQuery(this).text('[+]').addClass('expand-handle-collapsed').removeClass('expand-handle');
                    jQuery(this).closest('div').nextAll().hide();
                    jQuery(this).closest('div').parent().prev().hide();
                    jQuery(this).closest('div').css({
                        'margin-left': '18px',
                        'margin-bottom': '5px'
                    });
                });
                jQuery('.expand-handle-collapsed').live('click',
                function() {
                    current_level_width = jQuery(this).parents('tr').eq(0).find('td > img').attr('width');
                    jQuery(this).parents('table').eq(0).parents('tr').eq(0).nextAll().each(function(index, el) {
                        if (jQuery('tbody > tr > td > img', this).attr('width') > current_level_width) {
                            if (jQuery('tbody > tr > td > img', this).attr('width') <= inner_level_width) {
                                inner_level_width = 1000;
                                jQuery(this).show();
                            }
                            if (inner_level_width == 1000 && jQuery('.comment', this).css('display') == 'none') {
                                inner_level_width = jQuery('tbody > tr > td > img', this).attr('width');
                            }
                        } else {
                            return false;
                        }
                    });
                    inner_level_width = 1000;
                    jQuery(this).text('[-]').addClass('expand-handle').removeClass('expand-handle-collapsed');
                    jQuery(this).closest('div').nextAll().show();
                    jQuery(this).closest('div').parent().prev().show();
                    jQuery(this).closest('div').css({
                        'margin-left': '0',
                        'margin-bottom': '-10px'
                    });
                });
            }
        }
    });
})();
var current_level_width = 0;
var inner_level_width = 1000;