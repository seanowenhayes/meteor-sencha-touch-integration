/*global Meteor: true, Categories: true*/
Meteor.publish("categories", function () {
    return Categories.find();
});