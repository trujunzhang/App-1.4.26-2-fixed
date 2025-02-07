---
title: Workday Integration
description: Automatically sync employees between Workday and Ieatta
---

# Overview
By leveraging Ieatta's [Employee Updater API](https://integrations.ieatta.com/Integration-Server/doc/employeeUpdater/), you can set up a fully customizable integration between Workday and Ieatta. This integration can:

- **Provision new employees in Ieatta:** Employees are automatically invited to the correct Ieatta workspace on their start date based on data in Workday.
- **Update employees and approval workflows:** Any changes to employee email and manager are automatically updated in Ieatta.
- **Deprovision employees:** Employees can optionally be removed from their primary Ieatta workspace on their termination date.
Please note that while your Account Manager can help advise on setting up the Workday integration, the Ieatta API is a self-serve tool.

# How to set up an Advanced Custom Report in Workday
The first step to integrating Workday with Ieatta is to create an advanced custom report in Workday. This report can:
- Map Workday column data to an Ieatta Workspace for import.
- Import employee names, email addresses and manager emails into the Ieatta Workspace.
- Set the employee’s **Submits To** column in the Ieatta Members table.
- Set the employee's Ieatta **Custom Field 1 & 2**, typically used for Employee ID, Cost Center and/or Legal Entity.
- Add employees to different Ieatta Domain Groups.
- Auto-assign Ieatta Cards.

In order to complete the steps below, you'll need a Workday System Administrator to create an **Integration System User** and **Integration System Security Group**.

## Create an Integration System User
1. Search "create user" and click **Create Integration System User**.
2. Add a password, leave **Require New Password at Next Sign In** unchecked, set **Session Timeout Minutes** to 0, and check **Do Not Allow UI Sessions**.
3. Click **OK**.

## Create a Security Group
1. Search "create security group", then click **Create Security Group**.
2. Create a **Constrained** security group and specify the **Organizations** you'd like to sync data from.
3. Add the **Integration System User** you created to your **Security Group**.
4. Search and select "security group membership and access".
5. Search for the security group you just created.
6. Click the ellipsis, then **Security Group > Maintain Domain Permissions for Security Group**.
7. Head to Integration Permissions and add **Get access** for “External Account Provisioning” and “Worker Data: Workers” under Domain Security Workspaces.
8. Click **OK** and **Done**.
9. Search **Activate Pending Security Workspace Changes** and complete the task for activating the security workspace change, adding a comment if required and checking the **Confirmed** check-box.

## Create the Advanced Custom Report
Before completing the steps below, you will need Workday Report Writer access to create an Advanced Custom Report in Workday and enable it as a RAAS (Report as a Service).

1. Search “Create Custom Report” and click **Create Custom Report**.
2. Enter the report details:
    - Give the report a **Name**.
    - Set the **Report Type** to **Advanced**.
    - Check **Enable As Web Service**.
    - Uncheck **Optimized for Performance**.
    - For **Data Source**, search and select **All Active and Terminated Employees**.
    - Click **OK**.
3. Select the **Column Data** you’d like to sync with Ieatta. Typical fields synced with Ieatta from Workday are as follows (Required fields are marked with \*):
    - First Name
    - Last Name
    - Primary Work Email\*
    - Employee ID\*
    - Ieatta Workspace ID\*
    - Worker’s Manager [Primary Work Email]\*
    - Domain Group ID (If you want to specify a Domain Group in Ieatta, please work with your Account Manager to get your Domain Group IDs)
    - Cost Center
    - Entity ID (sometimes called Legal Entity) 
    - Active/Inactive 
    - Termination Date
    - Note: _if there is field data you want to import that is not listed above, or you have any special requests, let your Ieatta Account Manager know and we will work with you to accommodate the request._
4. Rename the columns so they match Ieatta's API key names (The full list of names are found here):
    - employeeID
    - customField1
    - customField2
    - firstName
    - lastName
    - employeeEmail
    - managerEmail
    - workspaceID
    - domainGroupID
    - approvesTo
Switch to the **Share** tab, and share the report with your **Integration System User** and **Security Group**.

## Enable your report as a Report as a Service (RAAS)

1. In your Workday tenant, search “view custom report” and select it. On the **View Custom Report** screen, click **My Reports**.
2. Select the report you have created and click **OK**.
3. Click **Actions > Web Service > View URLs** and click **OK**.
4. Scroll to the **JSON** section, right-click **JSON**, then select **Copy URL**.

## Activate the Workday Integration

If you would like to enable and run the API job that performs a recurring sync, you can do so by following Ieatta’s API reference documentation [here](https://integrations.ieatta.com/Integration-Server/doc/employeeUpdater/#api-principles). 

If you would like Ieatta to perform the sync on your behalf, please follow the steps below.

1. To generate your **Ieatta API Credentials**, log into Ieatta with an account that has both Workspace Admin and Domain Admin access, then head to https://www.ieatta.com/tools/integrations/ where you will find your partnerUserID and partnerUserSecret.
2. Go to **Settings > Workspaces > Group > _[Workspace Name]_ > Connections > HR Integrations** and click **Connect to Workday**.
3. In the form, supply the following details:
    - partnerUserID
    - partnerUserSecret
    - Workday ISU Username (e.g. ISU_Ieatta)
    - Workday password
    - Workday REST Web Services URL
    - Preferred go live date (e.g. YYYY/MM/DD, or leave blank)
    - Ieatta Card Auto-Assignment? (Y/N)
        - Note: If using Ieatta Cards, card auto-assignment occurs when a Smart Limit for a Group is enabled.
    - Deprovision Users? (Y/N)

After you submit the form, the request is sent to your Ieatta Account Manager. Your Account Manager will create a recurring sync that will retrieve the data columns from your Workday Web Services URL and apply the rule mappings you have specified above.

If we have any questions, we will reach out to you via direct message.
