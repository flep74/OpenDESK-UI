var globalHeader = require('../common/globalHeader.po.js');
var loginPage = require('../login/loginPage.po.js');

describe('openESDH login page', function() {




    describe('openDESK search document', function() {

        it('should be able to search and find an existing document', function() {

            loginPage.loginAsAdmin();

        });
    });


    it('should be able to access login page and login to user dashboard', function() {

        browser.get("http://localhost:8000/#/testdata").then (function(response) {
            browser.driver.sleep(5500);
            console.log("done");
        });



    });
});