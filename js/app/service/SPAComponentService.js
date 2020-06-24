function SPAComponentService() {
    //TODO: Intitialize service for SPA 
    this.db = [];
}
// Add model to database table object 
SPAComponentService.prototype.add = function (spa) {
    this.db.push(spa);
};
// Remove from database object by index 
SPAComponentService.prototype.remove = function(index) {
    this.db.splice(index, 1);
};
// get from database object by index 
SPAComponentService.prototype.get = function(index) {
    return this.db[index];
};
// elements count of database object 
SPAComponentService.prototype.size = function() {
    return this.db.length;
};
// Load all data from source to database object 
SPAComponentService.prototype.load = function(dbSource) {
    for (let i = 0; i < dbSource.length; i++) {
        // Transforming database source into database object of Activity model 
        this.add(
            new SPA(
                dbSource[i].name,
                dbSource[i].content,
            )
        )
    }
}; 
