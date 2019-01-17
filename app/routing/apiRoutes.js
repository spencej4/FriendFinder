// const path = require('path');

module.exports = function(app){
    app.get("/api/friends", function(req, res) {
        return res.json(friends);
    })

    // Create new friend - takes in JSON input
    app.post("/api/make_friend", function(req, res) {
        var newFriend = req.body;
        // Using a RegEx Pattern to remove spaces from newFriend
        newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();
        runComparison(newFriend); // sends newFriend to runComaprison function
        res.json({name: topFriend.name, photo: topFriend.photo});
    });
   
};

// Data
let friends = [
    {
        "name": "Katy Perry",
        "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhHidOmAt-UJcL9kK8MnV750vXjZne0lmkikaHoE41xKJBIizX",
        "scores": [
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1"
        ],
        "routeName": "Katy Perry"
    },
    {
        "name": "Ada Lovelace",
        "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG2sOEb9zRPtBQyaeS-EVaz73p7H34V4TFGl796HBxESOv1ezdBw",
        "scores": [
        "5",
        "5",
        "5",
        "5",
        "5",
        "5",
        "5",
        "5",
        "5",
        "5"
        ],
        "routeName": "Ada Lovelace"
    },
];

let topScore = 0;
let testNum = 0;
let friend = {};

runComparison = function(newFriend) {
    if(friends.length > 1){
        topScore = 0;
        testNum = 0;
        comparativeArray = [];

        for (var i=0; i < friends.length; i++) {
            let absoluteDiffArray = [];
            let targetScores = friends[i].scores;
            let friend = friends[i];

            for (var j=0; j < targetScores.length; j++) {
                let diff = 0;

                if (newFriend.scores[j] === targetScores[j]) {
                    absoluteDiffArray.push(0);

                }else if(newFriend.scores[j] > targetScores[j]) {
                    diff = (newFriend.scores[j] - targetScores[j]);
                    absoluteDiffArray.push(diff);
                }else if (targetScores[j] > newFriend.scores[j]) {
                    diff = (targetScores[j] - newFriend.scores[j]);
                    absoluteDiffArray.push(diff);
                }
            }
            calcWinner(absoluteDiffArray, friend);
        }
        friends.push(newFriend);
    }else{
        friends.push(newFriend);
        return
    }
}


calcWinner = function(absoluteDiffArray, friend) {
    var sum = absoluteDiffArray.reduce((a, b) => a + b, 0);

    if (testNum === 0) {
        topScore = sum;
        topFriend = friend;
        testNum +=1;
    } else if (sum < topScore) {
        topScore = sum;
        topFriend = friend;
    }else if (sum > topScore){
    }

    return topFriend;
}