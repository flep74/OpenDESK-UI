angular.module('openDeskApp.sites').factory('groupService', GroupService);

function GroupService(ALFRESCO_URI, $http, $q) {
    var GROUP_PROXY_URI = ALFRESCO_URI.serviceApiProxy + 'groups/';
    return {
        listAllSystemGroups: listAllSystemGroups,
        listGroupsByType: listGroupsByType,
        isGroupMember: isGroupMember,
        getGroup: getGroup,
        getGroupMembers: getGroupMembers,
        addGroupMembers: addGroupMembers,
        findGroup: findGroup,
        removeMemberFromGroup: removeMemberFromGroup,
        createGroup: createGroup,
        updateGroup: updateGroup,
        deleteGroup: deleteGroup,
        uploadGroupsCSVFile: uploadGroupsCSVFile,
        getGroupsAndMembers: getGroupsAndMembers,
        getSubGroups: getSubGroups
    };

    /**
     * Lists all the groups in the system
     * @returns {*}
     */
    function listAllSystemGroups() {
        //limit maximum results to 100
        return $http.get(ALFRESCO_URI.serviceApiProxy + 'groups?filter=*&maxItems=100')
            .then(successOrReject);
    }

    function listGroupsByType(type, filter) {
        var params = {
            zone: null,
            filter: filter,
            sortBy: "displayName",
            sortAsc: true,
            //paging
            skipCount: null,
            maxItems: null
        };
        if (type == 'ALL')
            return listAllSystemGroups();
        else
            return $http.get(ALFRESCO_URI.serviceApiProxy + 'groups/list/' + type, params)
                .then(successOrReject);
    }

    /**
     * returns a boolean value indicating whether the user is part of a group
     * @param userName
     * @param groupShortName
     * @returns boolean
     */
    function isGroupMember(userName, groupShortName) {
        return $http.get(GROUP_PROXY_URI + groupShortName + '/member/' + userName).then(function (response) {
            return response.isMember;
        });
    }

    function findGroup(term) {
        return $http.get(ALFRESCO_URI.serviceApiProxy + "groups?zone=APP.DEFAULT&maxItems=250&sortBy=displayName&shortNameFilter=" + term).then(successOrReject);
    }

    function getGroupsAndMembers (shortName) {
        return $http.post("/alfresco/service/groups", {
            PARAM_METHOD : "getGroupsAndMembers",
            PARAM_SITE_SHORT_NAME: shortName
        }).then(function(response) {
            return response.data;
        });
    }

    /**
     * returns a group given its shortName
     * @param groupShortName
     * @returns {*}
     */
    function getGroup(groupShortName) {
        return $http.get(GROUP_PROXY_URI + groupShortName).then(successOrReject);
    }

    function getGroupMembers (groupShortName) {
        return $http.post("/alfresco/service/groups", {
            PARAM_METHOD : "getGroupMembers",
            PARAM_GROUP_NAME: groupShortName
        }).then(function(response) {
            return response.data;
        });
    }

    // use this for groups that contain groups

    function getSubGroups(groupShortName) {
        return $http.get(GROUP_PROXY_URI + groupShortName + '/children?maxItems=500').then(successOrReject);
    }

    /**
     * Adds a user to a group
     * @param candidates an object that should contain two properties; users and groups, to be added to the group.
     * @param groupShortName
     * @returns {} empty object if successful
     */
    // TODO: This method have to accept an array of users
    // [{name: 'the_name', username: 'the_username'}, {...}]
    function addGroupMembers(groupShortName, candidates) {
        return $http.put(GROUP_PROXY_URI + groupShortName + '/children', {
            users: candidates.users.toString(),
            groups: candidates.groups.toString()
        })
            .then(successOrReject);
    }

    /**
     * Deletes a user from a group (Does not delete the user from system)
     * @param groupShortName
     * @param userName
     * @returns {*} an empty object
     */
    function removeMemberFromGroup(groupShortName, userName) {
        return $http.delete(GROUP_PROXY_URI + groupShortName + '/children/' + userName).then(successOrReject);
    }

    /**
     * Creates a group given a shortName (this must contain NO SPACES) and a display name.
     * @param groupShortName
     * @param displayName
     * @returns {*} Newly created group object
     */
    function createGroup(groupShortName, displayName) {
        return $http.post(GROUP_PROXY_URI + groupShortName + '/create', null, {params: {displayName: displayName}})
            .then(successOrReject);
    }

    /**
     * Updates a group displayName.
     * @param displayName
     * @returns {*} Newly created group object
     */
    function updateGroup(groupShortName, displayName) {
        return $http.post(GROUP_PROXY_URI + groupShortName, {params: {displayName: displayName}})
            .then(successOrReject);
    }

    /**
     * Deletes a group given its shortName (Will not delete users or subgroups)
     * @param groupShortName
     * @returns {*} empty obj
     */
    function deleteGroup(groupShortName) {
        return $http.delete(GROUP_PROXY_URI + groupShortName).then(successOrReject);
    }

    function successOrReject(response) {
        if (response.status && response.status !== 200) {


            return $q.reject(response);
        }
        return response.data || response;
    }

    function uploadGroupsCSVFile(file) {

        var formData = new FormData();
        formData.append("filedata", file);
        formData.append("filename", file.name);

        return $http.post("/api/opendesk/groups/upload", formData, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(function (response) {
            return response.data;
        });
    }
}
