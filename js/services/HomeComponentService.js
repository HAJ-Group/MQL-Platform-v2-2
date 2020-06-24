function HomeComponentService() { 
    this.db = [];
    this.firstCollectionOfStudents = [];
    this.secondCollectionOfStudents = [];
}

HomeComponentService.prototype.add = function (home) {
    this.db.push(home);
};

HomeComponentService.prototype.addStudentFirstCollection = function(student){
    this.firstCollectionOfStudents.push(student);
};

HomeComponentService.prototype.getStudentFromFirstCollection = function (index) {
    return this.firstCollectionOfStudents[index];
};

HomeComponentService.prototype.sizeFirstCollection = function () {
    return this.firstCollectionOfStudents.length;
};

HomeComponentService.prototype.addStudentSecondCollection = function(student){
    this.secondCollectionOfStudents.push(student);
};

HomeComponentService.prototype.getStudentFromSecondCollection = function (index) {
    return this.secondCollectionOfStudents[index];
};

HomeComponentService.prototype.sizeSecondCollection = function () {
    return this.secondCollectionOfStudents.length;
};

HomeComponentService.prototype.get = function (index) {
    return this.db[index];
};


HomeComponentService.prototype.size = function () {
    return this.db.length;
};


HomeComponentService.prototype.loadAllData = function(dbSource, firstCollectionOfStudents, secondCollectionOfStudents) {
    for (let i = 0; i < dbSource.length; i++) {
        this.add(
            new Home(
                dbSource[i].title,
                dbSource[i].type,
                dbSource[i].labels,
                dbSource[i].dataSet
            )
        )
    }
    for( let i = 0; i < firstCollectionOfStudents.length; i++){
        this.addStudentFirstCollection(
            new HomeStudents(
                firstCollectionOfStudents[i].id,
                firstCollectionOfStudents[i].firstName,
                firstCollectionOfStudents[i].lastName
            )
        )
    }
    for ( let i = 0; i < secondCollectionOfStudents.length; i++){
        this.addStudentSecondCollection(
            new HomeStudents(
                secondCollectionOfStudents[i].id,
                secondCollectionOfStudents[i].firstName,
                secondCollectionOfStudents[i].lastName
            )
        )
    }
};

