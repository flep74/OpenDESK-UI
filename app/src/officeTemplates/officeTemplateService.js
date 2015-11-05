
    angular
        .module('openeApp.officeTemplates')
        .factory('officeTemplateService', officeTemplateService);

    function officeTemplateService($http, userService, alfrescoNodeUtils) {
        return {
            getTemplates: getTemplates,
            getTemplate: getTemplate,
            fillTemplate: fillTemplate,
            uploadTemplate: uploadTemplate,
            getCardViewThumbnail: getCardViewThumbnail
        };

        function getTemplates() {
            return $http.get('/alfresco/service/api/openesdh/officetemplates').then(function (response) {
                return response.data;
            });
        }

        function getTemplate(nodeRef) {
            return $http.get('/alfresco/service/api/openesdh/officetemplates/' + alfrescoNodeUtils.processNodeRef(nodeRef).uri).then(function (response) {
                return response.data;
            });
        }

        /**
         * Fill the given template with the field data.
         *
         * The return value is a promise which returns a Blob containing
         * the filled in template.
         * @param nodeRef
         * @param fieldData
         * @returns {*}
         */
        function fillTemplate(nodeRef, fieldData) {
            return $http.post('/alfresco/service/api/openesdh/officetemplates/' + alfrescoNodeUtils.processNodeRef(nodeRef).uri + "/fill",
                {fieldData: fieldData},
                {responseType: 'arraybuffer'}
            ).then(function (response) {
                return new Blob([response.data], {
                    type: response.headers('Content-Type')
                });
            });
        }

        function uploadTemplate(formData) {
            var tmplFileData = new FormData();
            tmplFileData.append("filedata", formData.fileToUpload);
            tmplFileData.append("filename", formData.fileToUpload.name);
            angular.forEach(formData.templateProperties, function (value, key) {
                tmplFileData.append(key, value);
            });

            return $http.post('/alfresco/service/api/openesdh/officetemplate', tmplFileData, {
                transformRequest: angular.identity, headers: {'Content-Type': undefined}
            }).then(function(response) {
                return response.data;
            });
        }

        function getCardViewThumbnail (nodeRef, thumbnailName){
            var nodeRefAsLink = nodeRef.replace(":/", ""),
                noCache = "&noCache=" + new Date().getTime(),
                force = "c=force";
            return "/alfresco/s/api/node/" + nodeRefAsLink + "/content/thumbnails/"+(thumbnailName ? thumbnailName : "cardViewThumbnail") + "?" + force + noCache + '&' + this._getSessionTicket();
        }
    }