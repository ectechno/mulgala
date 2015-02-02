app.controller('userController', function ($scope, UserService) {
    $scope.isNew = true;
    $scope.isFormMode = false;
    loadRecords();

    //Function to load all User records
    function loadRecords() {
        var promiseGet = UserService.getUsers(); //The Method Call from service

        promiseGet.then(function (pl) {
            $scope.Users = pl.data
        },
              function (errorPl) {
                  $log.error('failure loading Users', errorPl);
              });
    };

    $scope.save = function () {
        var user = {
            uId: $scope.uId,
            uName: $scope.uName,
            uEmail: $scope.uEmail,
            uRole: $scope.uRole,
            uTenant: $scope.uTenant,
            username: $scope.username,
            uPassword: $scope.uPassword
        };

        if ($scope.isNew) {
            var promisePost = UserService.post(user);
            promisePost.then(function (pl) {
                $scope.Id = pl.data.Id;
                $scope.Message = "Created Successfuly";
                console.log($scope.Message);
                $scope.clear();
                loadRecords();
            }, function (err) {
                console.log("Err" + err);
            });
        } else { //Else Edit the record
            var promisePut = UserService.put($scope.uId, user);
            promisePut.then(function (pl) {
                $scope.Message = "Updated Successfuly";
                $scope.clear();
                loadRecords();
            }, function (err) {
                console.log("Err" + err);
            });
        }

    };

    //Method to Delete
    $scope.delete = function (uId) {
        var promiseDelete = UserService.delete(uId);
        promiseDelete.then(function (pl) {
            $scope.Message = "Deleted Successfuly";
            $scope.uId = 0;
            $scope.uName = "";
            $scope.uEmail = "";
            $scope.uRole = "";
            $scope.uTenant = "";
            $scope.username = "";
            $scope.uPassword = "";
            loadRecords();
        }, function (err) {
            console.log("Err" + err);
        });

    }

    //Method to Get Single user based on Id
    $scope.get = function (uId) {
        var promiseGetSingle = UserService.get(user.Id);

        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.uId = res.Id;
            $scope.uName = res.Name;
            $scope.uEmail = res.Email;
            $scope.uRole = res.Role;
            $scope.uTenant = res.Tenant;
            $scope.username = res.Username;
            $scope.isNew = false;
        },
                  function (errorPl) {
                      console.log('failure loading User', errorPl);
                  });
    };

    $scope.clear = function () {
        $scope.isNew = true;
        $scope.uId = "";
        $scope.uName = "";
        $scope.uEmail = "";
        $scope.uRole = "";
        $scope.uTenant = "";
        $scope.username = "";
        $scope.uPassword = "";
        $scope.confirm = "";
    };

    $scope.edit = function (user) {
        $scope.isNew = false;
        $scope.uId = user.uId;
        $scope.uName = user.uName;
        $scope.uEmail = user.uEmail;
        $scope.uRole = user.uRole;
        $scope.uTenant = user.uTenant;
        $scope.username = user.username;
        $scope.uPassword = user.uPassword;
    };

    $scope.cancel = function () {
        $scope.clear();
    };

});
