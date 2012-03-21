#jquery-linkselect#

jquery-linkselect replaces each selected element with a link-launching form created from all links found within the
element.  Each form comprises a drop-down listbox, containing details of the links, and a submit button.  You may also
specify a label, in which case a `LABEL` element will be associated with the listbox.

![](https://github.com/archaichorizon/jquery-linkselect/raw/master/screenshot_1.png)

##Usage##

Simply select elements containing links and call `linkSelect()`.  For example:

    jQuery('#favourites').linkSelect();

or:

    jQuery('#favourites').linkSelect({ label: 'Visit' });

Browse to `test/index.html` for working examples.