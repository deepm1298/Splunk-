# Contributing to App1

##Project Title
Splunk :FDSE Home Test

##Project Description
I have done following things in the project.
Backend (Serverless/Lambda):  I have Used Serverless Framework with Node.js or Python.
Backend Service: Aggregate data from API endpoints.I have Utilize Splunk powered Backend REST API.
Data Retrieval:Fetched Splunk Dashboards, Saved Searches/Reports, SPL Queries, Fields, and Apps.Expose data to the frontend and Provide search functionality for aggregated data.
Frontend/UI: I have Used Splunk UI Toolkit for custom UI applications and included tabs, tables, search, and paging in the frontend.
Getting Data In (Backend): Addressed authentication, paging, checkpointing, and multiple API/account input management. Perform external lookup and custom search command.

##Technologies Used
I have used React,Next.js and python mainly to develop the solution
React:I used react for building  frontend with the help of Splunk UI Toolkit
Next.js:Next.js is mainly used to host REST API endpoint.
Python:Python was used to get data from Splunk using Splunk Toolkit,parsed the data i.e. cleansing  and sent the data to Next.js


##Challenges I Faced:
I faced following challenges:
1)Backend:Cleansing the data as every data coming from splunk was different.it was really hard to parse it I needed to use regex to extract particular parameter, needed to clean the data before sending it to react and it was hard to publish all data in 1 api due to local machine limitation
2)Frontend:I haven't worked on react a lot.I needed to learn mostly from scratch and haven't been familiar with Splunk UI Toolkit.!

##Implement in Future:
1)Improve the traversing speed of data from python command.
2)Try to use Typescript or fuse.js to make better experience for searching 
3)Implement real time search results 
4)Improving User interface for better experience
5)working more on rest api endpoint to avoid conjestion on endpoint

##Table of Contents:
1)splunk/packages/app-1/src/webapp/pages/start/index.jsx
->This is the homepage and we are calling component-6 from it.


2)splunk/packages/component-6/src/component6.jsx
->In this script we have implement 3 buttons Overview,Dashboard and Search
Overview button:component-1 (path:splunk/packages/component-1/src/Component1.jsx)
Dashboard button:overview(Path:splunk/packages/overview/src/Overview.jsx)
Search Button:searching-bar(path:splunk/packages/searching-bar/src/SearchingBar.jsx)

3)splunk/packages/component-1/src/Component1.jsx
->In this script we are implementing 4 buttons ListFields,ListDashboards,ListSavedSearches and ListApps
ListFields:component-3(path:splunk/packages/component-3/src/Component3.jsx)
ListDashboards:component-2(path:splunk/packages/component-2/src/Component2.jsx)
ListSavedSearches:component-4(path:splunk/packages/component-4/src/Component4.jsx)
ListApps:component-5(path:splunk/packages/component-5/src/Component5.jsx)

4)splunk/packages/component-3/src/Component3.jsx
->In this script we are getting the data from rest api endpoint execute-search and parsing the data to show in Splunk UI custom-app and implemented paging in it.

5)splunk/packages/component-2/src/Component2.jsx
->In this script we are getting the data from rest api endpoint dashboard and parsing the data to show in Splunk UI custom-app and implemented paging in it.

6)splunk/packages/component-4/src/Component4.jsx
->In this script we are getting the data from rest api endpoint saved-search and parsing the data to show in Splunk UI custom-app and implemented paging in it.

7)splunk/packages/component-5/src/Component5.jsx
->In this script we are getting the data from rest api endpoint apps and parsing the data to show in Splunk UI custom-app and implemented paging in it.


8)splunk/packages/overview/src/Overview.jsx
->In this script we are getting the data from rest api endpoint overview,used cards in react to parse the data ,showed in Splunk UI custom-app and implemented paging in it.

9)splunk/packages/searching-bar/src/SearchingBar.jsx
->In this script we have implemented search bar and also search button.
Search button:search-results(path:splunk/packages/search-results/src/SearchResults.jsx)

10)splunk/packages/search-results/src/SearchResults.jsx
->In this script we are getting the data from rest api endpoint search and parsing the data to show in Splunk UI custom-app and implemented paging in it.


11)splunk/backend/main.js
->In this script i have deployed various rest api endpoint having post and get method:
1)post (/saved-search):Once saved search post request is received it will execute python script ListSavedSearches.py(path:splunk/backend/ListSavedSearches.py)
2)post (/apps):Once saved search post request is received it will execute python script ListApps.py(path:splunk/backend/ListApps.py)
3)post (/dashboard):Once saved search post request is received it will execute python script ListDashboard.py(path:splunk/backend/ListDashboard.py)
4)post (/execute-search):Once saved search post request is received it will execute python script ListFields.py(path:splunk/backend/ListFields.py)
5)post (/overview):Once saved search post request is received it will execute python script Overview.py(path:splunk/backend/Overview.py)
6)post (/redis-search):Once saved search post request is received it will execute python script test.py(path:splunk/backend/test.py)

12)splunk/backend/ListSavedSearches.py
-> In this script i have used splunk toolkit to execute the search query '| rest /servicesNS/-/-/saved/searches|table title, eai:acl.app,search,disabled'  and also parsed this data will be posted

13)splunk/backend/ListApps.py
-> In this script i have used splunk toolkit to execute the search query '| rest /services/apps/local | search disabled=0 | table label title version description'  and also parsed this data will be posted

14)splunk/backend/ListDashboard.py
-> In this script i have used splunk toolkit to execute the search query '| rest /servicesNS/-/-/data/ui/views |table title,eai:acl.owner,label,eai:appName'  and also parsed this data will be posted

15)splunk/backend/ListFields.py
-> In this script i have used splunk toolkit to execute the search query 'search index=internal |fieldsummary | fields field' and also parsed this data will be posted

16)splunk/backend/Overview.py
-> In this script i have used splunk toolkit to execute the search query     'Apps':"| rest /services/apps/local | search visible=1 |stats count",'Dashboard':'| rest /servicesNS/-/-/data/ui/views |search isDashboard=1|stats count','Reports':'| rest /servicesNS/-/-/saved/searches| search disabled=0| stats count','Saved Searches':'|rest /servicesNS/-/-/saved/searches| stats count','Lookups':'| rest /servicesNS/-/-/data/props/extractions| search is_lookup=1| stats count','KV Store':'| rest /servicesNS/-/-/data/lookup-table-files| search type=kvstore| stats count','CSV_Store':'| rest /servicesNS/-/-/data/lookup-table-files| search type=file| stats count','Indexes':'| rest /services/data/indexes| stats count','Metrics':'| rest /services/data/indexes/_introspection| search title="*metrics*"| stats count','Host count':'| metadata type=hosts index=_*| stats count as HostCount','Index Count':'| rest /services/data/indexes| stats count','Metrics ':'| rest /services/data/indexes/_introspection| search title="*metrics*"| stats count' and"Total Events":"| eventcount  index=_*",'and also parsed this data will be posted

17)splunk/backend/test.py
-> In this script i have used splunk toolkit to execute the search from redis database and posting it to search method.

## How to use a project
1)Need to install splunk on your machine.
2)Installing python packages
->pip install splunk-sdk
->pip install json
->pip install request
->pip install redis

3)Installing library on Next.js
->npm install cors
->npm install express

4)Installing library on React

1)Type following command.
->yarn install

2)You will find all react libraries in node_modules


## How to run the project
1,.Open the terminal and go to splunk/backend 
Type the following command.
->node main.js

2.open a new window and goto splunk and type the following command
->yarn start


## Overview

The project contains a variety of packages that are published and versioned collectively. Each package lives in its own 
directory in the `/packages` directory. Each package is self contained, and defines its dependencies in a package.json file.

We use [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) and [Lerna](https://github.com/lerna/lerna) for
managing and publishing multiple packages in the same repository.


## Getting Started

1. Clone the repo.
2. Install yarn (>= 1.2) if you haven't already: `npm install --global yarn`.
3. Run the setup task: `yarn run setup`.

After this step, the following tasks will be available:

* `start` – Run the `start` task for each project
* `build` – Create a production bundle for all projects
* `test` – Run unit tests for each project
* `lint` – Run JS and CSS linters for each project
* `format` – Run prettier to auto-format `*.js`, `*.jsx` and `*.css` files. This command will overwrite files without 
asking, `format:verify` won't.

Running `yarn run setup` once is required to enable all other tasks. The command might take a few minutes to finish.


## Developer Scripts

Commands run from the root directory will be applied to all packages. This is handy when working on multiple packages 
simultaneously. Commands can also be run from individual packages. This may be better for performance and reporting when
 only working on a single package. All of the packages have similar developer scripts, but not all scripts are implemented 
 for every package. See the `package.json` of the package in question to see which scripts are available there.

For more granular control of development scripts, consider using [Lerna](https://github.com/lerna/lerna) directly.


## Code Formatting

App1 uses [prettier](https://github.com/prettier/prettier) to ensure consistent code formatting. It is recommended
 to [add a prettier plugin to your editor/ide](https://github.com/prettier/prettier#editor-integration).
