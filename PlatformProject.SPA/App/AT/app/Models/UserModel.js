var uId = "";
var uName = "";
var uEmail = "";
var role = "";
var tenant = "";
var username = "";
var password = "";

var userModel = (function (RequestService) {
    return {

        createUser: function (user) {
            url = "";
            var promisePost = RequestService.post(user,url);
           
            promisePost.then(function (pl) {
               id = pl.data.Id;
               console.log("Created Succesfully");
            }, function (err) {
                console.log("Err" + err);
            });
       
        },

        getUser: function (userId) {
            url = "" + userId;
            var promiseGetSingle = RequestService.get(userId,url);

            promiseGetSingle.then(function (pl) {
                var res = pl.data;
                this.uId = res.Id;
                this.uName = res.Name;
                this.uEmail = res.Email;
                this.uRole = res.Role;
                this.uTenant = res.Tenant;
                this.username = res.Username;
            },  function (errorPl) {
                   console.log('failure loading User', errorPl);
            });

        },

        getAllUsers: function () {
            url = "";

        },

        editUser: function (userId, user) {
            url = "" + userId;
            var promisePut = RequestService.put(userId, user,url);
            promisePut.then(function (pl) {
                console.log("Updated Successfully");
            }, function (err) {
                console.log("Err" + err);
            });
        },

        deleteUser: function (userId) {
            url = "" + userId;
            var promiseDelete = RequestService.delete(uId,url);
            promiseDelete.then(function (pl) {
                message = "Deleted Successfuly";
            }, function (err) {
                console.log("Err" + err);
            });
        }
}

})();
