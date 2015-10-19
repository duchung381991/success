myApp.controller('chiController', function ($scope, $http, $state) {
    $scope.divChi = false;
    $http.get('/chi/GetPhieuchi')
    .success(function (result) {
        $scope.chis = result;
    })
    .error(function (err) {
        console.log(err);
    });
    $scope.Cancel = function () {
        $scope.divChi = false;
    }
    $scope.AddchiDiv = function () {
        $scope.divChi = true;
        $scope.Action = "Add";
        $scope.model = [""];

    }
    $scope.deletePhieuchi = function (chi) {
        $http.post('chi/DelPhieuchi', {
            delchi: chi
        })
        .success(function (data) {
            $state.reload();
        })
        .error(function (err) {
            console.log(err);
        })
    }
    //get phieu chi by id
    $scope.editPhieuchi = function (chi) {
        $http.post('chi/GetPhieuchiById', {
            objchi: chi
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
            $scope.divChi = true;
            $scope.Action = "Update";
        })
        .error(function (err) {
            console.log(err);
        })
    }
    $scope.AddUpdate = function () {
        $scope.Action = $scope.Action.toString();
        if ($scope.Action == "Update") {
            $scope.editchi = [];
            $scope.editchi.id = $scope.model.id;
            $scope.editchi.name = $scope.model.name;
            $scope.editchi.date = $scope.model.date;
            $scope.editchi.creator = $scope.model.creator;
            $scope.editchi.target = $scope.model.target;
            $scope.editchi.money = $scope.model.money;
            $scope.editchi.notes = $scope.model.notes;
            $http.post('/Chi/UpdatePhieuchi', {
                id: $scope.editchi.id,
                name: $scope.editchi.name,
                date: $scope.editchi.date,
                creator: $scope.editchi.creator,
                target: $scope.editchi.target,
                money: $scope.editchi.money,
                notes: $scope.editchi.notes
            })
            .success(function (myObj) {
                $state.reload();
            })
            .error(function (err) {
                console.log(err);
            })
        }
        else {
            $http.post('Chi/AddPhieuchi', {
                _Name: $scope.model.name,
                _Creator: $scope.model.creator,
                _Target: $scope.model.target,
                _Money: $scope.model.money,
                _Notes: $scope.model.notes,
                _Time: $scope.model.date
            })
            .success(function (data) {
                $state.reload();
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