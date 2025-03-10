---
title: "Patch an NPM dependency with yarn"
description:
  "Fix a bug in a third party dependency without waiting for it to be approved
  and published by the maintainers."
publishDate: "26 May 2022"
updatedDate: "26 May 2022"
coverImage:
  src: "./cover.jpg"
  alt: "A bug"
tags: ["javascript", "yarn", "nodejs"]
---

<h1>H1</h1>
<h2>H2</h2>
<h3>H3</h3>
<h4>H4</h4>
<h5>H5</h5>
<h6>H6</h6>

When you have a bug in a third party dependency, usually you have a limited set
of options to fix it.

You can modify directly the local code of the dependency and make a new build.
This works if it's a critical bug and you have to fix it as soon as possible.
But, this is not the best option, because you'll lose the fix on the next `yarn`
or `npm` install. Also, you won't be able to share the fix with your team.

Another option is to fork the package, fix the bug and create a pull request. At
this point, you can update your project dependencies and use your fork until the
maintainers of the package approve it and publish a new version.

```json
"dependencies": {
  "buggy-package": "your_user/buggy-package#bugfix"
}
```

This looks like a good option, now your team members will get the fix when they
will update the project dependencies. The downside is that you'll have to
maintain the fork and make sure it's up to date.

Do we have a better option? Yes, we have. We can use the `yarn patch` command
that was introduced in yarn v2.0.0. This allows you to instantly make and keep
fixes to your dependencies without having to fork the packages.

Let's take as an example the `remix-run` package. During the development I found
an issue with the session storage. I opened a
[pull request](https://github.com/remix-run/remix/pull/3113) to fix it, then I
patched the package directly in the project using the command:

```bash
  yarn patch @remix-run/node@npm:1.5.1

➤ YN0000: Package @remix-run/node@npm:1.5.1 got extracted with success!
➤ YN0000: You can now edit the following folder: /private/var/folders/xm/qntd4h_97zn6w88tc95bsvxc0000gp/T/xfs-bfc9a229/user
➤ YN0000: Once you are done run yarn patch-commit -s /private/var/folders/xm/qntd4h_97zn6w88tc95bsvxc0000gp/T/xfs-bfc9a229/user and Yarn will store a patchfile based on your changes.
➤ YN0000: Done in 0s 68ms
```

Once the package is extracted, we can open the created folder and make our
changes there. One drawback is that you have to modify the production code,
which might be minified and hard to debug. In my case was a simple change to the
`fileStorage` module.

The next step is to commit the patch using the command displayed earlier in the
console

```bash
yarn patch-commit -s /private/var/folders/xm/qntd4h_97zn6w88tc95bsvxc0000gp/T/xfs-bfc9a229/user
```

At this point we should see the following change in `package.json`

```json
"resolutions": {
    "@remix-run/node@1.5.1": "patch:@remix-run/node@npm:1.5.1#.yarn/patches/@remix-run-node-npm-1.5.1-51061cf212.patch"
  }
```

and in `.yarn/patches` you'll find the patch file.

The benefits of using this approach are that the patch can be reviewed by your
team and it doesn't require additional work to be applied compared to the fork.
This should be used for critical fixes, if you need a new feature I would
suggest to fork it instead. Also, do not forget to open an issue and create a
pull request in the actual package.
