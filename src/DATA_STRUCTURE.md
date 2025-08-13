The survey data is structured as a JSON object with the following properties:

-   `nodes`: An array of node objects, where each node represents a question in the survey.
-   `edges`: An array of edge objects, where each edge represents an answer that connects two questions.
-   `humanData`: An object that contains the survey data in a more human-readable format.
    -   `questions`: An array of question objects, where each object has an `id` and a `question` property.
    -   `answers`: An array of answer objects, where each object has an `id`, a `source` (the ID of the source question), a `target` (the ID of the target question), and an `answer` property.
