var globalHeaderMenu = require('../common/globalHeader.po.js');
var deletedProjectName;
var projectList;


var DeleteProjectPage = function () {
    
    var public = {};
    
    console.log("delete");
    
	public.getProjectList = function() {
		projectList = element.all(by.repeater('project in vm.sites'));
	    return projectList	
	}
    
    public.getDeletedProject = function() {
    	return deletedProjectName;
    }

    public.deleteProject = function() {
    	console.log("delete");
    	
    	//Detect project to delete
    	var projectToDelete = element.all(by.repeater('project in vm.sites')).get(0).getText();
    	var projectOptionsBtn = element.all(by.css('[ng-click="vm.openMenu($mdOpenMenu, $event)"]')).first();
    	var selectDeleteBtn = element.all(by.css('[ng-click="vm.deleteSiteDialog(project.shortName)"]')).last();
        var deleteProjectBtn = element(by.css('[aria-label="Ja"]'));
    	
        //browser.driver.sleep(500);
                
        projectOptionsBtn.click();
        
        browser.driver.sleep(500);
        
        selectDeleteBtn.click();
        
        browser.driver.sleep(500);
        
        deleteProjectBtn.click();
        
        browser.driver.sleep(500);
        
        deletedProjectName = projectToDelete;
/*
        deletedProjectName.then(function(text) {
      	  console.log("deletedProjectName " + text);
      	});
*/
    }; 

    return public;
};

module.exports = DeleteProjectPage();
