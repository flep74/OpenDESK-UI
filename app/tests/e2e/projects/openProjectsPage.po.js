var globalHeaderMenu = require('../common/globalHeader.po.js');


var OpenProjectPage = function () {
    
    var public = {};


    public.openProjects = function() {
    	
    	var goToProjectBtn = element(by.css('a[href^="#/projekter"]')); 

        goToProjectBtn.click();
        
    }; 
    

    return public;
};

module.exports = OpenProjectPage();
