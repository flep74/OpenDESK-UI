
var globalHeader = require('../common/globalHeader.po.js');
//var constants = require('../common/constants');
//var addMemberPage = require('./addMemberPage.po.js');
var loginPage = require('../login/loginPage.po.js');

describe('openESDH login page', function() {


    //Executed before each of the "it" tests
    beforeEach(function () {
        loginPage.loginAsAdmin();
    });

//logout and wait for 2 secs
    afterEach(function () {


        loginPage.logout();
    });


    //browser.get("http://localhost:8000/#/projekter/test").then (function(response) {
    //    console.log("done going to projekter/test");
    //});



    //it('should be able to access login page and login to user dashboard', function() {
    //    addMemberPage.addMember("","","");
    //    //detect the userMenu button
    //    expect(globalHeader.getHeaderMenuItem().userMenuBtn);
    //    loginPage.logout();
    //});
});