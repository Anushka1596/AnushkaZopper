var app = angular.module('test', []);

// this represents the state of the dialog: a visible flag and the person being edited
var EditPersonDialogModel = function () {
  this.visible = false;
};
EditPersonDialogModel.prototype.open = function(person,email,dob) {
  this.person = person;
  this.email=email;
  this.visible = true;
};
EditPersonDialogModel.prototype.close = function() {
  this.visible = false;
};

app.controller('ctrl', ['$scope', function ($scope) {
   $scope.register = {};
        $scope.register.countryId = "2";

        $scope.register.countries = [
          {id: "1",name: "USA" },
          {id: "2",name: "India"},
         {id: "3", name: "UK"}, 
          {id: "4",name: "Nepal"}
          ];
  $scope.editDialog = new EditPersonDialogModel();
  
 
  
  $scope.persons = [];
  
  $scope.add = function() {
    $scope.persons.push({name: ''});
    $scope.person.push({email:''});
    $scope.person.push({dob : " "});
  };
  $scope.remove = function (person) {
            $scope.persons.splice(person, 1);

        };
}]);

app.directive('editPersonDialog', [function() {
  return {
    restrict: 'E',
    scope: {
      model: '=',
      
       
    },
    
    link: function(scope, element, attributes) {
      scope.$watch('model.visible', function(newValue) {
        var modalElement = element.find('.modal');
        modalElement.modal(newValue ? 'show' : 'hide');
      });
      
      element.on('shown.bs.modal', function() {
        scope.$apply(function() {
          scope.model.visible = true;
        });
      });

      element.on('hidden.bs.modal', function() {
        scope.$apply(function() {
          scope.model.visible = false;
        });
      });
      
    },
    templateUrl: 'edit-person-dialog.html',
  };
}]);
