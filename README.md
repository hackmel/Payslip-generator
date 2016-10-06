# Payslip-generator
A web app that calculates and generate a payslip based from a csv file uploaded into the system

Installation guide:

1.) Check if you have nodejs intalled in your computer. Open your terminal and type npm. 
You should get something like these if nodejs is installed:
    
	where <command> is one of:
    access, adduser, bin, bugs, c, cache, completion, config,
    ddp, dedupe, deprecate, dist-tag, docs, edit, explore, get,
    help, help-search, i, init, install, install-test, it, link,
    list, ln, login, logout, ls, outdated, owner, pack, ping,
    prefix, prune, publish, rb, rebuild, repo, restart, root,
    run, run-script, s, se, search, set, shrinkwrap, star,
    stars, start, stop, t, tag, team, test, tst, un, uninstall,
    unpublish, unstar, up, update, v, version, view, whoami

		npm <cmd> -h     quick help on <cmd>
		npm -l           display full usage info
		npm help <term>  search for help on <term>
		npm help npm     involved overview

		Specify configs in the ini-formatted file:
		or on the command line via: npm <command> --key value
		Config info can be viewed via: npm help config

2.) Install nodejs if you don't have it yet. Download the latest version from this site https://nodejs.org/en/download/

3.) Download the zip file of this project (Payslip-generator) here in github and extract it somewhere in your computer.

4.) You will find two folders inside myPaySlipProject. The client and the server.

5.) The client is an AngularJS application. The server backend is a nodeJS application using sails framework. 

6.) First we need to setup the server by running npm install inside the project. 
    
		Open terminal and navigate inside the node-server directory. Type npm install
    
		> myPaySlipProject/server/node-server/npm install
    
		This should install all the necessary libraries needed to run the server.
    
		Right after this, run the server by typing sails lift.
    
		> myPaySlipProject/server/node-server/sails lift
    
		By default, the server should listen on this URL http://localhost:1337

7.) Second we need to run the client. Open another terminal window and navigate inside the client folder and type npm start.    
    
		> myPaySlipProject/client/angular/npm start
    
		This will install all the necessary libraries from node and bower, after this, the node should start.
    
		By default the client should listen on this URL http://localhost:8000/

9.) The application is now accessible through http://localhost:8000/ using your browser.

