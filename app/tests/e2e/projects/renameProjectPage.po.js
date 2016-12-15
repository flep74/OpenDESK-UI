var globalHeaderMenu = require('../common/globalHeader.po.js');
var date = new Date();
var projectRenamed = "projektnavn-omdøbt " + date.getTime();
var projectList;
var constants = require('../common/constants');

var RenameProjectPage = function () {
    
    var public = {};
    
    console.log("create");
    
	public.getProjectList = function() {
		projectList = element.all(by.repeater('project in vm.sites'));
	    return projectList	
	}
    
    public.getRenamedProject = function() {
    	return projectRenamed;
    }

    public.renameProject = function() {

			'use strict';
			//Select all date elements and apply filter function
			element.all(by.repeater('project in vm.sites')).filter(function (elem) {
				//Return the element or elements
				return elem.getText().then(function (text) {
					//Match the text

					return text.indexOf(constants.PROJECT_NAME_USED_FOR_RENAME_PROJECT) >= 0;
				});
			}).then(function (filteredElements) {
				//filteredElements is the list of filtered elements

				var documentOptionsBtn = filteredElements[0].all(by.css('[ng-click="vm.openMenu($mdOpenMenu, $event)"]')).first();

				var selectRenameBtn = element.all(by.css('[ng-click="vm.renameSiteDialog($event, project)"]')).last();
				var renameInput = element(by.model('newSiteName'));
				var renameProjectBtn = element(by.css('[aria-label="Tilføj"]'));

				documentOptionsBtn.click();
				browser.driver.sleep(2000);


				browser.driver.sleep(500);

				selectRenameBtn.click();

				browser.driver.sleep(500);

				renameInput.clear();
				renameInput.sendKeys(projectRenamed);

				renameProjectBtn.click();

				browser.driver.sleep(500);
			});


    	

	        
    }; 
    

    return public;
};

module.exports = RenameProjectPage();
