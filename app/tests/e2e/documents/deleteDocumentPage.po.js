var globalHeaderMenu = require('../common/globalHeader.po.js');
var date = new Date();
var deletedDocumentName = "";
var documentList = "";
var constants = require('../common/constants');

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

    	//Detect project to delete
    	var documentToDelete = element.all(by.repeater('content in contents')).get(0).getText();


		var files = element.all(by.repeater('content in contents'));


		element = files.filter(function(elem) {
				return elem.getText().then(function(text) {
					return (text.indexOf(constants.file_3.name) >= 0)
				});
			});


		element.getText().then(function (text) {
			console.log(text);
		});








        //
    	//var documentOptionsBtn = element.all(by.css('[ng-click="vm.openMenu($mdOpenMenu, $event)"]')).first();
        //
    	//documentOptionsBtn.click();
    	//
    	//var selectdeleteBtn = element.all(by.css('[ng-click="vm.deleteFileDialog($event, content.nodeRef)"]')).last().getText();
        	//
    	//selectdeleteBtn.click();
    	//
    	//var deleteProjectBtn = element(by.css('[aria-label="Slet"]'));
    	//deleteProjectBtn.click();
    	//
    	//deletedDocumentName = documentToDelete;
    }; 
    
    return public;
};

module.exports = DeleteDocumentPage();
