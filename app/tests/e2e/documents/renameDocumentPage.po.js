var globalHeaderMenu = require('../common/globalHeader.po.js');
var date = new Date();
var documentRenamed = "dokument-omdøbt " + date.getTime();
var documentList;

var RenameDocumentPage = function () {
    
    var public = {};
    
    console.log("rename document");
    
	public.getDocumentList = function() {
		documentList = element.all(by.repeater('content in contents')).getText();
	    return documentList	
	}
    
    public.getRenamedDocument = function() {
    	return documentRenamed;
    }

    public.renameDocument = function() {
    	/*
	    	//go to where document is placed
	    	var breadcrumbElmNo = element.all(by.repeater('path in bcPath')).count();
	    	breadcrumbElmNo.then(function(count) {
	    		var lastBreadcrumbLink = element.all(by.repeater('path in bcPath')).get(count - 2);
	    		lastBreadcrumbLink.click();
	      	});
    	*/
    	browser.driver.sleep(5000);
	    	//Detect project to rename
	    	var documentToRename = element.all(by.repeater('content in contents')).get(0).getText();
	    	var documentOptionsBtn = element.all(by.css('[ng-click="vm.openMenu($mdOpenMenu, $event)"]')).first();

	    	documentOptionsBtn.click();
	    	
	    	var selectRenameBtn = element.all(by.css('[ng-click="vm.renameDocumentDialog($event, content.nodeRef)"]')).last().getText();
	        	
	    	selectRenameBtn.click();
	    	
	    	var renameInput = element(by.model('dialog.result'));
	    	var renameDocumentBtn = element(by.css('[aria-label="Omdøb"]'));
	    	
	        renameInput.clear();
	        renameInput.sendKeys(documentRenamed);
	        
	        renameDocumentBtn.click();
	        
    }; 
    

    return public;
};

module.exports = RenameDocumentPage();
