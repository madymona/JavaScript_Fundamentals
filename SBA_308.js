// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};
  
// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];


function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
 /* course_id in AssignmentGroup matches the id in CourseInfo. 
 Throw an error if they do not match.*/
    function validateCourse(AssignmentGroup, CourseInfo){ 
        if (AssignmentGroup.course_id !== CourseInfo.id) {
            throw new Error("AssignmentGroup does not match the specified course.")
        }
    }
  /*Prepare the due dates and points possible for each assignment. 
  due_at is a valid date and points_possible is a positive number. 
  Handle potential errors gracefully using try/catch.*/
    function prepareAssignments(AssignmentGroup) {
        const assignmentDueDates = {}   //Object to store due dates 
        const pointsPossible = {}       //Object to store points possible 
    
        AssignmentGroup.assignments.forEach(assignment => {
            const dueDate = new Date(assignment.due_at)
            if (isNaN(dueDate)) {
                throw new Error(`Invalid due date for assignment ID ${assignment.id}`)
            }
    
            if (typeof assignment.points_possible == String || assignment.points_possible == Number && assignment.points_possible <= 0) {
                throw new Error(`Invalid points_possible for assignment ID ${assignment.id}`)
            }
            assignmentDueDates[assignment.id] = dueDate
            pointsPossible[assignment.id] = assignment.points_possible
        })
        return {assignmentDueDates, pointsPossible}
    }

}

