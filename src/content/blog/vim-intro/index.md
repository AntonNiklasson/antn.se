---
title: Introduction to Vim
date: 2016-01-21
---

I worked with Vim from time-to-time for the last four years. I am still a
complete noob, but I can definitely get stuff done. My first impression of vim
was that it was horrible, ugly and useless. Since then I've gotten used to some
of the concepts behind it and also spent some time configuring it. Today I would
say vim is my main editor, however it's probably not perfect for all situations.
I write a lot of web right now. Something like Java or C# might require a more
robust IDE.

These are some tips that I would have appreciated when first starting out.

## Modes

The majority of my time in a file I navigate. I move from one place to another.
That is _NORMAL_ mode in Vim. When you've found the correct spot you press
<span class="keyboard-button">i</span> to enter _INSERT_ mode. This is where you
input characters and probably why vim is confusing at first. Go back to normal
mode with <span class="keyboard-button">Esc</span>. Or if you prefer;
<span class="keyboard-button">Ctrl</span><span class="keyboard-button">C</span>.
From _Normal_ mode you can go to _Visual_ mode via
<span class="keyboard-button">v</span>. This mode is for
selecting/deleting/moving text. Go back to _Normal_ just like in _Insert_.

**Tip:** Enter _Insert_ with i, _Visual_ with v. Exit back to _Normal_ with Esc
or Ctrl + C.

## Forget the Arrows

It might be a bit confusing how to move around at first. Most beginners,
including myself, keep on using the arrow keys as in any other normal editor.
However, I would suggest that you forget the arrows completely and start doing
it the _vim way_ instead. Use h, j, k and l to move left, down, up and right
instead. You might realize it's possible to move around in _Insert_ with the
arrows. That's not really meant to work, that's cheating. _Insert_ is strictly
for _inserting_. Instead you should navigate to the exact spot, insert what you
want and then exit _Insert_ to navigate again. It will feel awkward, but as soon
as you learn a couple of _motions_ it will be worth it.

**Tip:** you can combine _motions_ with numbers: `10j` moves down 10 lines etc.

## Delete in Normal Mode

Say you want to delete a line. One way would be to hold backspace for like 30
seconds. It works, but it's not the easiest way. `d` will delete in vim, and
`dd` will delete the current line. The delete verb can be combined with motions
and numbers to create an action. To delete three lines you can do either `3dd`
or `d3j`. It probably feels weird at first, but give it a chance.

Another way of deleting is to use vim's "in", or "inside", specifier. Delete the
word your cursor is currently in with `diw` which means _delete in word_. Delete
everything within parentheses with `di(`. You can even delete a whole paragraph
with `dip`.

**Tip:** Delete a three lines with `3dd` or `d3j`. Delete the current word with
`diw`.

## ~/.vimrc

The vimrc file is where you put all your settings and keyboard mappings. This
file is empty when you first get started, but it will probably grow as you
evolve. Start out by putting something like this in there:

    syntax on
    set numbers

That will at least get you started. My vimrc includes my own keyboard commands,
different plugins to extend vim and settings like number of spaces in a tab.

Many people share their vimrc online in different ways. Also, make sure to
improve things you don't like in vim. Look things up and store the solution in
your vimrc. You will probably spend quite a lot of time in that file when
starting out.

## vimtutor

The last tip, and probably the most important: go through vimtutor. Open up your
terminal and launch `vimtutor`. It's vim's own beginner's guide which teaches
you the fundamentals in a very practical way. Just do it.

## Then what?

I've got
[my vimrc](https://github.com/AntonNiklasson/dotfiles/blob/master/vimrc) online.
You might find something useful. Also plugins might be of interest to you. I use
[Vundle](https://github.com/VundleVim/Vundle.vim) to handle my plugins.

Finally there's huge amounts of material on vim available on youtube.
[Check it out](https://www.youtube.com/results?search_query=vim).
