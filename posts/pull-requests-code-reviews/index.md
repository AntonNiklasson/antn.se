---
title: Pull Requests and Code Reviews
date: "2018-10-05T13:00:00.626"
---

Writing code is basically a constant struggle to figure out what to changes and/or additions to make in order to build a specific feature or functionality. Making a small, isolated, well-tested change is often hard, while getting lost in a side quest is easy, and fun.

If there is just a single developer working in a code base it is probably fine. It might not matter in what order things happen, or if they happen at all. But within a team this makes things messy really fast. Changes made to the codebase needs to be isolated, well thought-out and structured in a way that other developers can understand the reasoning behind it.

A pull request is basically a _suggestion_. Other people get a chance to consider it, challenge the author a bit and ask all the questions they can think of. Reading, or perhaps consuming, the pull request is defined as a code review. I am sure a code review can be many other things too, but for the sake of this piece that is what I am focusing on.

---

What makes a pull request great? Here is a few things that I am always trying nail:

## Purpose
The pull request needs to have a clear purpose. Add some kind of description, a TL;DR, explaining what bug it solves or what ticket it implements. Just a few sentences can make all the difference. It could be nice to add a link to the JIRA ticket or Trello card.

Depending on the change it could even be nice to include some screenshots to further explain what issue this solves or what the new feature is doing.

## Focus
Don’t solve 6 bugs in a single PR. Make sure the changes are cohesive and logical. Don’t solve the bug, change the linting config and update all the dependencies in a single PR. Make them three separate request. And perhaps what is even better: branch out from the main branch, fix the linting config and make sure it gets merged quickly, then pull that into your feature branch. Make sure your feature branch is clean and that other people enjoy the benefits as quickly as possible.

Reading a change and not being sure if it is related to the overall purpose can be extremely confusing. Make things easy to grasp.

---

What about the code review? What does it mean to approve a pull request? Scrolling through the changes and adding a random comment on code style is usually not enough to gain an understanding and making sure the quality is there. Approving a PR makes you at least partly responsible for the success of this change.

## Ask all the questions
A huge part of spending time on reviewing someone else’s code should be focused on _your understanding_. Make sure to question weird solutions and ask the author about anything that is not clear to you. This will benefit everyone long-term.

## Break things!
Run the code locally and make an effort to “break” the new feature. Play around with it, make sure it does what it is supposed to. Perhaps the author focused a bit too much on the happy path and missed some weird edge case.

## Tests and QA
Reading the accompanying tests can be a great way of understanding the purpose of the change. Are the tests written in such a way that they are actually adding value? Test code is code too, and you can question the implementation of tests in same way as any other code.

This point should also include things outside of unit-tests or integration tests. What about performance? Could this change have an impact on the overall performance of the system? Is there something within the new feature that could benefit from a bit of optimisation? What about [perceived performance](https://en.wikipedia.org/wiki/Perceived_performance)?

## Be nice 😇
Give constructive feedback, suggest alternative changes, do not call someone out for being stupid just because they forgot a `console.log` or a weird comment in there.

Another thing i quite like is “nitpicks”. Tiny changes that could be worth doing but are not really necessary. Like changing a method’s name from `users` to `getAllUsers` or receiving an error in a catch statement as `error` instead of `e`. I usually write a comment  like _“nit: naming this xyz instead x would be a bit more clear”_.

---

At my last assignment we spent a lot of our time doing mob programming. This made it quite natural to also take on code reviews as a mob. As long as everyone feels comfortable with asking all the questions and making themselves heard, it’s great.

Just make the PR easy to follow and make sure the code review is actually a process and not just the click of a button.
