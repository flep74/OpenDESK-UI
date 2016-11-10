
var globalHeader = require('../common/globalHeader.po.js');
var constants = require('../common/constants');
var addMemberPage = require('./addMemberPage.po.js');
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




    it('should be able to access login page and login to user dashboard', function() {


        browser.get("http://localhost:8000/#/projekter/" + constants.PROJECT_NAME_1).then (function(response) {

            addMemberPage.addMember(constants.PROJECT_NAME_1, constants.PROJECT_NAME_1_MEMBER1.name, constants.PROJECT_NAME_1_MEMBER1.role);


            //var members = element(by.css('ng-repeat="member in members"'));

            element.all(by.repeater('member in members')).then(function(posts) {




                for (var p in posts) {
                    var member = posts[p];

                    var e = member.element.all(by.className('ng-binding'));


                    e.getText().then(function (text) {
                        console.log(text);
                    });



                }

                    //expect(titleElement.getText()).toEqual('YourEnteredTitle');
            });

            expect(globalHeader.getHeaderMenuItem().userMenuBtn);
        });

    });
});