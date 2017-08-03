#ManageSocial Tech Task

**Time:** Approx. 2 - 3 hours

**Considerations:** We value the aesthetics of the code that applicants write. Consistency of style, code and tests that are as succinct as can be. Use variable names and comments that are appropriately descriptive.

##User Story

As a user, I would like to view a web app that authenticates with Twitter so that I can view a list of my recent tweets.

##Acceptance Criteria 

###Backend (API)

- Given that I have made a request to GET /oauth_request endpoint I should receive a response with the Twitter authorisation URL
- Given that I have made a request to POST /connect endpoint I should receive a response with all my Twitter profile data
- Given that I have made a request to GET /tweets endpoint I should receive a response with a list containing `100` of my most recent tweets
- Given that I have made a request to POST /disconnect endpoint I should be disconnected from Twitter and receive a response with my Twitter ID for confirmation

###Frontend (SPA)

- Given that I clicked on Login with Twitter button, I should be redirected to Twitter to login using my credentials
- Given that I have authenticated with Twitter, I should be shown my name, username and profile picture, a Refresh Tweets button and a Logout button
- Given that I clicked on Refresh Tweets, I should be shown a list containing 100 of my most recent tweets
Given that I clicked on Logout, I should be disconnected from Twitter, storage should be cleared and the login button is displayed
              
 ###Additional Criteria

 Written using ES6 and demonstrating a knowledge of promises and using async/await or generators for using the asynchronous requests in a synchronous control flow. A functional programming approach is preferable where acceptable

The frontend/backend must contain some basic unit / integration tests

Tests can be written using mocha or jest and run with the npm test command

The frontend/backend must be run with npm start and print address and port information to the console

The backend should only expose the above endpoints and uses express or koa

Test run should also check code is linted properly according to the definition which you are to provide in the repository

Installation, build steps, testing and usage instructions MUST be provided in a README.md file in the root of the application

###Framework

These are the packages that must be present and used in the application:

**Testing:** mocha or jest

**Frontend:** react , redux and redux-saga Backend API: express or koa

**Note:** You're free to use any supporting packages if necessary, such as react-boostrap . However, boilerplates, generators and scaffolding tools will not be allowed.

### Application Data

For the purpose of this task, you're free to use any kind of storage for the session and user/tweet data. The application data must be persistent, so the application state is unaffected accessible on page reload.

###Submission

The application should be committed to a public repository on GitHub or BitBucket with the repository being the MD5 hash of the string lastname-firstname-techtask-YYYYMMDD , and simply send us a link to the repository (via Workable).

**Note:** Please plan your commits and be verbose with your commit messages as this will allow us to understand some of the decisions you make throughout the process.
                               
###Bonus Points

Behavioural tests for the frontend components

Creative, well-designed and responsive user interface

Allow the user to tweet directly to Twitter by amending the UI and adding a new API endpoint
    