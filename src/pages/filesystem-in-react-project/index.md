---
title: What is the best filestructure for a React project?
date: "2018-08-20T12:00:00.626"
---

TL;DR: There are no real guidelines or best-practices when it comes to structuring your files in a React projects. Just try something, and change it when it gets awkward.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Okay, I give in. I wrote a guide on the most scalable file structure for React projects. I’m using it every day. Best part: it works for Vue projects too. Hope it’s helpful! ✨ <a href="https://t.co/O2mNVx7vCs">https://t.co/O2mNVx7vCs</a></p>&mdash; Dan Abramov (@dan_abramov) <a href="https://twitter.com/dan_abramov/status/1027245759232651270?ref_src=twsrc%5Etfw">August 8, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

However, there are a few different common approaches that might be worth considering. You are not the first one going through this, so looking at what others are doing is probably a good idea. Just don't get stuck thinking you _have_ to do what someone else is doing. Here's a few different approaches:

## By types -- Categorization

The idea here is that similar files belong together. Higher level containers and views go together, while everything related to redux actions are put in the "actions" folder. This makes it really easy to get a grasp of what the application is doing in a specific area. _We need to change the way we parse responses from the backend 🧐_. Easy, just open up the "actions" folder and go through each fil. It's all there.

Create folders for each "kind" of component or file. A redux setup might include `actions`, `reducers` etc.

Here's an example of this structure:

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

## By feature -- Co-location

Divide your application into features, rather than what kinds of files or components to contain. Things like `login` and `registration` instead of `containers`, `views`, `actions` etc.

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

## yolo

Reacts own codebase actually follows a quite unique convention. Each file has a unique name inside the codebase. That means importing a file is just a matter of finding "any" file with that specific name. Facebook built their own functionality for this, but the idea is pretty clean.









[1]: https://reactjs.org/docs/faq-structure.html
