var globalHeader = require('../common/globalHeader.po.js');
var loginPage = require('../login/loginPage.po.js');
var oeUtils = require('../common/utils');

describe('openESDH login page', function() {




    describe('openDESK search document', function() {

        it('should be able to search and find an existing document', function() {

            loginPage.loginAsAdmin();

        });
    });


    it('should be able to access login page and login to user dashboard', function() {


        browser.get("http://localhost:8000/#/testdata").then (function(response) {
            console.log("done");
            browser.sleep(7500);
        });





    });
});