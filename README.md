# ResumeJson
A small api that parses pdf or text resumes to [json resume schema](https://jsonresume.org/).

![image](https://github.com/user-attachments/assets/9d4a36f2-0fa7-491d-8cee-62cb73840633)
![image](https://github.com/user-attachments/assets/f82613f3-3c25-4ce0-a020-84aeb8aa2684)
![image](https://github.com/user-attachments/assets/f74c4d60-a5ca-4c9c-b1e8-da79a21befd7)
![image](https://github.com/user-attachments/assets/351df48f-0899-4690-b078-56b69c87a1da)

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
commented in the same pr automatically, then on merge to staging/main the apps are built
and pushed to artifact registry, and then cloud run services are deployed to the
corresponding projects in GCP. 

![image](https://github.com/user-attachments/assets/802fada0-a3c4-49f7-9a66-2907e86e0d3d)
![image](https://github.com/user-attachments/assets/b7062143-4771-4ad4-9db8-56e2fac9217c)

## Development workflow

![image](https://github.com/user-attachments/assets/02e52e01-3eac-469a-a91f-37438f839528)

## Infra
All the infra for this project is defined here in a [separate repo](https://github.com/0bCdian/resumeJson-infra), but the tldr of services used is:
- Cloud run for the services.
- Cloud storage for the test reports.
- Secret manager for managing sensitive api keys.
- Firestore as the main DB.
- And service accounts for the services to access gcp resources.

