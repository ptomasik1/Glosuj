Questions = new Mongo.Collection("questions");

Meteor.subscribe("userData");

Template.questions.items = function () {
  return Questions.find({}, {sort: {'submittedOn' : -1}});
};

Template.question.events ({

  'click' : function() {
    Session.set("selected_question", this._id);
  },

  'click a.yes' : function () {
    event.preventDefault();
    if(Meteor.userId()){
      var questionId = Session.get('selected_question');
      console.log('updating yes count for question id .. ' + questionId);
      Meteor.call("incrementYesVotes", questionId);
    }
  },

  'click a.no' : function () {
    event.preventDefault();
    if(Meteor.userId()) {
      var questionId =  Session.get('selected_question');
      console.log('updating no count for question id .. ' + questionId);
      Meteor.call('incrementNoVotes', questionId);
    }
  }
});

Template.addquestion.events({
  //when the add question button is clicked
  'click input.add-question' : function (event){
    event.preventDefault();
    var questionText = document.getElementById("questionText").value;
    //add the question and post to log
    Meteor.call("addQuestion", questionText, function (error, questionId){
      console.log('added question with Id .. ' + questionId);
    });
    
    //set the question text back to an empty string
    document.getElementById("questionText").value = "";
  }
});

