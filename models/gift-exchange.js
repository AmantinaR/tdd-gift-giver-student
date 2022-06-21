const { BadRequestError } = require('../utils/errors');
class GiftExchange {
    static pairs(names) {
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
        }
        console.log("pairs method");
        if (names.length % 2 !== 0) {
            throw(new BadRequestError());
        }
        const used = [];
        const pairs = [];
        while (used.length !== names.length) {
            console.log("used length", used.length);
            console.log("names length", names.length);
            let first = getRandomInt(0, names.length);
            while (used.includes(first)) {
                first = getRandomInt(0, names.length);
            }
            used.push(first);
            let second = getRandomInt(0, names.length);
            while (used.includes(second)) {
                second = getRandomInt(0, names.length);
            }
            used.push(second);
            pairs.push([names[first], names[second]]);
        }
        return pairs;
    }

    static traditional(names) {
        console.log("traditional method");
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
        }
        //get first and second, 
        const used = [];
        const results = [];
        let initial = getRandomInt(0, names.length);
        used.push(initial);
        let next = getRandomInt(0, names.length);
        used.push(next);
        results.push(names[initial] + " is giving a gift to " + names[next]);
        while(used.length !== names.length) {
            let giver = next;
            next = getRandomInt(0, names.length);
            while (used.includes(next)) {
                next = getRandomInt(0, names.length);
            }
            used.push(next);
            results.push(names[giver] + " is giving a gift to " + names[next]);
        }
        results.push(names[next] + " is giving a gift to " + names[initial]);
        return results;
    }

    static quiz() {
        console.log("quiz");
        return [{question: "How would you describe your gift recipient in one word?", 
        answerChoices: [
            "a. Kind",
            "b. Smart",
            "c. Funny",
            "d. Quiet",
        ]}, 
        {question: "What does your gift recipient like to do in their spare time?", 
        answerChoices: [
            "a. Watch TV",
            "b. Pamper themselves",
            "c. Try new foods",
            "d. Travel",
        ]}, 
        {question: "What is your gift recipient's favorite season", 
        answerChoices: [
            "a. Winter",
            "b. Spring",
            "c. Summer",
            "d. Fall",
        ]}, 
        {question: "What is your gift recipient's dream travel destination?", 
        answerChoices: [
            "a. Milan",
            "b. Tokyo",
            "c. Paris",
            "d. NYC",
        ]}, 
        {question: "How much are you willing on spending on your gift recipient?", 
        answerChoices: [
            "a. $5-$15",
            "b. $15-$45",
            "c. $45-$100",
            "d. $100+",
        ]}]
    }

    static quizResults(answers) {
        let categories = {"personalCare": 0, "clothing": 0, "accessories": 0, "homeProducts": 0, "consumables": 0, "technology": 0};
        let key = [{"a": ["accessories", "clothing", "personalCare"], "b": ["technology", "homeProducts", "consumables"], "c": ["consumables, accessories"], "d": ["homeProducts", "technology", "personalCare"]}, 
        {"a": ["homeProducts", "technology"], "b": ["personalCare", "clothing"], "c": ["consumables", "homeProducts"], "d": ["accessories", "clothing"]}, 
        {"a": ["homeProducts", "consumables"], "b": ["personalCare, clothing"], "c": ["accessories", "clothing"], "d": ["technology", "homeProducts"]}, 
        {"a": ["homeProducts", "clothing"], "b": ["technology", "consumables"], "c": ["accessories", "personalCare"], "d": ["technology", "clothing"]}, 
        {"a": ["consumables, accessories"], "b": ["personalCare", "homeProducts"], "c": ["clothing"], "d": ["technology"]}];
        for (let i=0; i<answers.length; i++) {
            let scores = key[i][answers[i]];
            console.log("scores", scores);
            for(let cat of scores){
                categories[cat]++;
            }
        }
        console.log(categories);
        let max = 0;
        let maxKey = "";
        for (let category in categories) {
            if(categories[category] > max){
                max = categories[category];
                maxKey = category
            }
        }
        return maxKey;
    }
}

module.exports=GiftExchange;