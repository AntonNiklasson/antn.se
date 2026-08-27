---
title: GitHub Dashboard
date: 2026-05-27
excerpt:
    "A desktop app for keeping track of my open pull requests across github.com
    and github enterprise."
---

I have been hacking on a tool for myself over the last couple of weeks: a
dashboard for my ongoing work on github. Since we got acquired by Workday, we
work on a github enterprise instance in parallel with github.com. This added
some friction, on top of the sub-par experience that github.com already offers.

So I started building my own thing. I tend to create lots of smaller pull
requests, depending a bit on what areas I am working on. Sometimes I focus on a
single thing for a couple of days, and other times I have 5-10 pull requests
open in parallel. This led me to build a dashboard for pull requests, both my
own and where I'm requested as a reviewer. The dashboard also lets me look at
everything from both instances at the same time, or focus on one at a time.
Obviously it's also keyboard friendly, with vim-like bindings.

It is available open-source on github, and currently it is packaged as a desktop
app for macOS. Try it out and let me know what you think.

https://github.com/AntonNiklasson/github-dashboard

<img class="no-shadow" src="/blog/github-dashboard--screenshot.png" alt="" />
