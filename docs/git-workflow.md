# Git Workflow

## Setup
* Install [git](https://git-scm.com/)
* Configure line endings based on your machine
  ```
  // Windows
  git config --global core.autocrlf true

  // MacOS or Linux
  git config --global core.autocrlf input
  ```
* Recommend connecting your local machine to [git via ssh][1]

## New feature
1. Branch off of the base branch you intend to merge back into
2. Commit and push, early and often
3. Create pull request when ready, request reviews, and merge via github not command line

```
// branch from main
git checkout main
git checkout -b feat/039/new-edit-form

// commit your changes, push to upstream origin for tracking
git add ./src/new-page.tsx
git add ./src/models.tsx
git status
git commit -m "feat(#039): created new page, defined API models"
git push origin -u feat/039/new-edit-form

// commit next set of changes
git add ./src/router.tsx
git status
git commit -m "feat(#039): wired up new page to router"
git push

// commit next set of changes
git add ./src/new-page.tsx
git status
git commit -m "feat(#039): add success and error toast"
git push
```

## Overlapping feature, merge conflicts
Often when working in a team you will have to work in the same area - such is the nature of a shared codebase and shared code. Opt for rebasing when you haven't yet pushed up a pull request. But use a merge commit if you are not comfortable with rebasing and resolving rebase conflicts. See the [golden rule of rebasing][2].
```
// Developer A
git checkout main
git checkout -b feat/A
git add ./src/router-file.tsx
git status
git commit -m "feat(B): created new page, updated router"

// Developer B
git checkout main
git checkout -b feature/B
git add ./src/router-file.tsx
git status
git commit -m "feat(B): created new page, updated router"
git push origin -u feat/B
// merged in changes to the router file

// Developer A is now behind on main, and will have merge conflicts on the router file
git checkout main
git pull main --rebase
git checkout feat/A
git rebase main
// continue on
```

## Learning resources
- https://learngitbranching.js.org/

[1]: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh
[2]: https://www.atlassian.com/git/tutorials/merging-vs-rebasing#the-golden-rule-of-rebasing