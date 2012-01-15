/*globals jQuery*/
/**
 * jquery-linkselect
 * 
 * @copyright Copyright (c) 2012, Dan Bettles 
 * @author Dan Bettles <dan@archaichorizon.com>
 */

/**
 * jquery-linkselect replaces each selected element with a link-launching form created from all links found within the
 * element.  Each form comprises a drop-down listbox, containing details of the links, and a submit button.
 * 
 * @param {Object} [options]
 */
jQuery.fn.linkSelect = function (options) {
    var actualOptions = jQuery.extend({
        retainContainer: false
    }, options || {});

    return this.each(function () {
        var oContainerEl = jQuery(this),
            oLinkEls = oContainerEl.find('a'),
            oFormEl = null,
            oBundleEl = null,
            oSelectEl = null,
            selectDomId = '';

        if (oLinkEls.length < 1) {
            return true;
        }

        if (actualOptions.retainContainer === false) {
            oContainerEl.hide();
        }

        selectDomId = jQuery.linkselect.createDomId();
        oSelectEl = jQuery('<select/>').attr('id', selectDomId);

        oLinkEls.each(function () {
            var oLinkEl = jQuery(this);

            oSelectEl.append(
                jQuery('<option/>')
                    .attr('value', oLinkEl.attr('href'))
                    .text(oLinkEl.text())
            );
        });

        oBundleEl = jQuery('<div/>');

        if (typeof actualOptions.label !== 'undefined') {
            oBundleEl.append(
                jQuery('<label/>')
                    .attr('for', selectDomId)
                    .text(actualOptions.label)
            );
        }

        oFormEl = jQuery('<form method="get" action="#"/>')
            .submit(function () {
                window.location.href = jQuery('select', this).val();
                return false;
            })
            .append(
                oBundleEl
                    .append(oSelectEl)
                    .append('<input type="submit" value="Go"/>')
            );

        oContainerEl.after(oFormEl);

        return true;
    });
};

/**
 * @namespace Contains resources used by the linkselect plugin
 */
jQuery.linkselect = {

    /**
     * @type Integer
     */
    lastId: 0,

    /**
     * Returns a new DOM ID for a link-SELECT
     * 
     * @return String
     */
    createDomId: function () {
        return 'link_select_' + (jQuery.linkselect.lastId += 1);
    }
};