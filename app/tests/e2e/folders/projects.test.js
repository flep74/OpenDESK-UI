var globalHeader = require('../common/globalHeader.po.js');
var createFolderPage = require('./createFolderPage.po.js');
var deleteFolderPage = require('./deleteFolderPage.po.js');

describe('openDESK create folder', function() {

    it('should be able to create a new folder', function() {
        //createFolderPage.createFolder();
        
        //the created folder is represented in the list
        //expect(createFolderPage.getFolderList().getText()).toMatch(createFolderPage.getCreatedFolder());
    });
});

describe('openDESK delete folder', function() {

    it('should be able to delete a folder', function() {
        //deleteFolderPage.deleteFolder();
        
        //the deleted folder is not represented in the list
        //expect(deleteFolderPage.getFolderList().getText()).not.toMatch(deleteFolderPage.getDeletedFolder());
    });
});

