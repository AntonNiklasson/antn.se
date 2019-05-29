---
title: System commands in vim
date: 2019-05-29
---


**TL;DR:** <kbd>Ctrl</kbd><kbd>R</kbd> + _any register_ inputs the contents of the register
in insert mode.

You can run system commands in vim using the _expression register_, available on `=`. Pasting from the
expression register involves writing an expression that evaluates to a string, and it
supports a function `system()` to run commands.

<kbd>Ctrl</kbd><kbd>R</kbd><kbd>=</kbd> then `system('ls -la')` inputs the
output of `ls -la` in your current vim buffer.

---

From time to time I find myself wanting to run some kind of system command and
capture the output in the file I am working on at the moment. For one-off
commands I usually go with something like `:!yarn add axios` from inside vim to
quickly install another dependency. That runs a system command "from" vim, but
the result is not captured in the buffer.

For a project I am working on at the moment I had a json file with about 100
posts. Each post had a set of attributes such as title, body, tags, excerpt
etc. But none of them had a unique id. So I set out to add a unique id to each
of the posts.

There is a command on a mac perfect for this: `uuidgen`.

I could see this change as a vim macro. I wanted to perform the following steps for each
post:

1. Find the title attribute
2. Insert a new line above that line
3. Add `id: "",`
4. Generate a unique id inside the quotes

The first few steps are quite straight forward:

1. `/"title":` to find the next occurance of the title attribute
2. `O` to insert a new line above it, then just add the id attribute

Generating the uuid involves a special kind of _register_ in vim known as the
_expression register_. Registers in vim are basically just variables. You can
read and write to and from them. The _expression register_ is a bit different
though: reading from the register involves you inputing a command that evaluates
to a string.

On top of that nugget of knowledge; <kbd>Ctrl</kbd><kbd>R</kbd> + _some register_
in insert mode inputs the contens from the register at the cursor position.

Here is how to run a system command in the _expression register_:

1. Enter insert mode
2. <kbd>Ctrl</kbd><kbd>R</kbd><kbd>=</kbd>
4. Type `system('<command-here>')` and press enter

<blockquote class="note">
<code>uuidgen</code> unfortunately ends with a backspace. I just backspace to
get rid of it in the macro, but I am sure there is an easier way ¯\_(ツ)_/¯
</blockquote>

---

Here is another practical use case for this:

I usually maintain a `components` folder in react projects. In this
folder I might create folders for each components, or just a single file per
component, depending on the current setup. When consuming these components I
want to make the imports slightly more compact by exporting each component by
their name from an `index.js` in the components folder. Then importing them is
a bit more comfortable:

```javascript
import { Button, Input, Modal } from '../components';
```

Last time I realised we needed an index file for our components we had about 25
components. So I decided to use this thing again. Worth noting is that we had
each component in a separate folder, with an index file exporting each component
as the default export.

The key command here is `ls -la src/components`:

1. Create `components/index.js`
2. Enter insert mode in that empty file
3. `Ctrl+R``=` and type `:system('ls -l src/components')`

This inputs the following:

```
total 8
drwxr-xr-x  4 anton  staff  128 13 May 10:34 ContentBlock
drwxr-xr-x  4 anton  staff  128 13 May 10:34 ExpandableMenuItem
drwxr-xr-x  4 anton  staff  128 13 May 21:23 Footer
drwxr-xr-x  8 anton  staff  256 13 May 21:23 Header
drwxr-xr-x  4 anton  staff  128 13 May 10:34 Hyperlink
drwxr-xr-x  4 anton  staff  128 13 May 10:34 Icon
drwxr-xr-x  4 anton  staff  128 13 May 10:34 Link
drwxr-xr-x  4 anton  staff  128 13 May 21:23 Logo
drwxr-xr-x  4 anton  staff  128 13 May 10:34 MainNavigation
drwxr-xr-x  4 anton  staff  128 13 May 10:34 MobileNavigation
drwxr-xr-x  4 anton  staff  128 13 May 10:34 Player
drwxr-xr-x  4 anton  staff  128 13 May 10:34 PostMeta
drwxr-xr-x  4 anton  staff  128 13 May 10:34 SearchInterface
drwxr-xr-x  6 anton  staff  192 13 May 21:23 Teaser
drwxr-xr-x  4 anton  staff  128 13 May 10:34 Tooltip
-rw-r--r--  1 anton  staff  907 13 May 21:23 index.js
```

At this point it is just a matter of cleaning up the file:

- `dd` the "total" line and the one with `index.js`
- Visual block mode (<kbd>Ctrl</kbd><kbd>v</kbd>) to get rid of the filesystem
metadata on each line

```
ContentBlock
ExpandableMenuItem
Footer
Header
Hyperlink
Icon
Link
Logo
MainNavigation
MobileNavigation
Player
PostMeta
SearchInterface
Teaser
Tooltip
```

So now I have each component name on a single line, I would like that to read

```
export { default as Component } from './Component'
```

That is doable with a macro. Record a macro as an isolated change on a single line,
and then use visual line mode and normal command to run that macro on the other
lines independantly. Here is what that macro could look like:

1. `qq` to record the macro to the `q` register
2. `0` to jump to the beginning of the line
3. `yiw` to yank to component name
4. `i` and type `export { default as `
5. `A` and type ` } from './';`
6. `hP` to paste the component name within the quotes

When you have the macro in place:

1. `V` to enter visual line mode
2. Select the other lines
3. `:norm @q` to run the `q` macro on each of the selected lines
