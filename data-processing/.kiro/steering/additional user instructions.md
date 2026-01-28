---
inclusion: always
---
<!------------------------------------------------------------------------------------
   Add rules to this file or a short description and have Kiro refine them for you.
   
   Learn about inclusion modes: https://kiro.dev/docs/steering/#inclusion-modes
-------------------------------------------------------------------------------------> 

- use python venv at /Users/pillalamarrimallikarjun/Documents/python-envs/semantic-search 
- bedrock models are available in us-east-1. All other services are available in ap-southeast-1
- Opensearch and RDS are available via a jumpserver at jumphost-sg.castlery.com
- ssh credentials are in /Users/pillalamarrimallikarjun/OneDrive - Castlery Pte Ltd/workspace/Fun projects/autobots-semantic-search, with the username being autobots
- do not create new .md files unless necessary. Check for existing .md files namely README.md, DEPLOYMENT_GUIDE.md, PROJECT_DOCUMENTATION.md and amend these files if possible. Only if the context does not belong to these files, you can create a new .md file
- cleanup unnecessary files after you create multiple files. 
- for any new features or changes needed to be done, first see if starter_prompt.md, plan.md, domain_model.md, logical design, steering docs need to be updated. Ask the user for reviewing any changes to these .md files and once approved, only then edit the source code of tests 