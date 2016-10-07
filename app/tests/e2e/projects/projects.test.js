var globalHeader = require('../common/globalHeader.po.js');
var createProjectPage = require('./createProjectsPage.po.js');
var deleteProjectPage = require('./deleteProjectPage.po.js');


describe('openDESK create project', function() {

    it('should be able to create a new project', function() {
        createProjectPage.createProject();
        
        //the created project is represented in the project list
        expect(createProjectPage.getProjectList().getText()).toMatch(createProjectPage.getCreatedProject());
    });
});


describe('openDESK delete project', function() {

    it('should be able to delete an existing project', function() {
        deleteProjectPage.deleteProject();
        
      //the deleted project is not represented in the project list
        expect(deleteProjectPage.getProjectList().getText()).not.toMatch(deleteProjectPage.getDeletedProject());
    });
});
