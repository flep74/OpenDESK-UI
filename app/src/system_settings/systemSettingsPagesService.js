angular.module('openDeskApp.systemsettings').provider('systemSettingsPagesService', SystemSettingsPagesServiceProvider);

function SystemSettingsPagesServiceProvider() {
    var pages = [];
    this.addPage = addPage;
    this.$get = SystemSettingsPagesService;

    /**
     * @param labelKey - key for translation
     * @param sref - of page
     * @param icon - material icon name; default: 'content_copy'
     * @returns {SystemSettingsPagesServiceProvider}
     */
    function addPage(labelKey, sref, isAdminOnly, icon) {
        pages.push({
            labelKey: labelKey,
            sref: sref,
            isAdminOnly: isAdminOnly,
            icon: icon || 'content_copy'
        });
        return this;
    }

    function SystemSettingsPagesService() {
        var service = {
            getPages: getPages,
            addPage: addPage
        };
        return service;

        function getPages() {
            return pages;
        }
    }
}