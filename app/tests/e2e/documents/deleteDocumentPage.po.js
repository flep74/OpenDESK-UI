var globalHeaderMenu = require('../common/globalHeader.po.js');
var date = new Date();
var deletedDocumentName = "";
var documentList = "";

var DeleteDocumentPage = function () {
    
    var public = {};
    
    console.log("search document");
    
	public.getDocumentList = function() {
		documentList = element.all(by.repeater('content in contents')).getText();
	    return documentList	
	}
    
    public.getDeletedDocumentName = function() {
    	return deletedDocumentName;
    }
    
    public.deleteDocument = function() {
    	
    	//deletedDocument = element.all(by.repeater('path in bcPath')).last().getText();
    	//go to where document is placed
    	var breadcrumbElmNo = element.all(by.repeater('path in bcPath')).count();
    	breadcrumbElmNo.then(function(count) {
    		var lastBreadcrumbLink = element.all(by.repeater('path in bcPath')).get(count - 2);
    		lastBreadcrumbLink.click();
      	});
    	//Detect project to delete
    	var documentToDelete = element.all(by.repeater('content in contents')).get(0).getText();
    	var documentOptionsBtn = element.all(by.css('[ng-click="vm.openMenu($mdOpenMenu, $event)"]')).first();

    	documentOptionsBtn.click();
    	
    	var selectdeleteBtn = element.all(by.css('[ng-click="vm.deleteFileDialog($event, content.nodeRef)"]')).last().getText();
        	
    	selectdeleteBtn.click();
    	
    	var deleteProjectBtn = element(by.css('[aria-label="Slet"]'));
    	deleteProjectBtn.click();
    	
    	deletedDocumentName = documentToDelete;
    }; 
    
    return public;
};

module.exports = DeleteDocumentPage();
