var globalHeader = require('../common/globalHeader.po.js');
var searchDocumentPage = require('./searchDocumentPage.po.js');
var previewDocumentPage = require('./previewDocumentPage.po.js');
var deleteDocumentPage = require('./deleteDocumentPage.po.js');
var renameDocumentPage = require('./renameDocumentPage.po.js');
var copyDocumentPage = require('./copyDocumentPage.po.js');
var relocateDocumentPage = require('./relocateDocumentPage.po.js');

describe('openDESK search document', function() {

    it('should be able to search and find an existing document', function() {
        searchDocumentPage.searchDocument();
        
        //the created folder is represented in the list
        expect(searchDocumentPage.getSearchedDocument()).toMatch(searchDocumentPage.getBreadcrumb());
    });
});
describe('openDESK preview document', function() {

    it('should be able to search and preview an existing document', function() {
    	previewDocumentPage.previewDocument();
        
        //the created folder is represented in the list
        expect(previewDocumentPage.getPreviewHeadline()).toContain(previewDocumentPage.getPreviewedDocument());
        previewDocumentPage.closeDialog();
    });
});
describe('openDESK rename document', function() {

    it('should be able to rename an existing document', function() {
    	//searchDocumentPage.searchDocument();
    	//renameDocumentPage.renameDocument();
        
        //the created folder is represented in the list
        //expect(renameDocumentPage.getDocumentList()).toMatch(renameDocumentPage.getRenamedDocument());
    });
});
describe('openDESK relocate a document', function() {

    it('should be able to relocate an existing document to another location', function() {
    	//searchDocumentPage.searchDocument();
    	//relocateDocumentPage.relocateDocument();
        
    	//after relocating, check that document is no longer at its original place
        //expect(relocateDocumentPage.getDocumentOriginList()).not.toMatch(relocateDocumentPage.getDocumentRelocated());

        //the copied folder is represented at the selected position/list
        //expect(relocateDocumentPage.getDocumentList()).toMatch(relocateDocumentPage.getDocumentRelocated());
    });
});
describe('openDESK copy document', function() {

    it('should be able to copy an existing document to another location', function() {
    	//searchDocumentPage.searchDocument();
    	//copyDocumentPage.copyDocument();
        
        //the copied folder is represented in the list
        //expect(copyDocumentPage.getDocumentList()).toMatch(copyDocumentPage.getDocumentCopied());
    });
});
describe('openDESK delete document', function() {

    it('should be able to delete an existing document', function() {
    	//searchDocumentPage.searchDocument();
    	//deleteDocumentPage.deleteDocument();
        
        //the created folder is represented in the list
        //expect(deleteDocumentPage.getDocumentList()).not.toMatch(deleteDocumentPage.getDeletedDocumentName());
    });
});