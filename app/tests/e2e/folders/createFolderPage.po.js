var globalHeaderMenu = require('../common/globalHeader.po.js');
var date = new Date();
var folderName = "folder " + date.getTime();
var folderList;

var CreateFolderPage = function () {
    
    var public = {};
    
    console.log("create new folder");
    
	public.getFolderList = function() {
		folderList = element.all(by.repeater('content in contents'));
	    return folderList	
	}
    
    public.getCreatedFolder = function() {
    	return folderName;
    }

    public.createFolder = function() {
    	
    	var selectProject = element.all(by.repeater('project in vm.sites')).get(0);
    	var folderNameInput = element(by.model('newFolderName'));
    	var addFolderBtn = element(by.css('[aria-label="Tilføj"]'));
    	
    	
    	selectProject.click();
    	browser.driver.sleep(500);
    	    	
    	newFolderBtn = element(by.css('[ng-click="vm.newFolderDialog($event)"]'));
    	
    	newFolderBtn.click();
    	browser.driver.sleep(500);
    	
    	folderNameInput.sendKeys(folderName);
    	
    	addFolderBtn.click();

    }; 
    

    return public;
};

module.exports = CreateFolderPage();
