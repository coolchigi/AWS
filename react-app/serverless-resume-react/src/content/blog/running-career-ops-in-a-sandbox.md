---
title: "Running career-ops in a Sandbox"
date: "2026-09-03"
description: "How I put an AI job-search agent and all its scripts inside a Docker container so nothing runs on my laptop, wired up my Claude subscription, and found a git bug in the tool's own updater along the way."
tags: ["Docker", "Claude Code", "Devcontainer", "Git", "Sandbox"]
---

I was using [career-ops](https://github.com/career-ops-hq/career-ops). If you don't know what that is, you might be living under a rock. Honestly, I don't blame you. It's a job search tool that scrapes postings and scores them against your CV. You can also hand it a specific posting and have it score your CV against that one. Ofc you set it up once first.

Peel back a layer and it's really just a handful of Node scripts and a headless Chromium.

Now, I've been a little traumatized by the supply chain hacks of the last few years, so I wasn't thrilled about running a bunch of those scripts straight on my machine. So I started thinking about how to sandbox it.

My first idea was to keep Claude Code on my laptop and just point it at the container for the heavy scripts. But that doesn't really sandbox anything. Claude Code on the host still runs `node` and `npx` itself, so the scripts keep landing on my machine unless I hand-route every command through the container. And a few of career-ops' steps fire up the browser directly, which wouldn't work from the host anyway. Too fiddly. So I ran Claude Code inside the container too. Now the actual work stays in the box.

## Checking how Anthropic does it first

No point reinventing this, so I looked at what Anthropic already ships. They've got an official devcontainer for Claude Code, and it even comes with a firewall you can flip on that only lets the container talk to a set list of domains.

I passed on it. Partly because it's not really a security boundary anyway. Anthropic says as much themselves, if you run with the permission checks off a bad repo can still read whatever's in the container. That's fine by me, career-ops is my own code.

The dealbreaker was that firewall. career-ops scans a ton of job boards, and locking it to an allowlist would gut the scanner. So I left the devcontainer alone and started from the Dockerfile the repo already has. It's built on Microsoft's Playwright image, so Chromium, Go, and LaTeX came for free. It only needed Claude Code.

## Two changes to the Dockerfile

Ended up being just two. One drops Claude Code into the image. The other I only needed because the build wouldn't run at all otherwise (more on that below).

```diff
- COPY package.json package-lock.json* ./
- RUN npm install --no-audit --no-fund \
+ # the lockfile pins deps to a private registry the container
+ # can't log into, so skip it and use public npm
+ COPY package.json ./
+ RUN npm config set registry https://registry.npmjs.org/ \
+  && npm install --no-audit --no-fund \
   && npm install --save-exact playwright@1.62.1

+ # the actual point: put Claude Code in the image
+ RUN npm install -g @anthropic-ai/claude-code
```

That second edit is there because of the first thing that broke. The build died on `npm install` with an `E401`, authentication failed.

The committed `package-lock.json` pins every dependency to a private registry, and a clean container has no token for it, so npm gives up. Copying just `package.json` and pointing npm at the public registry gets around it. My real lockfile never changes.

## Wiring up my Claude subscription

Claude Code keeps its login in `~/.claude`. In a container that starts empty, and it gets wiped on every rebuild. So first you give it a home that sticks around. Two lines in compose:

```diff
  volumes:
    - .:/app
    - career-ops-node-modules:/app/node_modules
+   - career-ops-claude-config:/root/.claude
  environment:
+   - CLAUDE_CONFIG_DIR=/root/.claude
```

That's a named volume for `/root/.claude` plus `CLAUDE_CONFIG_DIR` pointing at it. The login lives in the volume now, so `./cops down` and `./cops rebuild` leave it alone.

Then you log in. Shell in and run `claude`:

```bash
./cops shell     # get into the container
claude           # it prints a login URL
```

First run it gives you a URL. Open it, sign in with your Claude plan, approve. If the container can't open a browser for you, and mine couldn't, it shows a code to paste back in the terminal. Now it's running on my normal Claude plan, not a pay-per-token API key.

> **Note:** there's a key-based path too. Drop `ANTHROPIC_API_KEY` in a `.env` and compose passes it through. I didn't bother.

## Running it with ./cops

The repo comes with a little wrapper, `./cops`, that shoves any command into the container. You almost never touch `docker compose` yourself.

```bash
./cops rebuild   # build the image (first run, or after Dockerfile edits)
./cops up        # start the container in the background
./cops doctor    # sanity check: node, playwright, chromium, go
./cops shell     # get a shell inside, then run `claude`

# or skip the shell and run one thing:
./cops claude -p "evaluate this posting: <url>"

./cops down      # stop it
```

Anything `./cops` doesn't recognize just runs inside the box, so `./cops node --version` or `./cops npm test` work too.

> **Gotcha:** if `./cops up` fails with `mkdir /host_mnt/.../Documents: operation not permitted`, that's not Docker. My project lives in `~/Documents`, which macOS keeps locked down until you let an app in. Give Docker access to the Documents folder in Privacy & Security, then restart Docker.

## The bug worth the trip: two git flags that hate each other

One more thing broke. This one I'm actually glad about.

career-ops updates itself. I ran the update, and partway through it committed and then bailed: "files may be staged but not committed." The files it tripped on were my `Dockerfile` and `docker-compose.yml`. The two I'd just edited to build the sandbox.

The updater goes out of its way to protect files you've changed yourself. It saw my edits and flagged those files to leave alone. It does that with a git pathspec: `:(exclude)Dockerfile`.

Trouble is, that pathspec got passed to `git add` with `--literal-pathspecs` on. That flag makes git read every path as a literal filename, so it ignored the "skip this" part and just went looking for a file called `:(exclude)Dockerfile`. There isn't one.

```
$ git --literal-pathspecs add -f -- :(exclude)Dockerfile
fatal: pathspec ':(exclude)Dockerfile' did not match any files
```

git chokes, and one bad path takes the whole commit down with it.

Neither flag is wrong on its own. `--literal-pathspecs` keeps git from treating a filename with glob characters as a pattern. `:(exclude)` is exactly the kind of syntax it turns off. They just hadn't been pointed at each other before.

The fix sorts out which files to keep before any of it reaches `git add`, and hands git plain filenames with none of the `:(exclude)` syntax mixed in. Tests pass, and I sent it upstream, issue first, then a PR from my fork.

## What I did once the box worked

Two things caught me off guard.

I aimed it at a job I wasn't sure I had a real shot at. It went through my CV, pulled out the AI infra work I already had in there, and was blunt about the two spots where I'd probably get dinged. That's what I wanted from it.

Then I asked it to add a side project to my resume. It wouldn't go pull the details from another folder on my machine, even though it easily could have. Its whole rule is that it only writes what I've confirmed. So I pointed it at the repo, it drafted from what was there, and it didn't touch my CV until I said okay.
