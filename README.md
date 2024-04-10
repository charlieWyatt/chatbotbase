## What is this?

I experiment with chatgpt a lot, and often found myself wanting a simple "chatbot" base that I can use for my experiments. This is that base! 
It's a clean webapp that you can fork and play around with to your hearts content.

It's a simple interface that uses the API to create a chatbot experience and saves the data locally. The tech stack is - 

Frontend -
- typescript
- Vue / vuex
- trpc

Backend -
- typescript
- trpc
- prisma
- postgreSQL

## Set up

### Install packages
Run `yarn install` from the root of your repository

### Set up local db
If you don't have postgres installed. Install it. - 

Create a database.

For mac - 
`brew install postgresql`

`brew services start postgresql`

`createdb chatbotbase`

### Set up Env
Inside server there is a .env.sample file. Using that as a template, create a file in the same directory called ".env" and fill out those variables.

## Running
In one terminal run - 

`yarn run:client`

In another terminal run -

`yarn run:server`

