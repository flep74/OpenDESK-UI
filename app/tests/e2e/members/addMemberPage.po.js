var globalHeaderMenu = require('../common/globalHeader.po.js');

var AddMemberPage = function () {
    
    var public = {};


    public.addMember = function (project_name, member_name, member_role) {


        console.log("inside addMember");

        var newMemberBtn = element(by.css('[ng-click="vm.newMember($event)"]'));

        newMemberBtn.click();

        browser.driver.sleep(500);

        var addMemberName_element = element(by.css('md-autocomplete input#newMember'));
        var addMemberRole_element = element(by.model('newMemberRole'));

        addMemberName_element.sendKeys(member_name);

        browser.sleep(3500);
        browser.driver.actions().mouseMove(addMemberName_element);
        addMemberName_element.sendKeys(protractor.Key.ARROW_DOWN);
        addMemberName_element.sendKeys(protractor.Key.ENTER);

        addMemberRole_element.sendKeys(member_role);


        browser.driver.sleep(200);

        var addMemberBtn = element(by.id('addMemberBtn'));

        addMemberBtn.click();

        browser.driver.sleep(5000);

    }

    return public;
};

module.exports = AddMemberPage();
