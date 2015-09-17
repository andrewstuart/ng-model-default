angular.module('ngModelDefault', [])
  .directive('ngModelDefault', function() {
    /**
     * @ngdoc directive
     * @name ngModelDefault.directive:ngModelDefault
     * @param {Expression} ngModelDefault An angular expression for the default
     * value of the model
     * @requires ngModel
     * @description the `ng-model-default` directive allows you to set some
     * dynamic default value for anything with an `ngModel`. The model value
     * will be updated every time the expression changes, unless the value is
     * changed. If the value is changed, updates will no longer occur unless the
     * model value is cleared out completely, in which case updates will
     * continue.
     * @restrict CA
     */

    return {
        restrict: 'CA',
        require: 'ngModel',
        scope: {
            ngModelDefault: '='
        },
        link: function($scope, iEle, iAttrs, ngModel) {
            var doUpdates = true;

            $scope.$watch('ngModelDefault', function(newVal, oldVal) {
                if ( ngModel.$modelValue === undefined || ngModel.$modelValue === '' ) {
                    doUpdates = true;
                } else if ( ngModel.$modelValue !== oldVal ) {
                    doUpdates = false;
                }
                if ( !doUpdates ) { return; }

                ngModel.$setViewValue(newVal);
                ngModel.$render();
            });
        }
    };
});
