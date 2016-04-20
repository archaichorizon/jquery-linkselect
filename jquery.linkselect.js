/*jslint this:true multivar:true browser:true*/
/*global jQuery, window*/
/**
 * jquery-linkselect.
 *
 * @copyright Copyright (c) 2012-2016, Dan Bettles
 * @author Dan Bettles <dan@archaichorizon.com>
 */

(function (jQuery, window) {
    'use strict';

    jQuery.extend({

        /**
         * @namespace Contains resources used by jquery-linkselect.
         */
        linkselect: {

            /**
             * @type Number
             */
            lastId: 0,

            /**
             * Returns a new ID for a link-select.
             *
             * @returns {String}
             */
            createElementId: function () {
                jQuery.linkselect.lastId += 1;

                return 'link-select-' + String(jQuery.linkselect.lastId);
            },

            /**
             * @param {jQuery} $select
             * @returns {undefined}
             */
            selectChange: function ($select) {
                window.location.assign($select.val());
            }
        }
    });

    jQuery.fn.extend({

        /**
         * @param {Object} [options]
         * @returns {jQuery}
         */
        linkSelect: function (options) {
            var finalOptions = jQuery.extend({
                label: undefined,
                select: {
                    placeholder: 'Please select an option'
                },
                submitButton: {
                    label: 'Go'
                },
                selectedSelector: '.selected'
            }, options || {});

            return this.each(function () {
                var $container = jQuery(this),
                    $anchors,
                    $form,
                    $formRow,
                    $select,
                    selectId;

                $anchors = $container.find('a');

                if (!$anchors.size()) {
                    return true;
                }

                $container.hide();

                $form = jQuery('<form method="get" action="#"/>')
                    .submit(function (e) {
                        e.preventDefault();
                        jQuery.linkselect.selectChange(jQuery(this).find('select'));
                    })
                    .insertAfter($container);

                selectId = jQuery.linkselect.createElementId();

                $formRow = jQuery('<div/>')
                    .appendTo($form);

                if (finalOptions.label !== undefined) {
                    jQuery('<label/>', {for: selectId})
                        .text(finalOptions.label)
                        .appendTo($formRow);
                }

                $select = jQuery('<select/>', {id: selectId})
                    .appendTo($formRow);

                $anchors.each(function () {
                    var $anchor = jQuery(this),
                        attrs = {value: $anchor.attr('href')};

                    if ($anchor.is(finalOptions.selectedSelector)) {
                        attrs.selected = 'selected';
                    }

                    jQuery('<option/>', attrs)
                        .text($anchor.text())
                        .appendTo($select);
                });

                if (finalOptions.submitButton) {
                    jQuery('<button type="submit"/>')
                        .html('<span>' + finalOptions.submitButton.label + '</span>')
                        .appendTo($formRow);
                } else {
                    $select
                        .prepend('<option value="">' + finalOptions.select.placeholder + '</option>')
                        .change(function () {
                            if ($select.val().length) {
                                jQuery.linkselect.selectChange($select);
                            }
                        });
                }
            });
        }
    });
}(jQuery, window));
