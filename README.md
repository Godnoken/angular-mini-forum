# MiniForum

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Bugs

Confirm password's input styling only reacts to errors when it first has successfully matched to password and then unmatched again.
As of right now, I do not know how to solve this in angular without doing a dirty fix.

---

Login validation only checks if email is valid *first* when the password provided in the input is longer than 3 characters due to how json-server-auth reports errors. Not sure how to solve it at this time.

## Wishbox

Since Angular has no way of dynamically changing "updateOn" prop on formControl, I can not implement passive/aggressive rules to user validation messages/styling without making some ugly fix.

---

Time on forum comments doesn't display pleasingly when it's between 00:00 and 01:00. It drops to 0:0, 0:5 and so on.

---

I have an enormous amount of styling that is duplicated in one way or another. Struggling to understand what the best practise is for structuring styling in angular. Will have to look into it and decide something to go with so I can remove loads of unecessary code.

---

Pretty much all styling in place is just thrown together without responsiveness in mind. Will redo it all when I have decided the above.

