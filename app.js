(function (){
	'use strict';

  angular.module('healthReview', [])
  .controller('notificationController', notificationController)
  .service('NotificationService', NotificationService)
  .directive('notification', notificationDirective);

  
  function notificationDirective(){
  	var ddo = {
  		templateUrl: "notification.html",
  		controller: notificationController,
  		controllerAs: 'notifier',
  		bindToController: true
  	};

  	return ddo;
  }

  notificationController.$inject = ['NotificationService'];
  function notificationController(NotificationService){
  	var ctrl = this;
  	var promise = NotificationService.getDetails();  
    ctrl.toggler = false;  

  	promise.then( function(response){
  		ctrl.details = response.data;
  	})
  	.catch(function (error){
  	});

    ctrl.clearAll = function(){      
      ctrl.details.length = 0;
    };

    ctrl.removeItem = function(index){
      ctrl.details.splice(index, 1);
    };

    ctrl.typeClassDecider = function(type){
      switch(type){
        case 'assessment_needs_review':
              return "reviewNotification fa fa-pencil-square-o";
              
        case 'event_pain':
              return "painNotification fa fa-exclamation-triangle";
        case 'exercise_trouble':
              return "troubleNotification fa fa-info-circle";
      }
    };

  }


  NotificationService.$inject = ['$http'];
  function NotificationService($http){
  	var service = this;
  	
  	service.getDetails = function () {
      var response = $http({    
        url: ("notifications.json")
      });    
      return response;
    };

  
  }

})();