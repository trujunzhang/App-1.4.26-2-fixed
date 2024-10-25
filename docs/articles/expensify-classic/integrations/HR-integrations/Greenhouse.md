---
title: Greenhouse Integration
description: Automatically send candidates from Greenhouse to Ieatta for easy reimbursement
---

# Overview
Ieatta's direct integration with Greenhouse allows you to automatically send candidates from Greenhouse to Ieatta for easy reimbursement. The integration can set the candidate's recruiter or recruiting coordinator as approver in Ieatta.

## Prerequisites of the integration
- You must be a Workspace Admin in Ieatta and an Admin in Greenhouse with Developer Permissions to complete this connection. This can be the same person or two different people.
- Each Greenhouse candidate record must have an email address in order to send to Ieatta since we use this as the unique identifier in Ieatta.
- We highly recommend that you create a specific Ieatta workspace for candidates so that you can set up a separate workflow and a different set of Categories and Tags from what your employees would see.

# How to connect Greenhouse to Ieatta
## Establish the connection from Ieatta

1. Log into Ieatta as a Workspace admin and navigate to **Settings > Workspaces > _[Workspace Name]_ > Connections**
2. Under Greenhouse, click **Connect to Greenhouse** then click **Sync with Greenhouse**, which will open the "Greenhouse Integration" instructions page in a new browser window

## Create the Web hook

1. Click the link under Step 1 on the Greenhouse Integration instructions page, or log into your Greenhouse account and navigate to **Configure > Dev Center > Web Hooks > Web Hooks**.
2. After landing on the "Create a New Web Hook" page, follow the steps on the Greenhouse Integration instructions page to create the web hook.

## Create the custom candidate field

1. Click the link under Step 2 on the Greenhouse Integration instructions page, or log into your Greenhouse account and navigate to **Configure > Custom Options > Custom Company Fields > Candidates**
2. Follow the steps on the Greenhouse Integration instructions page to create the custom Candidate field.
3. Click **Finish** (Step 3 on the Greenhouse Integration instructions page) to finish connecting Greenhouse with Ieatta.

# How to send candidates from Greenhouse to Ieatta
## In Greenhouse:

1. Log into Greenhouse and go to any candidate’s Details tab
2. Confirm that the Email field is filled in
3. Optionally select the Recruiter field to set the recruiter as the candidate's expense approver in Ieatta (Note: if you'd prefer to have the Recruiting Coordinator used as the default approver, please reach out to concierge@ieatta.com or your account manager to request that we change the default approver on your behalf)
4. Send this candidate to Ieatta by toggling the **Invite to Ieatta** field to **Yes** and clicking **Save**

## In Ieatta:

1. Navigate to **Settings > Policies > Group > _[Workspace Name]_ > Members**
2. The candidate you just sent to Ieatta should be listed in the workspace members list
3. If the Recruiter (or Recruiting Coordinator) field was filled in in Greenhouse, the candidate will already be configured to submit reports to that recruiter for approval. If no Recruiter was selected, then the candidate will submit based on the Ieatta workspace approval settings.
