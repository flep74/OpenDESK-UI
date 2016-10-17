var globalHeaderMenu = require('../common/globalHeader.po.js');
var deletedFolderName;
var folderList;


var DeleteFolderPage = function () {
    
    var public = {};
    
    console.log("delete");
    
	public.getFolderList = function() {
		folderList = element.all(by.repeater('content in contents'));
	    return folderList	
	}
    
    public.getDeletedFolder = function() {
    	return deletedFolderName;
    }

    public.deleteFolder = function() {
    	console.log("delete folder");
    	
    	browser.driver.sleep(500);
    	
    	//Detect project to delete
    	var folderToDelete = element.all(by.repeater('content in contents')).first().getText();	
    	var folderOptionsBtn = element.all(by.css('[ng-click="vm.openMenu($mdOpenMenu, $event)"]')).get(1);
    	var selectDeleteBtn = element.all(by.css('[ng-click="vm.deleteFoldereDialog($event, content.nodeRef)"]')).last();
        var deleteFolderBtn = element(by.css('[aria-label="Slet"]'));
    	
        browser.driver.sleep(500);
        
        folderOptionsBtn.click();
        
        browser.driver.sleep(500);
        
        selectDeleteBtn.click();
        
        browser.driver.sleep(500);
        
        deleteFolderBtn.click();
        
        browser.driver.sleep(500);
        
        deletedFolderName = folderToDelete;
        
    }; 

    return public;
};

module.exports = DeleteFolderPage();
