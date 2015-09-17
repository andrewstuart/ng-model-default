describe('ngModelDefault', function() {
  //Setup
  beforeEach(module('ngModelDefault'));

  var $compile, $rootScope, $timeout;

  var $scope, ele;

	beforeEach(inject(function($injector) {
	  $compile = $injector.get('$compile');
		$rootScope = $injector.get('$rootScope');
	  $timeout = $injector.get('$timeout');

    $scope = $rootScope.$new();
    ele = '<input ng-model="foo" /><input ng-model="bar" ng-model-default="foo" />';

    ele = $compile(ele)($scope);
    $scope.$digest();
	}));

  function updateFoo (val) {
    $scope.foo = val;
    $scope.$digest();
  }

  function updateBar (val) {
    $scope.bar = val;
    $scope.$digest();
  }


  //Tests
  describe('default behavior', function() {

    it('should update model if default expression updates', function() {
      $scope.foo = 'What Do We Have';
      expect($scope.foo).not.toEqual($scope.bar);
      $scope.$digest();
      expect($scope.foo).toEqual($scope.bar);
    });

    describe('if model is changed', function() {
      beforeEach(function() {
        updateBar('bar');
        updateFoo('foo');
      });

      it('should stop updating if value is changed', function() {
        expect($scope.foo).not.toEqual($scope.bar);
      });

      describe('and then changes to something falsy', function() {
        _.each(['', undefined], function(val) {
          it('should resume updates for ' + val, function() {
            updateBar(val);
            expect($scope.bar).not.toEqual($scope.foo);
            updateFoo('FooAgain');
            expect($scope.bar).toEqual($scope.foo);
          });
        });

        _.each([false, NaN, null, 0], function(val) {
          it('should not resume updates for ' + val, function() {
            updateBar(val);
            expect($scope.bar).not.toEqual($scope.foo);
            updateFoo('FooAgain');
            expect($scope.bar).not.toEqual($scope.foo);
          });
        });

      });
    });
  });
});
