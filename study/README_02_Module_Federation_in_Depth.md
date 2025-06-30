# Study Guide 2 – Module Federation In-Depth

> _Mock interview style – Q&A with real code excerpts._

---

❓ **What exactly _is_ Module Federation and why did you choose it?**

💡 Module Federation is a feature of **Webpack 5** that lets one build (the _remote_) expose pieces of its bundle so that another build (the _host_) can load them **at runtime** – no npm publish, no re-deploy of the host.  
This pattern fits nicely when you have feature teams or want independent deployments. Here the host shows the overall shell (navigation, auth, theme) while the remote focuses on the music library UI.

---

### 1. Declaring a Remote

In the **remote** (`music-library`) I expose the root React component.

```25:45:music-library/webpack.config.js
    new ModuleFederationPlugin({
      name: 'music_library',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
      shared: { 
        react: { singleton: true, requiredVersion: '^18.0.0' }, 
        'react-dom': { singleton: true, requiredVersion: '^18.0.0' } 
      },
    }),
```

* **`name`** – how other builds reference this container.
* **`filename`** – the generated manifest eagerly loaded by the host.
* **`exposes`** – a map of virtual paths to real files. Here _`musicLibrary/App`_ points to `src/App.tsx`.

---

### 2. Consuming the Remote

The **host** (`main-app`) lists that remote under `remotes`:

```46:56:main-app/webpack.config.js
    new ModuleFederationPlugin({
      name: 'mainApp',
      remotes: {
        musicLibrary: `music_library@${musicLibraryUrl}`,
      },
      // …shared omitted
    }),
```

Webpack replaces every `import('musicLibrary/App')` with an **async chunk request** that downloads `remoteEntry.js`, looks up the exposed module graph, grabs the code for `./App` and resolves the promise with the module export.

---

### 3. Type-Safe Dynamic Imports (bonus)

Because this repo uses **TypeScript + Babel**, the string-based dynamic import still returns `any`. I documented the pattern but kept the code simple for the task.

---

❓ **How do you avoid shipping React twice?**

💡 Both configs declare `react` & `react-dom` as **singleton** shared deps (see snippets). Webpack therefore ensures the first copy wins and subsequent loads re-use it, saving bundle size and avoiding version conflicts.

---

❓ **What about version mismatches?**

💡 The `requiredVersion: '^18.0.0'` acts like a _peerDependency_ check – if the host tries to consume a remote built with React 19 (future) the console warns at runtime and falls back to the host's copy.

---

❓ **How does local versus production URL switching work?**

💡 At the very top of the host's config I compute `musicLibraryUrl`:

```5:11:main-app/webpack.config.js
const isProd = process.env.NODE_ENV === 'production';
const musicLibraryUrl = isProd 
  ? process.env.MUSIC_LIBRARY_URL || 'https://music-library-prod.vercel.app/remoteEntry.js'
  : 'http://localhost:3003/remoteEntry.js';
```

So in CI I set the env var, but _locally_ I just start both servers and everything wires up automatically.

---

That covers the nuts & bolts of Module Federation. Next up: **authentication & protected routing**. 