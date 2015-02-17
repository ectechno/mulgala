/*! Angular match v1.0.1 | (c) 2014 Greg Bergé | License MIT */

/*angular
.module('match', [])
.directive('match', ['$parse', matchDirective]);

/**
 * Match directive.
 *
 * @example
 * <input type="password" ng-match="password">
 */

/*function matchDirective($parse) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ctrl) {
      scope.$watch(function () {
        return [scope.$eval(attrs.match), ctrl.$viewValue];
      }, function (values) {
        ctrl.$setValidity('match', values[0] === values[1]);
      }, true);
    }
  };
}*/

angular.module('admin').directive('pwCheck', [function () {
	    return {
	        require: 'ngModel',
	        link: function (scope, elem, attrs, ctrl) {
	            var firstPassword = '#' + attrs.pwCheck;
	            elem.add(firstPassword).on('keyup', function () {
	                scope.$apply(function () {
	                    var v = elem.val() === $(firstPassword).val();
	                    ctrl.$setValidity('pwmatch', v);
	                });
	            });
	        }
	    }
	}]);