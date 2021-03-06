Questions = new Meteor.Collection("questions");


Meteor.startup(function () {
  // code to run on server at startup
});

Meteor.methods({
  addQuestion : function (questionText) {
    console.log('Adding Question');
    var questionId = Questions.insert({
        'questionText' : questionText,
	'submittedOn'  : new Date(),
	'submittedBy'  : Meteor.userId()
    });
    return questionId;
  },

  incrementYesVotes : function(questionId) {
    console.log(questionId + " yes value incremented");
    Questions.update(questionId, {$inc : {'yes' : 1}});
  },

  incrementNoVotes : function(questionId) {
    console.log(questionId + " no value incremented");
    Questions.update(questionId, {$inc : {'no' : 1}});
  }

});

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'other': 1, 'things': 1}});
  } else {
    this.ready();
  }
});




