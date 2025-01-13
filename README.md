# ResumeJson

[[_TOC_]]

## About

This is the final project for the DevOps Bootcamp from [Boolean academia](https://boolean.cl/)

This project consists of a monorepo with 4 main packages:

  1. A frontend React App
  2. A backend for serving that react app and the api for managing users and
     their api keys.
  3. A lambda function that resets the users api call count every month.
  4. The main server, which serves an api for parsing resumes from pdf and text
     to a json standard format following the [json resume schema](https://jsonresume.org/).

### Technologies used

- Frontend: React, Tanstack Query, Tanstack Router, Firebase sdk.
- Frontend server: Hono, Bun, Firebae admin sdk.
- Lambdas: (not yet implemented)
- Main server: Hono, Bun, firebase sdk
- Test suite: vitest
- Languages: Mainly typescript and bash for scripts.

## CI / CD

This project features a ci/cd pipeline that starts when making a pull request
off of staging (the main develop branch) and first, test are run and the results
commented in the same pr autmatically, then on merge to main the apps are built
and pushed to artifact registry, and then cloud run services are deployed to the
staging project in GCP
