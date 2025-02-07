# Best Practices for Regression Test Proposals

Welcome to the Regression Test Best Practices page! Thanks for taking the time to help us ensure bugs that are squashed don't come back!

---

## Context
We use a third party to run QA on our new application (the one you're helping build!) to catch bugs. When a bug is found, we then create a job available to our community of open-source contributors, and once the bug is successfully squashed, we want to ensure that the bug never comes back - because after all, the whole point of squashing a bug is to ensure it's dead! Therefore, we need to either create a new test case for our QA team to complete and make sure the bug doesn't come back, or update an existing test case to cover this scenario. Our QA tests are broken into various categories that cover the scenario taking place in the User Experience such as starting a new 1:1 chat, requesting money, or updating profile settings. Then we break down the scenario into _exact_ written steps for the QA team to replicate and ensure they get the correct result. This is where you come in!  

## Determining if we should create a regression test for the bug

Before proposing test steps for a bug, we first need to determine whether or not we should create a test for it. In order to determine this, we look for these common traits:
- Is it easy to test for this bug?  
- Is the bug related to an important user flow? (For example, adding a bank account)
- Is it an impactful bug?

If the answer is yes to all of those questions, you can feel confident that we should create a test for the bug.

If the answer is no to all of those questions, you can feel confident we shouldn't create a test for the bug. 

Once you've come to an answer on determining if we should create a test or not, you'll then post a comment in the GH outlining your recommendation and your reasoning for why (short and sweet is fine!). 
- Note: If you feel the answer is no to some, but not all, of the questions, trust your gut and proceed to post your recommendation and reasoning for it in the GH.

Once your decision is posted you can either move on to the below steps, or ensure the other items in the checklist are complete and wait to be paid!

## Formatting of regression test step proposals

#### Location and format of the proposal post
1. All proposals should note that it's a Regression Test Proposal
2. All proposals for test steps should occur as a comment in the GH issue it's related to
3. All test steps in the proposal should mirror the writing style noted below  
4. All proposals should ask for a 👍 or 👎 as confirmation and agreement on the steps outlined in thread

Example: 

**Regression Test Proposal**
  - Step 1
  - Step 2
  - Step 3
  - Do we agree 👍 or 👎

#### Writing style of steps
For the test case steps we're asking to be created by the contributor whose PR solved the bug, it'll fall into a category known as bug fix verification. As such, the steps that should be proposed should contain the action element `Verify` and should be tied to the expected behavior in question. 
The steps should be broken out by individual actions taking place with the written style of communicating exact steps someone will replicate. As such, simplicity and succinctness is key. 

Below are some examples to illustrate the writing style that covers this:
- Bug: White space appears under compose box when scrolling up in any conversation
- Proposed Test Steps:
  - Go to URL https://staging.new.ieatta.com/
  - Log in with any account
  - Navigate to any conversation
  - Focus on the compose box and scroll up
  - Verify that no white space appears under the compose box


- Bug: A blank page is shown for an archived room with a message in it
- Proposed Test Steps:
  - Create a workspace if you don't have any
  - Go to members page and remove the other admin (Ieatta setup specialist)
  - Search the announce room and send a message
  - Pin the room and delete the workspace
  - Wait for a few seconds (Reload if the chat is still visible)
  - Verify that you are not seeing a blank page

---

Once the above proposal has been posted and agreed upon, a member of the Ieatta team will then take care of getting it added to the appropriate test suite! If you have any further questions surrounding proposing regression tests, please feel free to ping anyone in the issue for further help. 

