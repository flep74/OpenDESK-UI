var globalHeaderMenu = require('../common/globalHeader.po.js');
var oeUtils = require('../common/utils');
var date = new Date();
var projectName = "projektnavn " + date.getTime();
var projectList;

var CreateProjectPage = function () {
    
    var public = {};
    
    console.log("create");
    
	public.getProjectList = function() {
		projectList = element.all(by.repeater('project in vm.sites'));
	    return projectList	
	}
    
    public.getCreatedProject = function() {
    	return projectName;
    }

    public.createProject = function() {

        oeUtils.emptyTrashcan();
    	
    	var newProjectBtn = element(by.css('[ng-click="vm.newSite($event)"]'));
    	var projectNameInput = element(by.model('newSiteName'));
        var descriptionInput = element(by.model('newSiteDescription'));
        var addProjectBtn = element(by.css('[aria-label="Tilføj"]'));

        newProjectBtn.click();
        
        projectNameInput.sendKeys(projectName);
        descriptionInput.sendKeys("Jeg er overflødig");
               
        addProjectBtn.click();
        browser.driver.sleep(1000);
    }; 
    

    return public;
};

module.exports = CreateProjectPage();
