var globalHeaderMenu = require('../common/globalHeader.po.js');
var date = new Date();
var projectRenamed = "projektnavn-omdøbt " + date.getTime();
var projectList;

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
    	
	    	//Detect project to rename
	    	var projectToRename = element.all(by.repeater('project in vm.sites')).get(0).getText();
	    	
	    	var projectOptionsBtn = element.all(by.css('[ng-click="vm.openMenu($mdOpenMenu, $event)"]')).first();
	    	var selectRenameBtn = element.all(by.css('[ng-click="vm.renameSiteDialog($event, project)"]')).last();
	    	var renameInput = element(by.model('newSiteName'));
	    	var renameProjectBtn = element(by.css('[aria-label="Tilføj"]'));
	    		                
	        projectOptionsBtn.click();
	        
	        browser.driver.sleep(500);
	        
	        selectRenameBtn.click();
	        
	        browser.driver.sleep(500);
	        
	        renameInput.clear();
	        renameInput.sendKeys(projectRenamed);
	        
	        renameProjectBtn.click();
	        
	        browser.driver.sleep(500);
	        
    }; 
    

    return public;
};

module.exports = RenameProjectPage();
