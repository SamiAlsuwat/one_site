# One Site — All My Courses

A simple profile page that lists all my courses so students can pick one and open it.

## Add or edit courses

Open `courses.js` and edit the `PROFILE` and `COURSES` sections. Each course looks like:

```js
{
  title: "Intro to Programming",
  code: "CS101",              // optional
  description: "Basics of programming in Python.", // optional
  category: "Computer Science", // optional – used for filter buttons
  url: "https://link-to-the-course",
},
```

## View locally

Open `index.html` in a browser.

## Publish (GitHub Pages)

Repository **Settings → Pages → Build and deployment**, choose **Deploy from a branch**,
select the branch and `/ (root)`, then save. The site will be live at
`https://<username>.github.io/one_site/`.
