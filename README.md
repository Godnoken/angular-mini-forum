Live: https://dif-mini-forum.herokuapp.com/

If you don't want to register you can login with:<br>
Email; **admin@gmail.com**<br>
Password; **Admintest8!**

**Note:** database resets once a day & whenever I choose to restart it or push an update

## Run locally

npm install

---

**To run api with server logging and live development changes;**

npm run api<br>
+<br>
npm run serve<br>
+<br>
change<br>
public apiURL = "http://localhost:8080/api";<br>
to<br>
public apiURL = "http://localhost:8080";<br>

and you should automatically have the website running
otherwise access at localhost:4200

---

OR

---

**To run production build;**

npm run build<br>
+<br>
npm run start<br>
+<br>
change<br>
public apiURL = "http://localhost:8080";<br>
to<br>
public apiURL = "http://localhost:8080/api";<br>

and access at localhost:8080

---

## Bugs

Confirm password's input styling only reacts to errors when it first has successfully matched to password and then unmatched again.
As of right now, I do not know how to solve this in angular without doing a dirty fix.

---

Login validation only checks if email is valid *first* when the password provided in the input is longer than 3 characters due to how json-server-auth reports errors. Not sure how to solve it at this time.

---

**Fixed**<br>
If a user browses another users profile, reads in all their comments and then proceeds to click their own profile from the header - the information doesn't update even though url is changed.

**Solution**<br>
Profile component now listens after the end of the navigation URL changing and updates the user accordingly.

---

**Fixed**<br>
If an user quotes a comment and later that quoted comment gets deleted - the quote breaks. I will likely rewrite how quoting works to either enable the quoted comment to still exist after original comment is deleted
OR
Make sure that any comment that contains a quote also checks if the comment exists in the database

**Solution**<br>
I rewrote the quoting system. Now the a comment that quotes another comment will store the quoted comment's content. Although it makes the comment's object size larger - it helps with keeping the state of the quoted comment's text so it doesn't change whenever it's edited, which is something I really wanted to avoid. Also, obviously, the quoted comment will still exist even if the original one is deleted.

---

When browsing a profile and looking at the user's comments, clicking on one of the comments only navigate to the thread and its first page, not the correct page for that specific comment

## Wishbox

Since Angular has no way of dynamically changing "updateOn" prop on formControl, I can not implement passive/aggressive rules to user validation messages/styling without making some ugly fix.

---

**Fixed**<br>
Time on forum comments doesn't display pleasingly when it's between 00:00 and 01:00. It drops to 0:0, 0:5 and so on.

**Solution**<br>
Changed getDate() etc to 'toLocaleDateString'.

---

I have an enormous amount of styling that is duplicated in one way or another. Struggling to understand what the best practise is for structuring styling in angular. Will have to look into it and decide something to go with so I can remove loads of unecessary code.

---

**Partly fixed**<br>
Pretty much all styling in place is just thrown together without responsiveness in mind. Will redo it all when I have decided the above.

**Solution**<br>
Website is now more or less responsive from 1920x1080 down to the smallest mobile phones.

---

**Fixed** Right now all put/patch requests update the entire user/comment data. I want to fix this and will try to, but at this point I am not sure if it is possible with json-server-auth due to my lack of knowledge using backends or in this case a fake backend

**Solution** Changed all update requests to patch so it now only sends the data that have been changed by the user.
