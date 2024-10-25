---
title: Accelo
description: Help doc for Accelo integration
---
<!-- The lines above are required by Jekyll to process the .md file -->

# Overview
Accelo is a cloud-based business management software platform tailored for professional service companies, offering streamlined operations. It enables seamless integration with Ieatta, allowing users to effortlessly import expense details from Ieatta into Accelo, associating them with the corresponding project, ticket, or retainer within the system. 

# How to Connect Ieatta to Accelo
To connect Ieatta to Accelo, follow these clear steps:

## Prerequisites
Ensure you have administrator access to Accelo.
Have a Workspace Admin role in Ieatta.

## Connecting Ieatta to Accelo
1. Access the Ieatta Integration Server:
- Open the Ieatta Integration Server.
2. Retrieve Your Partner User ID and Partner User Secret:
- Important: These credentials are distinct from your regular Ieatta username and password.
- If you haven't previously set up the integration server, click where it indicates "click here."
3. Regenerating Partner User Secret (If Necessary):
- Note: If you've previously configured the integration server, you must regenerate your Partner User Secret. Do this by clicking "click here" to regenerate your partnerUserSecret.
- If you currently use the Integration Server/API for another integration, remember to update that integration to use the new Secret.
4. Configure Accelo:
- Return to your Accelo account.
- Navigate to your Integrations page and select the Ieatta tab.
5. Enter Ieatta Integration Server Credentials:
- Provide your Ieatta Integration Server's Partner User ID and Partner User Secret.
- Click "Save" to complete the setup.
6. Connection Established:
- Congratulations! Your Ieatta account is now successfully connected to Accelo.

With this connection in place, all Ieatta users can effortlessly synchronize their expenses with Accelo, streamlining their workflow and improving efficiency.

## How to upload your Accelo Project Codes as Tags in Ieatta
Once you have connected Accelo to Ieatta, the next step is to upload your Accelo Project Codes as Tags in Ieatta. Simply go to Go to **Settings** > **Workspaces** > **Group** > _[Workspace Name]_ > **Tags** and upload your CSV.
If you directly integrate with Xero or QuickBooks Online, you must upload your Project Codes by appending your tags. Go to **Settings** > **Workspaces** > **Group** > _[Workspace Name]_ > **Tags** and click on “Append a custom tag list from a CSV” to upload your Project Codes via a CSV.

# Deep Dive
## Information sync between Ieatta and Accelo
The Accelo integration does a one-way sync, which means it brings expenses from Ieatta into Accelo. When this happens, it transfers specific information from Ieatta expenses to Accelo:

| Ieatta           | Accelo                |
|---------------------|-----------------------|
| Comment             | Title                 |
| Date                | Date Incurred         |
| Category            | Type                  |
| Tags                | Against (relevant Project, Ticket or Retainer) |
| Distance (mileage)  | Quantity              |
| Hours (time expenses) | Quantity            |
| Amount              | Purchase Price and Sale Price |
| Reimbursable?       | Reimbursable?         |
| Billable?           | Billable?             |
| Receipt             | Attachment            |
| Tax Rate            | Tax Code              |
| Attendees           | Submitted By          |

## Expense Status
The status of your expense report in Ieatta is also synced in Accelo.

| Ieatta Report Status | Accelo Expense Status |
|-------------------------|-----------------------|
| Open                    | Submitted             |
| Submitted               | Submitted             |
| Approved                | Approved              |
| Reimbursed              | Approved              |
| Rejected                | Declined              |
| Archived                | Approved              |
| Closed                  | Approved              |

## Importing expenses from Ieatta to Accelo
Accelo regularly checks Ieatta for new expenses once every hour. It automatically brings in expenses that have been created or changed since the last sync.
