# Study Guide 1 – Project Overview & Architecture

> **Format**: _Mock interview – the interviewer (❓) asks, you (💡) answer._

---

❓ **Can you give me a bird-eye view of this assignment?**

💡 _Absolutely!_ The repo actually holds **two fully-fledged React apps** that talk to each other at runtime:

1. **`music-library`** – a standalone micro-frontend that exposes its root `<App />` component.
2. **`main-app`** – the host (sometimes called _shell_) that boots first, then pulls the remote UI over HTTP and mounts it.

Because both live inside the same mono-repo I can start them locally with two commands (`npm start` in each folder) yet deploy them independently – the secret sauce is **Webpack Module Federation** (see Guide #2 for a deep-dive).

---

❓ **Where inside the codebase is that relationship wired up?**

💡 In the host's Webpack config you can spot the `ModuleFederationPlugin` that declares a _remote_ called `musicLibrary`.

```47:60:main-app/webpack.config.js
    new ModuleFederationPlugin({
      name: "mainApp",
      remotes: {
        musicLibrary: `music_library@${musicLibraryUrl}`,
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        "react-dom": { singleton: true, requiredVersion: '^18.0.0' },
        "react-router-dom": { singleton: true },
      },
    }),
```

* **`name`** – how the container (host) introduces itself.
* **`remotes`** – key-value where _key_ is the import alias (`musicLibrary`) and _value_ is the URL of the generated `remoteEntry.js` file.
* **`shared`** – prevents duplicate React copies by enforcing singletons.

---

❓ **So what happens at runtime?**

💡 On start-up the host requests `remoteEntry.js` from the URL above. Webpack's runtime then sets up an **asynchronous `import()`** boundary. Inside the host code I can now do something like

```js
import('musicLibrary/App').then(({ default: RemoteApp }) => {
  // mount it just like any other React component
});
```

`RemoteApp` is rendered exactly where I place it, but its code lives in the other repo/build – pretty cool!

---

❓ **How is the mono-repo structured?**

💡 Very flat & predictable:

```text
Music App/
├── main-app/          # Host (port 3000)
└── music-library/     # Remote (port 3003)
```

Each sub–project carries its own `webpack.config.js`, `tailwind.config.js`, `package.json` and has a separate `public/` folder – so they can be deployed individually.

---

❓ **Why two `bootstrap.js` files?**

💡 When using Module Federation + React 18 I like to keep the **root render** in `bootstrap.js`. That way Webpack can wrap it in an async boundary without tripping over React fast-refresh. Both apps therefore import `./bootstrap` _dynamically_ from `index.js`:

```1:15:main-app/src/index.js
import('./bootstrap');
```

Same pattern inside the `music-library`.

---

❓ **Anything special about the deployment?**

💡 Both apps are deployed to Vercel. The live host references the **production** remote URL while in development the env var falls back to `localhost:3003` (see the first few lines in the Webpack config excerpt above). This means I can:

* Test changes to the remote locally **without touching** the host.
* Ship the remote independently – the host will automatically pull the new version once deployed.

---

That's the high-level picture. The next guides zoom into specific topics like Module Federation details, state management, authentication & fancy Tailwind UI. 