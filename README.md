## Bugs

Confirm password's input styling only reacts to errors when it first has successfully matched to password and then unmatched again.
As of right now, I do not know how to solve this in angular without doing a dirty fix.

---

Login validation only checks if email is valid *first* when the password provided in the input is longer than 3 characters due to how json-server-auth reports errors. Not sure how to solve it at this time.

---

If a user browses another users profile, reads in all their comments and then proceeds to click their own profile from the header - the information doesn't update even though url is changed.

## Wishbox

Since Angular has no way of dynamically changing "updateOn" prop on formControl, I can not implement passive/aggressive rules to user validation messages/styling without making some ugly fix.

---

Time on forum comments doesn't display pleasingly when it's between 00:00 and 01:00. It drops to 0:0, 0:5 and so on.

**Fixed**
Changed getDate() etc to 'toLocaleDateString'.

---

I have an enormous amount of styling that is duplicated in one way or another. Struggling to understand what the best practise is for structuring styling in angular. Will have to look into it and decide something to go with so I can remove loads of unecessary code.

---

Pretty much all styling in place is just thrown together without responsiveness in mind. Will redo it all when I have decided the above.

---

Right now all put/patch requests update the entire user/comment data. I want to fix this and will try to, but at this point I am not sure if it is possible with json-server-auth due to my lack of knowledge using backends or in this case a fake backend
