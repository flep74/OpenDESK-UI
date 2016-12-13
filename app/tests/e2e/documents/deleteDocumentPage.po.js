var globalHeaderMenu = require('../common/globalHeader.po.js');
var date = new Date();
var deletedDocumentName = "";
var documentList = "";
var constants = require('../common/constants');

var BreakException = {};

var DeleteDocumentPage = function () {
    
    var public = {};
    
    console.log("delete document");
    
	public.getDocumentList = function() {
		documentList = element.all(by.repeater('content in contents')).getText();
	    return documentList	
	}
    
    public.getDeletedDocumentName = function() {
    	return deletedDocumentName;
    }
    
    public.deleteDocument = function() {

		try {
			element.all(by.repeater('content in contents')).each(function (flap, index) {

				var documentOptionsBtn = flap.all(by.css('[ng-click="vm.openMenu($mdOpenMenu, $event)"]')).first();


				flap.getText().then(function (text) {

					if (text.indexOf(constants.file_3.name) >= 0) {

						documentOptionsBtn.click();
						browser.driver.sleep(2000);


						var selectdeleteBtn = element.all(by.css('[ng-click="vm.deleteFileDialog($event, content.nodeRef)"]')).last().getText();
						selectdeleteBtn.click();

						browser.driver.sleep(2000);

						var deleteProjectBtn = element(by.css('[aria-label="Slet"]'));
						deleteProjectBtn.click();

						browser.driver.sleep(4000);


					}

				});


			});

		}
		catch (e) {
			console.log("hej");
		}

    };
    
    return public;
};

module.exports = DeleteDocumentPage();
