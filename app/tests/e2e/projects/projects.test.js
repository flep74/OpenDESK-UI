var globalHeader = require('../common/globalHeader.po.js');
var openProjectsPage = require('./openProjectsPage.po.js');
var createProjectPage = require('./createProjectsPage.po.js');
var deleteProjectPage = require('./deleteProjectPage.po.js');
var renameProjectPage = require('./renameProjectPage.po.js');

describe('openDESK create project', function() {

    it('should be able to create a new project', function() {
    	openProjectsPage.openProjects();
        //createProjectPage.createProject();
        
        //deleteProjectPage.deleteProject();
        
        //the created project is represented in the project list
        //expect(createProjectPage.getProjectList().getText()).toMatch(createProjectPage.getCreatedProject());
    });
});


describe('openDESK delete project', function() {

    it('should be able to delete an existing project', function() {
        //deleteProjectPage.deleteProject();
        
      //the deleted project is not represented in the project list
        //expect(deleteProjectPage.getProjectList().getText()).not.toMatch(deleteProjectPage.getDeletedProject());
    });
});

describe('openDESK rename project', function() {

    it('should be able to rename an existing project', function() {
    	//New project need to be created, because project may just have been deleted
    	//createProjectPage.createProject();
        //renameProjectPage.renameProject();
        
      //the renamed project is represented in the project list
        //expect(renameProjectPage.getProjectList().getText()).toMatch(renameProjectPage.getRenamedProject());
    });
});
