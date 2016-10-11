var globalHeaderMenu = require('../common/globalHeader.po.js');

var AddMemberPage = function () {
    
    var public = {};


    public.addMember = function (project_name, member_name, member_role) {
        console.log("well, hello");
    }

    return public;
};

module.exports = AddMemberPage();
