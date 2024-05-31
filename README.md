# JavaScript_Fundamentals

## About
This program processes assignment submission data for a course. It generates an array of objects containing specific information about learners and their assignments, calculates weighted average scores, applies late submission penalties, and ensures data validation and error handling.

## Analysis
The program validates the data by checking if the assignment group belongs to the specified course and ensures that the points possible for each assignment are greater than zero. It calculates a weighted average score for each learner, considering the total points possible and actual scores. A late submission penalty of 10% is applied if a submission is past its due date.

## Methods
The program is structured as follows:

**Data Validation**: Checks if the `assignmentGroup.course_id` matches the `courseInfo.id`. Throws an error if there's a mismatch or if any assignment has zero points possible.
**Processing Submissions**: Iterates through each assignment and each learner's submission to:
   - Skip assignments that are not yet due.
   - Calculate the actual score considering the late submission penalty.
   - Store the percentage score of each assignment in the learner's data.
**Calculate Weighted Average**: Computes the weighted average score for each learner and returns the result as an array of objects.


## Installation
Clone the repository and install the necessary dependencies.
git clone https://github.com/username/javascript-course-management.git
npm install

## Usage
Run the script to calculate learner data.
const result = getLearnerData(courseInfo, assignmentGroup, learnerSubmissions)
console.log(result)

## Results
The program generates an array of objects containing:
- **Learner ID**
- **Weighted Average Score**
- **Percentage Score for Each Assignment**