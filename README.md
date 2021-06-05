## GITHUB SEARCHER

This app is using create-react-app due to the fact that all is configured out of the box and quick to start implementing my solution. I used React Router in order to route to query the API with url params. Using Thunk as my middleware to pull data from the github api. 

I am using one redux store called data as it can change from repo data and user data and created 2 views to display user/repo data since they do not share the same json structure. Currently implemented debounce when making a call to the database in order to give it time to form the query string on typing. 

Author: Ahmed Abdihakim Ahmed