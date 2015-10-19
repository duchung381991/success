myApp.controller('thuController', function ($scope, $http, $state) {
    $scope.divThu = false;
    $http.get('/Thu/GetPhieuThu')
    .success(function (result) {
        $scope.thus = result;
    })
    .error(function (err) {
        console.log(err);
    });
    $scope.Cancel = function () {
        $scope.divThu = false;
    }
    $scope.AddThuDiv = function () {
        $scope.divThu = true;
        $scope.Action = "Add";
        $scope.model = [""];

    }
    $scope.deletePhieuThu = function (thu) {
        $http.post('Thu/DelPhieuThu', {
            delThu: thu
        })
        .success(function (data) {
            $state.reload();
        })
        .error(function (err) {
            console.log(err);
        })
    }
    //get phieu thu by id
    $scope.editPhieuThu = function (thu) {
        $http.post('Thu/GetPhieuThuById', {
            objThu: thu
        })
        .success(function (data) {
            $scope.model = [];
            $scope.model.id = data.id;
            $scope.model.name = data.name;
            $scope.model.date = data.date;
            $scope.model.creator = data.creator;
            $scope.model.target = data.target;
            $scope.model.money = data.money;
            $scope.model.notes = data.notes;
            $scope.divThu = true;
            $scope.Action = "Update";
        })
        .error(function (err) {
            console.log(err);
        })
    }
    $scope.AddUpdate = function ()
    {
        $scope.Action = $scope.Action.toString();
        if ($scope.Action == "Update") {
            $scope.editThu = [];
            $scope.editThu.id=$scope.model.id;
            $scope.editThu.name = $scope.model.name;
            $scope.editThu.date = $scope.model.date;
            $scope.editThu.creator = $scope.model.creator;
            $scope.editThu.target = $scope.model.target;
            $scope.editThu.money = $scope.model.money;
            $scope.editThu.notes = $scope.model.notes;
            $http.post('/Thu/UpdatePhieuThu', {
                id: $scope.editThu.id,
                name: $scope.editThu.name,
                date: $scope.editThu.date,
                creator: $scope.editThu.creator,
                target: $scope.editThu.target,
                money: $scope.editThu.money,
                notes: $scope.editThu.notes
            })
            .success(function (myObj) {
                $state.reload();
            })
            .error(function (err) {
                console.log(err);
            })
        }
        else {
            $http.post('Thu/AddPhieuThu', {
                _Name: $scope.model.name,
                _Creator: $scope.model.creator,
                _Target: $scope.model.target,
                _Money: $scope.model.money,
                _Notes: $scope.model.notes,
                _Time:$scope.model.date
            })
            .success(function (data) {
                $scope.thus = data;
                clear();

            })
            .error(function (err) {
                console.log(err);
            })
        }
    }
    function clear() {
        $scope.model = [""];
    }

})