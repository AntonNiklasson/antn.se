---
title: What is the best file structure for a React project?
date: 2018-08-20
---

React doesn't come with a set of rules for structuring your components. It solves a small set of problems really well, the rest is up to you as the developer to figure out and decide on. Structuring your app in files and folders can be the key to longevity and maintainability of the codebase, while at the same time confuse someone else even further as they try and grasp the data flow and overall behaviour of the application. Try thinking about who would benefit from a proper file structure.

From what I've seen an experienced developer in the project, in terms of time spent in the codebase, is not really looking at the folder structure. She spent enough time in the codebase to know most files by heart and is probably using some kind of tool to quickly navigate between them. Think about a member of the team that joined last week. How can the structure help her more quickly understand the system? I definitely appreciate an understandable and coherent structure when joining a new project.

---

There are a few different common approaches that might be worth considering. Studying other peoples work is a of course a great way or learning, just don't get stuck thinking you _have_ to do what someone else is doing. Here are two different ways of structuring a project:

## 1. By types -- Categorization

The idea here is that similar files belong together. Higher level containers and views go together, while everything related to redux actions are put in the `actions` folder. This makes it really easy to get a grasp of what the application is doing in a specific area. _We need to change the way we parse responses from the backend_ 😳. Easy, just open up the`actions` folder and go through each file.

Here's a really simple example of this structure:

```
node_modules/
src/
  containers/
    authContainer.js
    editorContainer.js
    profileContainer.js
  actions/
    profileActions.js
    userActions.js
    authActions.js
  components/
    button.js
    input.js
    profileCard.js
  endpoints/
    profileEndpoint.js
    authEndpoints.js
tests/
  containers/
    authContainer.tests.js
  components/
    profileCard.tests.js
README
package.json
yarn.lock
```

I often find myself creating a folder named something like `components` to have a place for all the reusable "low-level" things a want to use in more than one place. Just remember that it could be structured a bit further. Perhaps `components/forms`, `components/video` could be usable subcategories. Why not take it a step further and create a design system? [All the cool kids are doing it now][1].

## 2. By feature -- Co-location

Instead of thinking _what files are similar?_ turn that thought around to _what files are actually working together?_.

Divide your application into features, rather than what kinds of files or components to contain. Things like `login` and `registration`. I know some people actually map it hard to their defined routes in the application.

Here's an example of that structure:

```
node_modules/
src/
  login/
    loginView.js
    loginActions.js
    loginEndpoints.js
  profile/
    profileView.js
    profileActions.js
    profileReducer.js
    profileCard.js
  _shared/
    button.js
    input.js
tests/
  login/
    loginView.tests.js
README
package.json
yarn.lock
```

The benefit here is that *everything* related to make that subsystem work is right there. Which sounds great. However, I can imagine that each feature or subsystem can differ a lot from each other. Which of course could work just fine, but it takes away a bit from the coherence. Perhaps the learning curve is a bit steeper here.

---

<blockquote class="twitter-tweet" data-lang="sv"><p lang="en" dir="ltr">Okay, I give in. I wrote a guide on the most scalable file structure for React projects. I’m using it every day. Best part: it works for Vue projects too. Hope it’s helpful! ✨ <a href="https://t.co/O2mNVx7vCs">https://t.co/O2mNVx7vCs</a></p>&mdash; Dan Abramov (@dan_abramov) <a href="https://twitter.com/dan_abramov/status/1027245759232651270?ref_src=twsrc%5Etfw">8 augusti 2018</a></blockquote>



[1]: https://blog.brightscout.com/8-top-design-systems-2018/
