var globalHeader = require('../common/globalHeader.po.js');
var loginPage = require('../login/loginPage.po.js');

describe('openESDH login page', function() {


    //Executed before each of the "it" tests
    beforeEach(function () {
        console.log("loggin in");
        loginPage.loginAsAdmin();;
    });

    //logout and wait for 2 secs
    afterEach(function () {
        loginPage.logout();
    });


    it('should be able to access login page and login to user dashboard', function() {

        browser.get("http://localhost:8000/#/testdata").then (function(response) {
            browser.driver.sleep(5500);
            console.log("done");
        });



    });
});