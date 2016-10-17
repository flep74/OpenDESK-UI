var globalHeaderMenu = require('../common/globalHeader.po.js');
var date = new Date();
var documentCopied = "";
var documentList;

var CopyDocumentPage = function () {
    
    var public = {};
    
    console.log("rename document");
    
	public.getDocumentList = function() {
		documentList = element.all(by.repeater('content in contents')).getText();
	    return documentList	
	}
    
    public.getDocumentCopied = function() {
    	return documentCopied;
    }

    public.copyDocument = function() {
    	
	    	//go to where document is placed
	    	var breadcrumbElmNo = element.all(by.repeater('path in bcPath')).count();
	    	breadcrumbElmNo.then(function(count) {
	    		var lastBreadcrumbLink = element.all(by.repeater('path in bcPath')).get(count - 2);
	    		lastBreadcrumbLink.click();
	      	});
    	
	    	//Detect project to copy
	    	var documentToCopy = element.all(by.repeater('content in contents')).get(0).getText();
	    	var documentOptionsBtn = element.all(by.css('[ng-click="vm.openMenu($mdOpenMenu, $event)"]')).first();
	    	documentCopied = documentToCopy;
	    	documentOptionsBtn.click();
	    	
	    	var selectCopyBtn = element.all(by.css('[ng-click="vm.copyFileDialog($event, content.nodeRef, content.parentNodeRef)"]')).last().getText();
	        	
	    	selectCopyBtn.click();
	    	
	    	//var oneLevelBackInFilePath = element.all(by.css('[ng-click="ctrl.browseParent()"]'));
	    	var oneLevelBackInFilePath = element(by.css('[aria-label="navigate_before"]'));
	    	oneLevelBackInFilePath.click();
	    	//browser.driver.sleep(5000);
	    	var selectFirstFolder = element.all(by.css('[ng-click="ctrl.pickNode(dir.nodeRef)"]')).first();
	    	selectFirstFolder.click();
	    	
	    	var copyBtn = element(by.css('[aria-label="Kopiér hertil"]'));
	    	copyBtn.click();
	    	
	    	//go to location where document is copiedß
	    	breadcrumbElmNo = element.all(by.repeater('path in bcPath')).count();
	    	breadcrumbElmNo.then(function(count) {
	    		var lastBreadcrumbLink = element.all(by.repeater('path in bcPath')).get(count - 2);
	    		lastBreadcrumbLink.click();
	      	});
	    	
	    	//copied document is placed in first folder or project
	    	element.all(by.repeater('content in contents')).get(0).click();
    }; 
    

    return public;
};

module.exports = CopyDocumentPage();
