var globalHeaderMenu = require('../common/globalHeader.po.js');
var date = new Date();
var searchedDocument = "";
var breadcrumb = "";

var SearchDocumentPage = function () {
    
    var public = {};
    
    console.log("search document");
    
	public.getBreadcrumb = function() {
		//last element in breadcrumb must represent the searched/selected document
	    return breadcrumb	
	}
    
    public.getSearchedDocument = function() {
    	return searchedDocument;
    }

    public.searchDocument = function() {
    	var searchDocumentInput = element(by.model('$mdAutocompleteCtrl.scope.searchText'));
    	var selectedDocument = element.all(by.css('[ng-click="vm.gotoPath(r.nodeRef);"]')).first();
    	
    	searchDocumentInput.sendKeys("jpg");
    	
    	searchedDocument = selectedDocument.getText();
    	selectedDocument.click();

    	breadcrumb = element.all(by.repeater('path in bcPath')).last().getText();
    	
    }; 
    
    return public;
};

module.exports = SearchDocumentPage();
