const courseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};
const assignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        { id: 1, name: "Declare a Variable", due_at: "2023-01-25", points_possible: 50 },
        { id: 2, name: "Write a Function", due_at: "2023-02-27", points_possible: 150 },
        { id: 3, name: "Code the World", due_at: "3156-11-15", points_possible: 500 }
    ]
};
const learnerSubmissions = [
    { learner_id: 125, assignment_id: 1, submission: { submitted_at: "2023-01-25", score: 47 } },
    { learner_id: 125, assignment_id: 2, submission: { submitted_at: "2023-02-12", score: 150 } },
    { learner_id: 125, assignment_id: 3, submission: { submitted_at: "2023-01-25", score: 400 } },
    { learner_id: 132, assignment_id: 1, submission: { submitted_at: "2023-01-24", score: 39 } },
    { learner_id: 132, assignment_id: 2, submission: { submitted_at: "2023-03-07", score: 140 } }
];


/*Transform the provided data to generate an array of objects with specific information about learners and their assignments.

*Return Learner Data:
Output should be an array of objects.
Each object contains data for a learner.

*Learner ID:
Each object must include the learner's ID.

*Weighted Average Score:
Calculate a weighted average score for each learner.
Assignments with higher possible points should count more.
Example: If a learner scored 50/100 and 190/200, the weighted average would be (50 + 190) / (100 + 200) = 80%.

*Assignment Averages:
Each assignment should have a key with its ID. The value should be the percentage score of that assignment (submission.score / points_possible).

*Late Submission Penalty:
Deduct 10% of the total points possible if the submission was late (submitted_at is past due_at).

*Exclude Not Yet Due Assignments:
Do not include assignments that are not yet due in the average or in the keyed dictionary of scores.
Data Validations & Error Handling
Course and Assignment Group Match:

*Check if the assignment group belongs to the course (matching course_id). Throw an error if there is a mismatch.

*Handling Zero Points Possible:
Ensure points_possible is not zero.
Throw an error if points_possible is zero.

*Handling Invalid Data Types:
Convert strings to numbers if necessary.
Handle errors gracefully using try/catch blocks.*/


function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
    if (assignmentGroup.course_id !== courseInfo.id) {
        throw new Error("Assignment course_id does not match  the courseInfo_id.")
    }
    //an object to store data for each learner
    let learnerData = {}

    /*Loop through each assignment in the assignment group , and check if the assignment's due date is in the future.
    If the assignment is not yet due, skip the rest of the loop and move to the next assignment.*/
    for (let assignment of assignmentGroup.assignments) {
        if (new Date(assignment.due_at) > new Date()) continue // Skip not yet due assignments
        
        //If the points possible is zero, throw an error because you can't divide by zero
        if (assignment.points_possible === 0) {
            throw new Error("points_possible cannot be zero")
        }
         /*take each learner's submission for the current assignment*/
        learnerSubmissions.forEach(submission => {
            //Check if the submission_id is for the current assignment
            if (submission.assignment_id === assignment.id) {
                //create learner's data if it does not already exist
                if (!learnerData[submission.learner_id]) {
                    learnerData[submission.learner_id] = { id: submission.learner_id, avg: 0, totalPoints: 0, totalPossible: 0 };
                }

               
                let actualScore = submission.submission.score;
                // Late penalty: subtract 10% of total possible points
                if (new Date(submission.submission.submitted_at) > new Date(assignment.due_at)) {
                    actualScore -= assignment.points_possible * 0.1   
                }

                let percentageScore = (actualScore / assignment.points_possible) * 100;
                percentageScore = Math.ceil(percentageScore) // Round up the percentage score

                //Store the percentage score in the learner's data
                learnerData[submission.learner_id][assignment.id] = percentageScore
                //Update the learner's total points and total possible points
                learnerData[submission.learner_id].totalPoints += actualScore
                learnerData[submission.learner_id].totalPossible += assignment.points_possible
            }
        });
    }
    //takes all the values from the learnerData and returns them as an array
    //iterate over each learner object in the array and apply weighted average score
    //.map function returns a new array where each learner object now has the avg property
    return Object.values(learnerData).map(learner => {  
        //Calculate the average and get a percentage
        learner.avg = learner.totalPoints / learner.totalPossible * 100
        learner.avg = Math.ceil(learner.avg)
        //are not required in the final output
        delete learner.totalPoints
        delete learner.totalPossible
        return learner
    });
}

const result = getLearnerData(courseInfo, assignmentGroup, learnerSubmissions)
console.log(result)
