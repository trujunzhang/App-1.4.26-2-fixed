---
title: Direct Bank Connections
description: Connect your company cards in Ieatta to bring all team members’ card expenses into their accounts and conveniently manage card transactions and out-of-pocket expenses in one place.

---
# Overview
If you're a Domain Admin, you have the power to connect and manage your company cards in Ieatta centrally. If your company uses a card program with one of our Approved! Banking Partners, you can easily connect the card feed to Ieatta via login credentials. Connecting company cards is a great way to bring all team members’ card expenses into their accounts and conveniently manage card transactions and out-of-pocket expenses in one place. Keeping things organized has never been easier!
# How to connect company cards using a direct bank connection
1. Go to **Settings > Domains > _Domain Name_ > Company Cards**
2. Click **Import Card** 

![Ieatta domain cards](https://help.ieatta.com/assets/images/IeattaHelp_DomainCards.png){:width="100%"}

3. Select your card issuer and input the **master administrative login credentials**
4. You will then be able to assign accounts to cardholders
5. Set a start date from which expenses will appear in their accounts
## How to assign company cards
After connecting your company cards with Ieatta, you can assign each card to its respective cardholder. 
To assign the company cards, go to **Settings > Domains > _Domain Name_ > Company Cards**.
If you have more than one card feed, select the correct feed in the drop-down list in the Company Card section. 

![Ieatta domain card list](https://help.ieatta.com/assets/images/IeattaHelp_DomainCardsList.png){:width="100%"}


Once you’ve selected the appropriate feed, click the `Assign New Cards` button to populate the emails and the last four digits of the cardholder. 

![Ieatta assign cards](https://help.ieatta.com/assets/images/IeattaHelp_AssignCardBtn.png){:width="100%"}

![Ieatta domain assign card form](https://help.ieatta.com/assets/images/IeattaHelp_AssignCardForm.png){:width="100%"}

 **Select the cardholder:** Search the populated list for all employee email addresses. The employee will need to have an email address under this Domain to assign a card.
 
**Select the card:** Search the list using the last four digits of the card number. If no transactions have been posted on the card, the card number will not appear in the list. You can instead assign the card by typing in the full card number in the field.

**Note:** If you're assigning a card by typing in the full PAN (the full card number), press the ENTER key on your keyboard after typing the full PAN into the card field. The field may clear itself after pressing ENTER, but click **Assign** anyway and then verify that the assignment shows up in the cardholder table.

**Set the transaction start date (optional):** Any transactions that were posted before this date will not be imported into Ieatta. If you do not make a selection, it will default to the earliest available transactions from the card. 
Please note we can only import data for the time period the bank is releasing to us. Most banks only provide a certain amount of historical data, averaging 30-90 days into the past. It's not possible to override the start date the bank has provided via this tool.

**Click the Assign button:** Once assigned, you will see each cardholder associated with their card and the start date listed.

![Ieatta domain assigned cards](https://help.ieatta.com/assets/images/IeattaHelp_AssignedCard.png){:width="100%"}


## How to unassign company cards
_**Important** - Before you begin the unassigning process, please note that unassigning a company card will **delete** any **Open** or **Unreported** expenses in the cardholder's account. To avoid this, users should submit these expenses **before** their cards are unassigned._

If you need to unassign a certain card, click the **Actions** button associated with the card in question and then click **Unassign**.

![Ieatta domain unassign cards](https://help.ieatta.com/assets/images/IeattaHelp_UnassignCard.png){:width="100%"}

To completely remove the card connection, unassign every card from the list and then refresh the page.

**Note:** If expenses are **Processing** and then rejected, they will also be deleted when they're returned to an **Open** state as the linked card they're linked to no longer exists.

# Deep Dive 
## Configure card settings
Once you’ve imported your company cards, the next step is configuring the cards’ settings. 
If you're using a connected accounting system such as NetSuite, Xero, Sage Intacct, Quickbooks Desktop, or QuickBooks Online. In that case, you can connect the card to export to a specific credit card GL account.
1. Go to **Settings > Domains > _Domain Name_ > Company Cards**
2. Click **Edit Exports** on the right-hand side of the card table and select the GL account you want to export expenses to 
3. You're all done. After the account is set, exported expenses will be mapped to the specific account selected when exported by a Domain Admin.

![Ieatta domain cards settings](https://help.ieatta.com/assets/images/IeattaHelp_UnassignCard-1.png){:width="100%"}


You can access the remaining company card settings by navigating to **Settings > Domains > _Domain Name_ > Company Cards > Settings.**

## Connecting multiple card programs to the same domain

If you need to connect a separate card program from the same bank (that's accessed via a different set of login credentials), when you try to import it by clicking **Import Card/Bank**, the connection to your previous card is disconnected. 

To fix this, you would need to contact your bank and request to combine all of your cards under a single set of login credentials. That way, you can connect all of your cards from that bank to Ieatta using a single set of login credentials. 

{% include faq-begin.md %}
## How can I connect and manage my company’s cards centrally if I’m not a domain admin?
 If you cannot access Domains, you must request Domain Admin access to an existing Domain Admin (usually the workspace owner).
 
## Are direct bank connections the best option for connecting credit cards to Ieatta?
If we currently have a connection with your bank, then it’s a good option. However, if you want enhanced stability and additional functionality, consider opting for a commercial card feed directly from your bank or getting the Ieatta card.

## My card feed is set up. Why is a specific card not coming up when I try to assign it to an employee?
Cards will appear in the drop-down when activated and have at least one posted transaction. If the card is activated and has been used for a while and you're still not seeing it, please contact your Account Manager or message Concierge for further assistance.

## Is there a fee for utilizing direct card connections? 
Nope! Direct card connections come at no extra cost and are part of the Corporate Workspace pricing.

## What is the difference between commercial card feeds and direct bank connections? 
The direct bank connection is a connection set up with your login credentials for that account. In contrast, the commercial card feed is set up by your bank requesting that Visa/MasterCard/Amex send a daily transaction feed to Ieatta. The former can be done without the assistance of your bank or Ieatta, but the latter is more stable and reliable. 

## What if my bank uses a card program that isn't with one of Ieatta's Approved! Banking partners?
If your company uses a Commercial Card program that isn’t with one of our Approved! Banking Partners (which supports connecting the feed via login credentials), the best way to import your company cards is by setting up a direct Commercial Card feed between Ieatta and your bank. Note the Approved! Banking Partners include: 
- Bank of America
- Citibank
- Capital One
- Chase
- Wells Fargo 
- Amex
- Stripe
- Brex

## Why do direct bank connections break?
Banks often make changes to safeguard your confidential information, and when they do, we need to update the connection between Ieatta and the bank. We have a team of engineers who work closely with banks to monitor this and update our software accordingly when this happens. 

## How do I resolve errors while trying to import my card?
Ensure you're importing your card in the correct spot in Ieatta and selecting the proper bank connection. For company cards, use the master administrative credentials to import your set of cards at **Settings > Domains > _Domain Name_ > Company Cards > Import Card.**

## Why is my card connection broken after working fine?
The first step is to check for any changes to your bank information. Have you recently changed your banking password without updating it in Ieatta? Has your banking username or card number been updated? Did you edit your security questions for your bank? Additionally, if your security questions have changed or their answers aren't saved in Ieatta. In that case, we won't be able to access your account list, and you'll need to address this within Ieatta.

If you've answered "yes" to any of these questions, you'll need to update this information in Ieatta and manually re-establish the connection. Please note that Ieatta cannot automatically update this information for you.
A Domain Admin can fix the connection by heading to **Settings > Domains > _Domain Name_ > Company Cards > Fix**. You will be prompted to enter the new credentials/updated information, and this should reestablish the connection.
If you are still experiencing issues with the card connection, please search for company card troubleshooting or contact Ieatta Support for help.


{% include faq-end.md %}
