var globalHeaderMenu = require('../common/globalHeader.po.js');
var date = new Date();
var previewedDocument = "";
var previewHeadline = "";

var PreviewDocumentPage = function () {
    
    var public = {};
    
    console.log("search document");
    
	public.getPreviewHeadline = function() {
		//last element in breadcrumb must represent the searched/selected document
	    return previewHeadline	
	}
    
    public.getPreviewedDocument = function() {
    	return previewedDocument;
    }
    public.closeDialog = function() {
    	element(by.css('[aria-label="Luk"]')).click();
    	browser.driver.sleep(2500);
    }
    
    public.previewDocument = function() {
    	
    	//previewedDocument = element.all(by.repeater('path in bcPath')).last().getText();
    	
    	var breadcrumbElmNo = element.all(by.repeater('path in bcPath')).count();
    	//go to where document is placed
    	breadcrumbElmNo.then(function(count) {
    		var lastBreadcrumbLink = element.all(by.repeater('path in bcPath')).get(count - 2);
    		lastBreadcrumbLink.click();
      	});
    	
    	//click document to find its name in breadcrumb - the go back
    	element.all(by.repeater('content in contents')).get(0).click();
    	previewedDocument = element.all(by.repeater('path in bcPath')).last().getText();
    	breadcrumbElmNo.then(function(count) {
    		var lastBreadcrumbLink = element.all(by.repeater('path in bcPath')).get(count - 2);
    		lastBreadcrumbLink.click();
      	});
    	
    	//previewedDocument = element.all(by.repeater('content in contents')).get(0).getText();
    	var documentOptionsBtn = element.all(by.css('[ng-click="vm.openMenu($mdOpenMenu, $event)"]')).first();

    	documentOptionsBtn.click();
    	browser.driver.sleep(25000);
    	browser.waitForAngular();
    	
    	var selectPreviewBtn = element.all(by.css('[ng-click="vm.previewDocument(content.nodeRef)"]')).last();
        	
    	//selectPreviewBtn.click();
    	
    	selectPreviewBtn.getText().then(function(text) {
    		console.log("selectPreviewBtn " + selectPreviewBtn);
    		selectPreviewBtn.click();
      	});
    	
    	previewHeadline = element(by.css('[role="dialog"]')).getText();
    	  	
    }; 
    
    return public;
};

module.exports = PreviewDocumentPage();
