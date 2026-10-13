---
title: "Can we build an AI agent that'll kill Udemy?"
date: "2026-09"
description: "Part 1 of Strands vs ADK. I built the same agent system twice, once in AWS Strands Agents and once in Google ADK, and compared tools, the agent loop, state, multi-agent, evaluation and deployment."
tags: ["AI", "AWS", "Python", "Google Cloud"]
series: "strands-vs-adk"
---

Lol, not a chance! But I'm glad that caught your attention.

I do want to build a replacement for it for myself, though.

Don't get me wrong, I love Udemy. I upskilled on Udemy, and it saw me through quite a few certifications. I still remember preparing for my very first cert with Stéphane Maarek.

But I'm in a different phase of life now, and long form video courses just aren't doing it for me anymore. I still use them when they're short and straight to the point. Maybe that's the ADHD speaking. Raise your hands if you can relate 🙋‍♀️

So I started thinking about what I'd want instead. I want to give a system some documentation and have it turn that material into a learn by doing curriculum.

What makes it different from the million other course generators out there?

Well, duh... it's ✨ agentic ✨.

And since I've been wanting to properly understand AWS Strands Agents and Google's Agent Development Kit (ADK), why not use this as an excuse to put both through their paces?

AWS and Google have done a fantastic job building their respective frameworks. The good thing is that you get a lot of capability out of the box. The bad thing, at least for me, is that there is a lot to cover.

So grab your coffee, blanket, or emotional support animal. Not sure why I put emotional support animal, but hey, why not.


In Part 1, we'll walk through Strands and ADK side by side, starting with a basic Hello World and gradually building up from there.

For Part 2, we'll take what we've learned and actually build the learning system.

So yes, we're *technically* building a low budget “Udemy replacement.”

## Before we write code: what are we actually comparing?

Rather than starting with a feature checklist, I want to answer a few basic questions about how each framework works:

1. How do I define an agent?
2. How does the agent interact with the model?
3. How are tools defined and connected?
4. Where does state live?
5. What control points do I have during execution?
6. How do multiple agents work together?
7. What does the framework provide for evaluation and observability?
8. And finally, how can I deploy what I've built?

We'll use those questions throughout the comparison.

And because I have a Computer Science degree and apparently cannot start a technical project any other way...

> **Note:** The examples in this series were written and tested with:
>
> * AWS Strands Agents: `1.55.1`
> * Google ADK: `2.9.0`
> * Python: `3.13`
>
> Pin them if you install both into one environment. Unpinned, `pip install strands-agents google-adk` quietly gives you `google-adk 1.14.1`, a whole major version back, because ADK caps OpenTelemetry lower than Strands does and pip backtracks through ADK to satisfy both. Pinning the OpenTelemetry pair too keeps that from coming back when either framework moves:
>
> ```text
> strands-agents==1.55.1
> google-adk==2.9.0
> opentelemetry-api==1.42.1
> opentelemetry-sdk==1.42.1
> ```
>
> Both frameworks are actively developed. `strands-agents 1.58.0` and `google-adk 2.11.0` were out by the time this went up, and APIs may change after the versions above. Everything here was checked against the installed packages on 27 September 2026, and the code in this post was assembled and run.

Every example below is in a companion repo: **[github.com/coolchigi/strands-vs-adk](https://github.com/coolchigi/strands-vs-adk)**. The code is in `part1-hello-world/`, with one numbered folder per section, from `01-hello-world` to `08-deployment`, and both frameworks side by side in each. It ships a `smoke_test.py` that parses every file, resolves every import, and builds every agent it can without calling a model, so you can confirm your setup works before spending a token.

## Hello World

Here's how they both do it:

| **Strands** | **ADK** |
|---|---|
| `pip install strands-agents` | `pip install google-adk` |
| One Python file | A folder with `agent.py` and `__init__.py` |
| `agent = Agent()` | `root_agent = Agent(...)` |
| `python hello-world.py` | `adk run course_agent` |
| Bedrock with Claude Sonnet 4.6 by default | Model named on the agent |

### Strands

The smallest Strands agent is this, and you run it with `python hello-world.py`:

```python
# hello-world.py
from strands import Agent

agent = Agent()

agent("Hello, world!")
```

Strands works with several model providers. By default it uses Claude Sonnet 4.6 on Amazon Bedrock, so you need AWS credentials and access to that model in Bedrock to run this. The [Strands Python quickstart](https://strandsagents.com/docs/user-guide/sdk/quickstart/python/) walks through setting that up. To use a different model, pass its id to `Agent` as `model="..."`.

[`Agent`](https://strandsagents.com/docs/api/python/strands.agent.agent/) is the main thing you work with in Strands. When we call it, it sends our message to the model, and once we add tools, it also runs them and passes their results back to the model.

### ADK

ADK expects a folder.

```text
course_agent/
├── __init__.py     # from . import agent
├── agent.py        # defines root_agent
└── .env            # GOOGLE_API_KEY="..."
```

ADK finds the agent by importing `agent.py` and reading a variable called `root_agent`:

```python
# course_agent/agent.py
from google.adk.agents import Agent

root_agent = Agent(
    model="gemini-flash-latest",
    name="root_agent",
    description="Says hello.",
    instruction="You are a helpful assistant.",
)
```

`Agent` and `LlmAgent` are the same class, so you can use either name.

Then we run it:

```bash
adk run course_agent
```

Or run `adk web` to chat with the same agent in your browser, with a trace of each call next to the chat.

### Putting the two side by side

A Strands agent is a Python object that we create and call in our own script. An ADK agent is a folder, and ADK's commands find it and run it for us. The [ADK Python quickstart](https://adk.dev/get-started/python/) walks through the full setup.

Once they're running, both work the same way:

```text
Your application
        │
        ▼
      Agent
        │
        ▼
      Model
        │
        ▼
    Response
```

That's Hello World on both frameworks. Next, we'll give the agent a tool, or "hands", as they're often called.

## Giving our agent a tool

Our learning system will eventually need to do things like retrieve documentation, create exercises, and keep track of what we've covered. For now, let's start with something much smaller.

We'll give the agent a function that returns a course topic:

```python
def get_course_topic() -> str:
    """Get the topic for the course."""
    return "Building AI agents"
```

Each framework has its own way of turning that function into a tool the agent can use.

Here's how they both do it:

| **Strands** | **ADK** |
|---|---|
| `@tool` on the function | Nothing on the function |
| `tools=[get_course_topic]` | `tools=[get_course_topic]` |
| Reads name, docstring, type hints, defaults | Reads name, docstring, type hints, defaults |
| Becomes a `DecoratedFunctionTool` | Wrapped in a `FunctionTool` |

### Strands

In Strands, we turn a simple Python function into a tool for the agent using the `@tool` decorator. The decorator uses the function's name, docstring, type hints and defaults to describe the tool. The name and docstring tell the model what the tool does, and the type hints tell it what to pass in. Then we pass it to the agent in `tools`:

```python
# hello-world.py
from strands import Agent, tool

@tool
def get_course_topic() -> str:
    """Get the topic for the course."""
    return "Building AI agents"

agent = Agent(tools=[get_course_topic])

agent("What topic should I teach?")
```

### ADK

In ADK, there's no decorator. We pass the plain function into `tools`, and ADK reads the same things (the name, docstring, type hints and defaults), then wraps it in a `FunctionTool` for us:

```python
# course_agent/agent.py
from google.adk.agents import Agent

def get_course_topic() -> str:
    """Get the topic for the course."""
    return "Building AI agents"

root_agent = Agent(
    name="course_agent",
    model="gemini-flash-latest",
    description="Helps create learning materials.",
    instruction="You help create learning materials.",
    tools=[get_course_topic],
)
```

We run it the same way as before, from the `02-tools` folder, this time with a question:

```bash
adk run course_agent "What topic should I teach?"
```

### Putting the two side by side

Both sides use the same plain Python function. The only difference is that Strands wants `@tool` on it, and ADK takes it as it is.

We've given the agent the function, but we never told it to call it. So when we ask "What topic should I teach?", who decides whether it gets called?

The answer is ... **the agent loop**.

## What runs the agent loop?

Here's how they both do it:

| **Strands** | **ADK** |
|---|---|
| `agent("What topic should I teach?")`<br><br>**Agent → Model → Tool → Model → Response** | `runner.run_async(...)`<br><br>**Runner → Agent → Model → Tool → Event → Runner → ...** |
| `Agent` runs the loop itself. | A separate `Runner` runs the loop and hands each step back to your code as an event. |

### Strands

We call the agent ourselves. It's the last line of `hello-world.py`:

```python
# hello-world.py
agent("What topic should I teach?")
```

From there, `Agent` runs the loop on its own. It goes back and forth between the model and your tools until the model gives a final answer.

The [Strands agent loop documentation](https://strandsagents.com/docs/user-guide/sdk/agents/agent-loop/) describes this as a repeating cycle:

```text
User input
    │
    ▼
  Model
    │
    ├── No tool call ───────► Final response
    │
    └── Tool call
          │
          ▼
        Tool
          │
          ▼
      Tool result
          │
          ▼
        Model
          │
          └──────────────► ...
```

The model decides whether it needs a tool. If it does, Strands executes the tool and adds the result to the conversation before calling the model again. If the model produces a final response instead, the loop ends.

Strands also gives us controls around that loop. We can set [limits for turns and tokens](https://strandsagents.com/docs/user-guide/sdk/agents/agent-loop/#invocation-limits), [cancel an invocation](https://strandsagents.com/docs/user-guide/sdk/agents/agent-loop/#cancellation), and attach [hooks](https://strandsagents.com/docs/user-guide/sdk/agents/hooks/) around different points in the agent lifecycle.

### ADK

In ADK, nothing in our code calls `root_agent`.

In Hello World, we typed `adk run course_agent` and the CLI called it for us. It built a `Runner`, created a session, wrapped what we typed in a `types.Content`, and passed it to `runner.run_async()`.

So to see the loop, we write those four steps ourselves.

The `agent.py` from the tools section doesn't change. The new code goes in `main.py`, next to the `course_agent` folder, and imports the agent from it:

```text
course_agent/
├── __init__.py
├── agent.py        # root_agent lives here, unchanged
└── .env
main.py             # everything below goes here
```

First, a session service, which keeps track of the conversation, and the `Runner` that runs the agent loop:

```python
# main.py
import asyncio

from course_agent.agent import root_agent
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types

session_service = InMemorySessionService()

runner = Runner(
    app_name="course_agent",
    agent=root_agent,
    session_service=session_service,
)
```

Creating a session and running the agent both have to be awaited, and `await` only works inside an async function, so the rest of the code goes in one:

```python
# main.py, continued
async def main():
    session = await session_service.create_session(
        app_name="course_agent",
        user_id="user",
    )
```

We create the session first because `run_async` needs its `session_id`. The `Runner` won't create one for us unless we build it with `auto_create_session=True`.

Then the message itself. ADK expects a `types.Content`, which is one message with a role saying who sent it, and a list of `types.Part`s holding what it says. Ours comes from the user, with one part holding our question:

```python
# main.py, still inside main()
    message = types.Content(
        role="user",
        parts=[types.Part(text="What topic should I teach?")],
    )
```

And now the loop itself. The last line, `asyncio.run(main())`, is what starts it all:

```python
# main.py, the rest of the file
    async for event in runner.run_async(
        user_id="user",
        session_id=session.id,
        new_message=message,
    ):
        if event.is_final_response():
            if event.content:
                print(event.content.parts[0].text)
            else:
                print(f"no content: {event.error_message}")


asyncio.run(main())
```

Before running it, export your key in the same terminal. `python main.py` doesn't read the `.env` file. Only the ADK commands that load your agent, like `adk run` and `adk web`, do that. Run it from `03-agent-loop`, the folder that holds both `main.py` and `course_agent`:

```bash
cd part1-hello-world/03-agent-loop
export GOOGLE_API_KEY="..."
python main.py
```

On Windows PowerShell, set the key with `$env:GOOGLE_API_KEY="..."`.

The important part of `main.py` is the `async for`.

`run_async()` hands us a stream of events while the agent runs. According to the [ADK event loop documentation](https://adk.dev/runtime/event-loop/), the `Runner` starts the agent, and each time the agent produces an event, the `Runner` saves it and passes it on before the agent carries on.

Simplified, the event loop looks like this:

```text
Application
    │
    ▼
  Runner
    │
    ▼
  Agent
    │
    ▼
  Model
    │
    ├── Tool call
    │      │
    │      ▼
    │     Tool
    │      │
    │      ▼
    │   Tool result
    │
    ▼
  Event
    │
    ▼
  Runner
    │
    ├── Process event
    ├── Save state
    └── Forward event
           │
           ▼
        Agent continues
```

An `Event` can represent things such as user input, an agent response, a tool call or result, or a state change. The `Runner` passes these events to the configured `SessionService`, which can apply state changes and add the event to the session history before the event is passed back to the application. See the [ADK event loop documentation](https://adk.dev/runtime/event-loop/) for the full flow.

The `else` in our loop is worth keeping. `is_final_response()` returns `True` for error events as well as answers, and an error event has no `content`. Without the `else`, a bad API key ends the run with `AttributeError: 'NoneType' object has no attribute 'parts'`, which says nothing about the key. With it, you get `no content: 400 INVALID_ARGUMENT ... API key not valid`, and the run ends on Google's own error instead.

### Putting the two side by side

So we already have our first significant difference.

![A pulse orbiting three components in Strands and five in ADK, showing the same tool call routed through each framework](https://raw.githubusercontent.com/coolchigi/strands-vs-adk/f76de7a90884d06160a597e9ba693927cdbfd24b/assets/part1/agent-loop-vs-runner.gif)

With Strands, the `Agent` owns the loop. We invoke the agent, and it manages the repeated model and tool calls for us.

With ADK, the `Agent` is one piece of a bigger setup. The `Runner` runs it, and every step comes back as an `Event` that the `Runner` saves and passes on to our code.

That shows up in the setup. Strands took one line. ADK took a session service, a runner, a session, and a message before anything reached the model.

That extra piece, the `Runner`, is going to matter when we look at where conversation state actually lives.

## Where does state live?

Here's how they both do it:

| **Strands** | **ADK** |
|---|---|
| `agent.messages`<br><br>`agent.state`<br><br>Invocation state | `session.events`<br><br>`session.state`<br><br>`SessionService` |
| **Conversation history**<br>Messages exchanged with the model | **Conversation history**<br>Events recorded in the session |
| **Agent state**<br>A key value store the agent, tools, and our code can read and write | **Session state**<br>A dictionary attached to the session |
| **Invocation state**<br>Temporary data available during one invocation | **State scopes**<br>Session, user, app, and temporary state |

### Strands

Strands keeps the conversation history on the `Agent`:

```python
from strands import Agent

agent = Agent()

agent("My name is Chigo.")

print(agent.messages)
```

The messages contain the conversation between the user and assistant, including tool calls and tool results.

Strands also has agent state:

```python
agent.state.set("course_topic", "Building AI agents")

print(agent.state.get("course_topic"))

agent.state.delete("course_topic")
```

`agent.state` is a key value store. We go through `get`, `set` and `delete`, because it isn't a real dictionary and `agent.state["course_topic"]` raises `TypeError`. Our code and our tools can both read and write it, and none of it reaches the model as part of the conversation.

The keys are strings we choose. The values have to be JSON serializable: strings, numbers, booleans, lists, dicts or `None`. Store a function as a value and Strands raises `ValueError`.

Strands also has invocation state. It lives for one call to the agent and disappears afterwards. Our tools, and the hooks we'll meet in the next section, can read it while that call runs, and the model never sees it.

The [Strands state documentation](https://strandsagents.com/docs/user-guide/sdk/agents/state/) covers these different types of state.

If we need state to survive beyond the current process, Strands provides session management. Sessions can persist agent state and conversation history using a configured session manager and storage backend. The [Strands session management documentation](https://strandsagents.com/docs/user-guide/sdk/agents/session-management/) covers the available options.

So for Strands, we can think about it like this:

```text
Agent
├── Conversation ──┐
├── State ─────────┤
│                  ▼
│               Session
│                  │
│                  ▼
│               Storage
│
└── Invocation state   (gone when the call ends)
```

### ADK

ADK keeps conversation history and state inside a `Session`.

A session represents a conversation between a user and an agent. It contains the events generated during that interaction and the state associated with the session.

The application works with a `SessionService` to create and retrieve sessions. We can put starting state in while we create one:

```python
session = await session_service.create_session(
    app_name="course_agent",
    user_id="user",
    state={"course_topic": "Building AI agents"},
)
```

Reading it back is what we'd expect:

```python
print(session.state["course_topic"])
# Building AI agents
```

So what about changing it once the session exists?

The obvious move is to assign straight into `session.state`. ADK's documentation has a warning section telling us not to. Modifying `session.state` on a session we pulled out of the `SessionService` bypasses the event history and won't reliably save. The [ADK state documentation](https://adk.dev/sessions/state/) covers what else goes wrong.

For anything an agent produces, we give the agent an `output_key`:

```python
researcher = Agent(
    name="researcher",
    model="gemini-flash-latest",
    instruction="Find information from official documentation and other reliable sources.",
    output_key="research",
)
```

Whatever `researcher` returns now lands in `session.state["research"]`, and the `Runner` saves it through an event, the same way it saves everything else.

`output_key` is how one agent's output becomes the next agent's input. We'll lean on that in Part 2.

Inside a tool, or a callback (those come up in the next section), the rule is the same. We write to `tool_context.state` or `callback_context.state`, and ADK records the change on the event as its `state_delta`, so it gets saved like everything else.

ADK also supports different state scopes, and the scope is the prefix on the key. `user:topic` is shared across every session for that user. `app:topic` is shared across the whole application. `temp:topic` lasts for the current invocation. No prefix means the key belongs to this session.

Whether any of that survives a restart depends on the `SessionService` we picked. `InMemorySessionService` holds everything in memory, so session, `user:` and `app:` state die with the process. `DatabaseSessionService` writes to our own database (install it with `pip install "google-adk[db]"`) and `VertexAiSessionService` to the managed one, and under either of those the same state comes back. `temp:` is never written to storage at all.

The [ADK Sessions documentation](https://adk.dev/sessions/) explains how sessions, events, and state work together.

So the ADK picture looks more like:

```text
SessionService
      │
      ▼
   Session
   ├── Events
   └── State
       ├── session
       ├── user
       ├── app
       └── temporary
```

When ADK processes an event, the `Runner` works with the `SessionService` to persist the event and apply any state changes before continuing execution.

### Putting the two side by side

The difference shows up when we write state:

![A write landing directly on agent.state in Strands, versus travelling through Event, Runner and SessionService in ADK](https://raw.githubusercontent.com/coolchigi/strands-vs-adk/f76de7a90884d06160a597e9ba693927cdbfd24b/assets/part1/where-state-lands.gif)

Strands exposes conversation history and agent state through the Agent, with session management available when we need persistence across invocations. ADK puts conversation history and session state behind a Session and SessionService.


## What control points do we have?

Here's how they both do it:

| **Strands** | **ADK** |
|---|---|
| `agent.add_hook(...)` | callbacks passed to `Agent(...)` |
| `BeforeInvocationEvent` | `before_agent_callback=...` |
| `AfterInvocationEvent` | `after_agent_callback=...` |
| `BeforeModelCallEvent` | `before_model_callback=...` |
| `AfterModelCallEvent` | `after_model_callback=...` |
| `BeforeToolCallEvent` | `before_tool_callback=...` |
| `AfterToolCallEvent` | `after_tool_callback=...` |
| `limits={"turns": 5}` | `RunConfig(max_llm_calls=200)` |

Both frameworks let us run our own code at different points while an agent is running.

### Strands

Strands uses hooks.

We create the agent and register a hook with `add_hook()`:

```python
from strands import Agent
from strands.hooks import BeforeModelCallEvent

def log_model_call(event: BeforeModelCallEvent) -> None:
    print("Calling the model")

agent = Agent()
agent.add_hook(log_model_call)
```

The hook receives a `BeforeModelCallEvent`, with details about the model call that's about to happen.

Strands provides hooks for different stages of an invocation, including model calls, tool calls, and the overall invocation. There are multi-agent events too. `BeforeNodeCallEvent` and `AfterNodeCallEvent` fire around each node in a graph, which we'll build in the multi-agent section.

For example, we can inspect a tool call before it runs:

```python
from strands.hooks import BeforeToolCallEvent

def inspect_tool_call(event: BeforeToolCallEvent) -> None:
    print(f"Calling: {event.tool_use['name']}")

agent.add_hook(inspect_tool_call)
```

The hook can also affect what happens next. Depending on the event, we can modify a request, prevent a tool call, retry a tool call, or modify a result.

Strands also lets us put limits on an invocation:

```python
agent(
    "Create a lesson about photosynthesis.",
    limits={"turns": 5, "total_tokens": 50_000},
)
```

`turns` caps how many times the agent loop goes round, where one turn is a model call plus any tools that run after it. `output_tokens` and `total_tokens` cap token spend across the whole invocation.

The [Strands hooks documentation](https://strandsagents.com/docs/user-guide/sdk/agents/hooks/) covers the available hook events and how to register them. The [agent loop documentation](https://strandsagents.com/docs/user-guide/sdk/agents/agent-loop/) covers invocation limits.

### ADK

ADK uses callbacks.

With ADK, we pass callbacks when defining the agent:

```python
def before_model_callback(callback_context, llm_request):
    print("Calling the model")

root_agent = Agent(
    name="course_agent",
    model="gemini-flash-latest",
    instruction="You help create learning materials.",
    before_model_callback=before_model_callback,
)
```

There are callbacks for different stages of execution, eight slots on the agent, and each one takes a function we write like the one above:

```text
before_agent_callback    after_agent_callback
before_model_callback    after_model_callback    on_model_error_callback
before_tool_callback     after_tool_callback     on_tool_error_callback
```

The callback functions receive context about the current execution. Depending on the callback, we can inspect or modify what is about to happen, or change the result before execution continues.

The [ADK callbacks documentation](https://adk.dev/callbacks/) covers the different callback types and what each one can do.

### Putting the two side by side

With Strands, we register hooks on the agent:

```python
agent.add_hook(log_model_call)
```

With ADK, we provide callbacks when defining the agent:

```python
Agent(
    ...,
    before_model_callback=log_model_call,
)
```

Strands takes hooks at construction too, with `Agent(hooks=[...])`.

The two frameworks also put execution limits in different places. Strands takes them on the call:

```python
agent(
    "...",
    limits={"turns": 5},
)
```

ADK puts them on the run instead, in a `RunConfig` we hand to the runner:

```python
from google.adk.agents import RunConfig

config = RunConfig(max_llm_calls=200)

async for event in runner.run_async(..., run_config=config):
    ...
```

Go past the cap and ADK raises `LlmCallsLimitExceededError`.

ADK sets `max_llm_calls` to 500 whether we ask for it or not. Strands leaves `limits` unset, so nothing is capped until we say so. The [ADK RunConfig documentation](https://adk.dev/runtime/runconfig/) covers the other run level settings, including streaming mode and artifact saving.

So if we want to add code around a model or tool call, both frameworks give us a place to do it. Strands calls them hooks and ADK calls them callbacks. On Strands we can add a hook to an agent we already have, and on ADK the callbacks go in when we build the agent.


## What if one agent isn't enough?

We've seen how both frameworks let us control what happens while an agent is running.

But what happens when one agent isn't enough?

For our learning system, we need a few different agents working together:

1. **Researcher**: Finds information from official documentation, blogs, and other reliable sources.
2. **Curriculum Builder**: Takes the research and turns it into a structured curriculum.
3. **Teacher**: Takes the curriculum and creates the actual lessons.
4. **Feedback Agent**: Reviews the work produced by the other agents and identifies what needs revision.

The basic flow looks like this:

```text
Researcher
     │
     ▼
Curriculum Builder
     │
     ▼
Teacher
     │
     ▼
Feedback
```

But the Feedback Agent isn't only checking the lessons.

It needs to check the research, curriculum, and lessons, and send each one back for another pass when something's wrong.

So how do Strands and ADK let us put agents together?

Here's how they both do it:

| **Strands**                                                        | **ADK**                                                                                      |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| An agent can be passed directly into another agent's `tools` list. | An agent can have other agents as `sub_agents`.                                              |
| `tools=[researcher]`                                               | `sub_agents=[researcher]`                                                                    |
| The parent agent can decide when to call another agent.            | A parent agent can delegate work to child agents.                                            |
| Graphs can connect agents into a defined workflow.                 | Graph based workflows can connect agents and other executable nodes into a defined workflow. |

### Strands

The simplest way to have agents work together in Strands is to give one agent another agent as a tool.

```python
from strands import Agent

researcher = Agent(
    name="researcher",
    system_prompt="Find information from official documentation, blogs, and other reliable sources."
)

curriculum_builder = Agent(
    name="curriculum_builder",
    system_prompt="Turn the research into a structured curriculum.",
    tools=[researcher],
)
```

Now `curriculum_builder` can decide when it needs the researcher.

Passing an Agent into `tools` converts it into a tool that takes one string and hands back the agent's answer. Anything more structured going in has to be squeezed through that one string.

We could continue this pattern by giving the `Teacher` access to the `Curriculum Builder`, and the `Feedback Agent` access to the `Teacher`:

```python
teacher = Agent(
    name="teacher",
    system_prompt="Create lessons from the curriculum.",
    tools=[curriculum_builder],
)

feedback = Agent(
    name="feedback",
    system_prompt="Review the research, curriculum, and lessons.",
    tools=[teacher],
)
```

But there's a problem with representing our workflow this way.

The relationship is controlled by the agent making the call. If `teacher` needs the curriculum, it can call `curriculum_builder`. If `feedback` needs the lesson, it can call `teacher`.

But we already know the order we want. We also know that Feedback needs to review different parts of the system and potentially trigger a revision.

For that, Strands provides **Graphs**.

A Graph lets us define the nodes and edges between agents ourselves. Agents become nodes, and the edges set the order they run in. An edge can also point back to an earlier node, which is how we get the feedback loop our system needs.

**Drop the `tools` wiring before doing this.** The graph replaces it. Leave both in and every node can run the whole chain below it again through its tools: Feedback calls Teacher, which calls Curriculum Builder, which calls Researcher. And when a model asks for the same agent twice at once, Strands refuses the second call while the first is still running:

```text
tool_name=<researcher>, tool_use_id=<...> | agent is already processing a request
```

That comes back to the calling model as a tool error, so it asks again. My run took ten minutes instead of ninety seconds and never finished. So the four agents below are the same as before, minus `tools=[...]`:

```python
researcher = Agent(name="researcher", system_prompt="...")
curriculum_builder = Agent(name="curriculum_builder", system_prompt="...")
teacher = Agent(name="teacher", system_prompt="...")
feedback = Agent(name="feedback", system_prompt="...")
```

Then the graph itself:

```python
from strands.multiagent import GraphBuilder

builder = GraphBuilder()

builder.add_node(researcher, "researcher")
builder.add_node(curriculum_builder, "curriculum")
builder.add_node(teacher, "teacher")
builder.add_node(feedback, "feedback")

builder.add_edge("researcher", "curriculum")
builder.add_edge("curriculum", "teacher")
builder.add_edge("teacher", "feedback")
```

Edges also take a condition, and that's how the graph gets its cycle:

```python
def lesson_needs_work(state) -> bool:
    feedback = state.results["feedback"].result
    return "revise the lesson" in str(feedback).lower()

builder.add_edge("feedback", "teacher", condition=lesson_needs_work)
```

The condition gets the graph state. `state.results` is a dict keyed by node id, and each entry's `.result` holds what that node returned. So the Feedback Agent's own output decides whether the edge back to `teacher` is taken.

Then we bound it and build it:

```python
builder.set_entry_point("researcher")
builder.set_max_node_executions(10)
builder.reset_on_revisit(True)

graph = builder.build()
```

Order matters here. `build()` takes a snapshot of the edges, so an edge added afterwards never makes it into the graph and the loop silently isn't there.

`set_max_node_executions()` caps the total number of node runs, which is what stops a feedback loop that never converges. Hit the cap and the graph ends with a `FAILED` status, so check the result.

`set_execution_timeout()` is the other way to put a boundary around it, with a time limit for the whole graph.

`reset_on_revisit(True)` clears a node's previous state when the graph comes back to it, so a second pass starts clean.

So our eventual workflow could look more like:

```text
Researcher
     │
     ▼
Curriculum Builder
     │
     ▼
Teacher
     │
     ▼
Feedback
  │     │     │
  ▼     ▼     ▼
Research Curriculum Lessons
  │     │     │
  └─────┴─────┘
        │
        ▼
     Revision
```

The important part is that the Graph describes the relationships between the agents instead of leaving the entire workflow to one agent's decisions.

### ADK

ADK gives us a parent and child relationship between agents.

An agent can contain other agents as `sub_agents`:

```python
from google.adk.agents import Agent

researcher = Agent(
    name="researcher",
    model="gemini-flash-latest",
    instruction="Find information from official documentation, blogs, and other reliable sources."
)

curriculum_builder = Agent(
    name="curriculum_builder",
    model="gemini-flash-latest",
    instruction="Turn the research into a structured curriculum.",
    sub_agents=[researcher],
)
```

Here, `curriculum_builder` is the parent and `researcher` is its child.

Whether the parent hands work to the child is the model's decision, the same as the Strands version. ADK's source says the `description` field is what the model reads to decide whether to delegate. So `sub_agents` sets up the hierarchy, and the model still picks the path through it.

ADK also supports collaborative workflows, where a coordinator agent works with a set of sub agents.

But our learning system has a defined sequence. In ADK 2.x that's a **graph based workflow**.

Same warning as the Strands side: drop the `sub_agents` wiring first. Leave `sub_agents=[researcher]` on `curriculum_builder` and the model can hand control to `researcher` in the middle of the run, so a node runs twice or the workflow stops early. So, four fresh agents:

```python
researcher = Agent(name="researcher", model="gemini-flash-latest", instruction="...")
curriculum_builder = Agent(name="curriculum_builder", model="gemini-flash-latest", instruction="...")
teacher = Agent(name="teacher", model="gemini-flash-latest", instruction="...", output_key="lesson")
feedback = Agent(name="feedback", model="gemini-flash-latest", instruction="...")
```

A graph is a list of edges, and each node can be an agent, a plain function, a tool, or another workflow:

```python
from google.adk import Workflow

root_agent = Workflow(
    name="learning_system",
    edges=[
        ("START", researcher, curriculum_builder, teacher, feedback),
    ],
)
```

Each edge lists nodes that run one after another, and one node's output becomes the next node's input.

That covers the sequence. Now the feedback loop.

ADK's graphs loop too. The [routes page](https://adk.dev/graphs/routes/) calls it a back-edge: a router node returns a route, and one of its routes points at an earlier node.

```python
from google.adk import Event, Workflow

rounds = {"n": 0}

def review(node_input: str, lesson: str) -> Event:
    rounds["n"] += 1
    if "revise the lesson" in node_input.lower() and rounds["n"] < 3:
        return Event(route="revise", output=f"Your lesson: {lesson}\nFeedback: {node_input}")
    return Event(route="done", output=node_input)

def finish(node_input: str) -> str:
    return node_input

root_agent = Workflow(
    name="learning_system",
    edges=[
        ("START", researcher, curriculum_builder, teacher, feedback, review),
        (review, {"revise": teacher, "done": finish}),
    ],
)
```

`review` is a plain Python function, and ADK is happy to make it a node. It reads what `feedback` said and picks the route. `revise` goes back to `teacher`, which is the cycle. Pass `output` on each route, because the event is what carries the text on. Leave it off and the next node gets `None`.

On the revise route, `teacher` only gets what `review` hands it, because an agent in a workflow only sees what the node before it passes along. ADK calls this `single_turn` mode. If `review` only sends the feedback, `teacher` never sees the lesson it's meant to fix, so it writes a brand new one.

To check, I had the feedback agent send back any lesson that didn't end with a quiz question. I ran it 3 times, and none of the rewritten lessons were about photosynthesis. One was about budgeting and the other 2 were about Python variables.

So we save the lesson and send it back with the feedback. `output_key="lesson"` on `teacher` puts its lesson in session state, and the `lesson` parameter on `review` reads it back, because ADK fills a function node's parameters from state. The revise route then hands `teacher` both.

Strands doesn't need any of this. When a graph comes back to a node, Strands hands it the original task along with the output of each node that points to it, which here means the plan and the feedback.

ADK checks one thing about that cycle when you build it: it has to pass through a routed edge. Wire `feedback` straight back to `teacher` and construction fails with "Unconditional cycle detected". What it doesn't do is stop a routed cycle. The same page says so plainly: "A graph cycle is not bounded automatically." The `rounds` counter is the only thing ending that loop, and it's ours.

ADK also has `LoopAgent`, one of its template workflows, which runs its sub agents over and over until one escalates or `max_iterations` runs out. Build one on 2.9.0 and it raises a `DeprecationWarning`:

```text
LoopAgent is deprecated in favor of Workflow and will be removed in a
future version. Workflow cannot yet be used as an LlmAgent sub-agent.
```

Python hides that warning unless the code runs as a script, under pytest, or with `-W default`, so plenty of people will never see it. The graph is the way forward either way.

So both frameworks declare the loop inside the graph. The difference is who stops it. Strands bounds it for you with `set_max_node_executions()`. ADK leaves the exit to your router.

![The Feedback Agent sending work back to the Researcher, Curriculum Builder or Teacher. Both frameworks keep the revision paths as edges inside the graph. Strands caps the loop with set_max_node_executions, and in ADK the router has to stop it](https://raw.githubusercontent.com/coolchigi/strands-vs-adk/f1ec74adebb07f8d605ef57302068f7e1445768e/assets/part1/revision-loop.gif)

If the Feedback Agent finds a problem, we still need to decide which agent gets another pass. On both frameworks, we write that routing into the graph ourselves, so it doesn't depend on one agent choosing to call another.

We'll come back to this in Part 2, because it decides how the Feedback Agent gets wired.

### Putting the two side by side

At this point, the two frameworks give us several ways to build the same system.

|                                                   | **Strands**          | **ADK**                   |
| ------------------------------------------------- | -------------------- | ------------------------- |
| Define a specialist agent                         | `Agent(...)`         | `Agent(...)`              |
| Give one agent another agent to call              | `tools=[researcher]` | `sub_agents=[researcher]` |
| Define a fixed workflow                           | Graph                | Graph based workflow      |
| Pass output between workflow steps                | Graph edges          | Edges, each node's output is the next one's input |
| Represent a feedback loop                         | Cyclic Graph, capped by `set_max_node_executions()` | Routed back-edge, stopped by our router |
| Let a coordinator choose which specialist to call | Agents as Tools      | Collaborative workflow    |

With Strands, we can start with agents as tools and move to a Graph when we need the workflow to be explicit. Strands' Graph pattern supports sequential execution, parallel branches, conditional paths, and feedback loops.

ADK's graph workflows cover the sequence and the loop. The loop just doesn't stop itself.

For our learning system, we'll use the four agents we just defined, with the Feedback Agent checking each stage's work and sending it back when something's wrong.

That gives us the structure we'll use when we build the actual system in Part 2.

## What does the framework provide for evaluation and observability?

We've now got agents, tools, state, hooks and callbacks, and ways to connect multiple agents.

Okay, but how do I know if it's actually working? There are two things I want us to look at:

1. **Evaluation:** Did the agent do what I expected?
2. **Observability:** What actually happened while it was running?

Here's how they both do it:

| **Strands** | **ADK** |
|---|---|
| Evaluators we import and run in code | Datasets we write to a file |
| `ToolCalled`, `Equals`, `Contains` | `tool_trajectory_avg_score`, `response_match_score` |
| `TrajectoryEvaluator` and other LLM judges | `final_response_match_v2`, `hallucinations_v1`, `safety_v1` |
| Metrics on the result object | OpenTelemetry to Cloud Trace |
| Bring your own dashboard | BigQuery Agent Analytics through the Agents CLI |

### Evaluating a Strands agent

Strands has something for both.

The [**Strands Evals SDK**](https://strandsagents.com/docs/user-guide/evals-sdk/quickstart/) covers several types of evaluation, including checking the final output, tool usage, trajectories, and using an LLM as a judge. It ships separately:

```bash
pip install strands-agents-evals
```

Watch the name. You install `strands-agents-evals` and you import `strands_evals`. Guessing the install name from the import gets you `strands-evals`, which is a squatted 4KB stub on PyPI by an unrelated author.


Let's start with something simple. Say we want to make sure our course agent actually uses the `get_course_topic` tool when it runs.

A deterministic evaluator can check that directly:

```python
from strands_evals.evaluators import ToolCalled

evaluator = ToolCalled(tool_name="get_course_topic")
```

The evaluator simply checks the agent's trajectory and determines whether that tool was called. The [deterministic evaluators documentation](https://strandsagents.com/docs/user-guide/evals-sdk/evaluators/deterministic_evaluators/) also includes evaluators such as `Equals`, `Contains`, `StartsWith`, and `StateEquals`.

But some things are harder to check with an exact rule.

For example, we might want to know whether the `Researcher` used the right tools in the right order and avoided unnecessary calls. We could write deterministic checks for specific sequences, but that becomes harder when there are multiple valid ways for an agent to complete a task.

Strands provides evaluators that can use a model to assess an agent's behaviour against a rubric. For example, the `TrajectoryEvaluator` lets us define what a good tool usage trajectory should look like:

```python
from strands_evals.evaluators import TrajectoryEvaluator

evaluator = TrajectoryEvaluator(
    rubric="""
    Evaluate the tool usage trajectory:
      1. Were the right tools chosen for the task?
      2. Were the tools used in a logical order?
      3. Were unnecessary tools avoided?

    Score 1.0 if the tools were used correctly and efficiently.
    Score 0.5 if the right tools were used but the sequence was suboptimal.
    Score 0.0 if the wrong tools were used or there were major inefficiencies.
    """,
    include_inputs=True,
)
```

The evaluator can then look at the agent's trajectory and score it against the rubric. This is useful when we're testing behaviour that is difficult to reduce to a single expected string.

The [Trajectory Evaluator documentation](https://strandsagents.com/docs/user-guide/evals-sdk/evaluators/trajectory_evaluator/) goes further into evaluating the sequence of actions and tool calls made during an execution.

We can also evaluate the actual response. Strands provides LLM based evaluators for things like helpfulness and correctness, where another model acts as the judge and scores the agent's response against the evaluation criteria.

That gives us two useful approaches:

```text
Deterministic evaluator
    ↓
"Did the agent call get_course_topic?"
    ↓
Exact check


LLM based evaluator
    ↓
"Did the agent use the right tools in a sensible way?"
    ↓
Judgement against a rubric
```

For our learning system, we could use deterministic checks for things we know should always happen, such as making sure the `Researcher` calls the documentation search tool. We could use an LLM based evaluator for things that require judgement, such as whether the research was actually useful.

### Evaluating an ADK agent

ADK comes at this from the dataset end. We describe the cases we want to test in a file, pick the metrics, and let ADK run the agent against them.

There are two file formats. A `.test.json` file holds a single agent interaction. An `.evalset.json` file holds multiple, longer sessions.

Evaluation isn't in the base install. Both routes below need the `eval` extra, and the CLI tells you so if you forget:

```bash
pip install "google-adk[eval]"
```

Then we can run a dataset from the command line:

```bash
adk eval course_agent tests/researcher.evalset.json
```

Or from pytest, which keeps evaluation in the test suite next to everything else. The test is async, so it also needs `pip install pytest pytest-asyncio`:

```python
import pytest

from google.adk.evaluation.agent_evaluator import AgentEvaluator


@pytest.mark.asyncio
async def test_researcher():
    await AgentEvaluator.evaluate(
        agent_module="course_agent",
        eval_dataset_file_path_or_dir="tests/researcher.evalset.json",
    )
```

ADK ships its own metrics. `tool_trajectory_avg_score` does an exact match on the tool call trajectory. `response_match_score` scores ROUGE-1 similarity against a reference response. For the judgement calls there's `final_response_match_v2`, `rubric_based_final_response_quality_v1`, `rubric_based_tool_use_quality_v1`, `hallucinations_v1`, and `safety_v1`.

So we end up with the same split Strands gave us. Exact checks for things with a right answer, LLM judged metrics for things that need an opinion.

The [ADK evaluation documentation](https://adk.dev/evaluate/) covers the datasets, the metrics, and the three ways to run them: the CLI, the `adk web` UI, and pytest.

#### A detour, because this is about to get confusing

Some of what I show you from here on isn't ADK.

Google also ships the **Agents CLI**, which its own docs describe as a way to "Build, evaluate, and deploy ADK agents with a single unified CLI." It's a separate tool that sits on top of ADK. It scaffolds a project, wires up telemetry, runs evaluations, and handles deployment.

I'm flagging it because it changes what we're comparing. The Strands Evals SDK is a library we import into our code. The Agents CLI is a project toolchain we run from a terminal. They overlap, and the metric names are different on each side.

An Agents CLI project comes with a default evaluation dataset at `tests/eval/datasets/basic-dataset.json`. We add our own cases and run them with:

```bash
agents-cli eval run \
  --dataset tests/eval/datasets/custom-dataset.json \
  --metrics final_response_quality,grounding
```

The command runs the agent against the dataset, collects the resulting traces and grades them against the metrics we selected. The [eval fix loop](https://google.github.io/agents-cli/guide/evaluation/#the-eval-fix-loop) in the Agents CLI documentation recommends running the evaluation, inspecting what failed, making a change, and running it again.

For our learning system, a test case could represent something we expect one of our agents to accomplish.

For example, we could give the `Researcher` a prompt like:

```json
{
  "prompt": "Research AWS S3 Lifecycle Management for a certification lesson."
}
```

We could then evaluate whether the `Researcher` produced useful, grounded research and used the tools we expect.

We could do something similar with the `Teacher`:

```json
{ "prompt": "Create a lesson on S3 Lifecycle Management from the provided curriculum." }
```

Here, we aren't looking for one exact lesson. There are many ways the Teacher could explain the topic correctly.

Instead, we care about whether the lesson meets the requirements we gave it. Does it accurately explain S3 Lifecycle Management? Does it stay grounded in the research? Does it cover the concepts required by the curriculum? Does the hands on exercise actually give the learner a chance to apply what they just learned?

Those are judgement calls, so a model has to make them.

The [Agents CLI metrics](https://google.github.io/agents-cli/guide/evaluation/#common-metrics-at-a-glance) include `general_quality`, `instruction_following`, `tool_use_quality`, `final_response_quality`, `grounding`, and `hallucination`, and `agents-cli eval metric list` prints the rest. The evaluation system also supports custom metrics, including rubric based evaluation using a judge model.

For example, we could define a rubric for the `Teacher` that asks the evaluator to judge whether the lesson accurately covers the concepts required by the curriculum, stays grounded in the research, and provides a meaningful hands on exercise.

We can also evaluate the agent's execution trace rather than looking only at its final response. [ADK's trajectory evaluation documentation](https://adk.dev/evaluate/#evaluate-trajectory-and-tool-use) covers evaluating the sequence of tools an agent used. The Agents CLI's [`tool_use_quality` metric](https://google.github.io/agents-cli/guide/evaluation/#common-metrics-at-a-glance) evaluates tool selection, parameter accuracy, and step sequence correctness.


That gives us a few different ways to test our system.

| Agent                  | What we could evaluate                                 | Example                                                                                            |
| ---------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| **Researcher**         | Tool usage, source quality and research relevance      | Did it search the right documentation and gather useful information for the topic?                 |
| **Curriculum Builder** | Instruction following, coverage and curriculum quality | Did it cover the required concepts and turn them into a useful learn by doing progression?         |
| **Teacher**            | Accuracy, grounding and instructional quality          | Does the lesson accurately teach the required concepts and give the learner a meaningful exercise? |
| **Feedback Agent**     | Feedback quality and correctness                       | Did it identify real issues without inventing problems?                                            |

The evaluation method depends on what we're trying to measure. A deterministic check works well for something concrete, such as whether the Researcher called a required tool. For a subjective check, like whether a `Teacher`'s lesson is accurate and useful, an LLM based evaluator can judge the result against a set of criteria.

### Evaluation vs Feedback

There is one distinction worth calling out: **the Feedback Agent is not the evaluation system.**

The Feedback Agent is part of our application that reviews the work produced by the other agents and identifies what should be revised.

Evaluation is part of our development workflow. It tells us whether the agents themselves are behaving the way we designed them to.

```text
Learning system

Researcher
    ↓
Curriculum Builder
    ↓
Teacher
    ↓
Feedback Agent
    ↓
Revision
    └────────→ relevant agent


Development workflow

Agent
    ↓
Evaluation
    ↓
Identify failure
    ↓
Improve agent
    ↓
Evaluate again
```

The learning system's loop improves the **content**, and the development loop improves the **agents**.


### Observing a Strands agent

Strands builds observability in, with metrics, logs and traces. The [Strands observability documentation](https://strandsagents.com/docs/user-guide/sdk/observability-evaluation/observability/) explains how these pieces fit together.

We can access execution metrics directly from the result returned by an agent:

```python
from strands import Agent
agent = Agent()
result = agent("Create a lesson about photosynthesis.")

print(f"Total tokens: {result.metrics.accumulated_usage['totalTokens']}")
print(f"Execution time: {sum(result.metrics.cycle_durations):.2f} seconds")
print(f"Tools used: {list(result.metrics.tool_metrics.keys())}")
```

So if our `Teacher` suddenly becomes much slower, we can look at the execution time and see which tools were used during that invocation. The [Strands metrics documentation](https://strandsagents.com/docs/user-guide/sdk/observability-evaluation/metrics/) also exposes information about token usage, tool calls, execution time, errors, and agent loop cycles.

Strands also collects local execution traces. We can inspect them through the result:

```python
result = agent("Create a lesson about photosynthesis.")

print(result.metrics.get_summary())
```

The summary gives us a view of the execution hierarchy, including the agent's cycles, model calls, and tool calls.

For deeper tracing, Strands uses [OpenTelemetry](https://strandsagents.com/docs/user-guide/sdk/observability-evaluation/traces/). A trace can show the model invocations and tool executions that happened during an agent run, including information such as model inputs and outputs, token usage, tool parameters, and execution time. The [Strands traces documentation](https://strandsagents.com/docs/user-guide/sdk/observability-evaluation/traces/) covers how those traces are structured.

### Observing an ADK agent

ADK also uses OpenTelemetry, with Google Cloud's observability tools sitting around it.

Suppose our `Teacher` fails an evaluation because the lesson isn't grounded in the research we provided. How do we understand what happened while that lesson was being created? Which tools did our agent use? Did a tool call fail?

To answer those questions, we need to see the execution itself.

#### Following an agent's execution

The Agents CLI uses OpenTelemetry to collect information about an ADK agent's execution. That information can be sent to [Cloud Trace](https://google.github.io/agents-cli/guide/observability/cloud-trace/), a Google Cloud service for recording and inspecting the operations that happen during a request.

A trace represents one execution. Within that trace, individual operations are recorded as spans. For an agent, those spans can include things such as model calls and tool executions.

You can think of it as moving from:

"What did the agent return?"

to

"What happened while the agent was producing that result?"

The [Cloud Trace documentation](https://google.github.io/agents-cli/guide/observability/cloud-trace/) walks through how the Agents CLI connects agent executions to Cloud Trace.


Let's try it.

We've been running our agents locally, so we'll start there. The Agents CLI works inside a project it creates for us, following its [getting started guide](https://google.github.io/agents-cli/guide/getting-started/):

```bash
agents-cli create my-agent
cd my-agent
agents-cli install
```

From inside it, we can run the agent and send the trace to Google Cloud at the same time:

```bash
agents-cli run "Create a lesson about S3 Lifecycle Management" \
  --otel-to-cloud
```

In case the name didn't give it away, the `--otel-to-cloud` flag sends the trace from our local run to Google Cloud.

Once the run finishes, we can open `GCP Console` → `Trace` → `Trace Explorer` and find the trace for that request.

The [View Traces section](https://google.github.io/agents-cli/guide/observability/cloud-trace/#2-view-traces) of the Agents CLI documentation shows where these traces appear in the Google Cloud Console.

There, we can inspect the operations that made up the run.

Instead of only seeing the lesson that came back from the Teacher, we can see the execution that produced it.

#### Local execution and deployed agents

Currently we are sending the agent's trace to GCP so we can inspect it there, but the agent is still running locally. When we eventually deploy our agent, the execution itself happens in Google Cloud. Cloud Trace is enabled by default for deployed agents.

Hopefully this diagram helps you make sense of where we're at:

```text
Local agent
  │
  │ run agent
  ↓ Our machine
  │
  │ send trace
  ↓
  Google Cloud
  │
  ↓ Trace Explorer
```

Our development workflow would look something like: 

```text
Run locally
↓
Inspect the trace
↓
Find something interesting
↓
Change the agent
↓ Run it again
```

When an execution fails, we can go from a failed evaluation case to the execution that produced it and inspect what the agent actually did. We're still missing something. A trace in itself can show us the operations that took place during the run, but how do we see the input and output associated with those calls?

#### Looking at prompts and responses

Prompt response logging is separate from Cloud Trace. The Agents CLI can record prompt and response information in Google Cloud Storage as `JSONL` and in a `BigQuery` completions table.

The [prompt response logging documentation](https://google.github.io/agents-cli/guide/observability/cloud-trace/#3-verify-prompt-response-logging-optional) shows how this works.

Now we have the execution from Cloud Trace, and the prompts and responses that went with it. That's enough to investigate one run in detail.

But our agents are going to run many times. The `Researcher` might run many times while gathering material, the `Teacher` could generate hundreds of lessons, and our evaluations could run across all of them.

We _**could**_ inspect each trace individually, but eventually we'd want to ask questions across all of those executions.

Which tools are being called most often? How many errors are we seeing? Are there patterns across our runs?

Those are SQL questions.

#### Looking across many executions

[BigQuery](https://cloud.google.com/bigquery) is Google's data warehouse. It gives us a place to store structured data and query it using SQL.

The Agents CLI provides **BigQuery Agent Analytics** for ADK based agents. It's an opt in plugin that records detailed agent events in an `agent_events` table, giving us a way to analyze our agent runs across many executions.

The [BigQuery Agent Analytics documentation](https://google.github.io/agents-cli/guide/observability/bq-agent-analytics/) explains how to enable it and configure the analytics plugin. When creating an ADK based project, we can include the plugin with the `--bq-analytics` flag:

```bash
agents-cli create my-agent \
  -d cloud_run \
  --bq-analytics
```

That flag adds the BigQuery Agent Analytics plugin to the generated project. The configuration lives in `app/agent.py`, where the plugin is added to the ADK application.

The plugin needs a dependency the base install does not carry, so the import fails with
`No module named 'google.api_core'` until we add the extra:

```bash
pip install "google-adk[bigquery-analytics]"
```

The generated configuration looks roughly like this:

```python
import os

from google.adk.apps import App
from google.adk.plugins.bigquery_agent_analytics_plugin import (
    BigQueryAgentAnalyticsPlugin,
    BigQueryLoggerConfig,
)

bq_config = BigQueryLoggerConfig(
    enabled=True,
    table_id="agent_events",
)

bq_analytics_plugin = BigQueryAgentAnalyticsPlugin(
    project_id=os.environ.get("GOOGLE_CLOUD_PROJECT"),
    dataset_id=os.environ.get("BQ_ANALYTICS_DATASET_ID"),
    table_id=bq_config.table_id,
    config=bq_config,
    location=os.environ.get("GOOGLE_CLOUD_LOCATION", "US"),
)

app = App(
    name="my-agent",
    root_agent=root_agent,
    plugins=[bq_analytics_plugin],
)
```

The important part here is the `BigQueryAgentAnalyticsPlugin`. We configure it with the Google Cloud project and dataset where the events should be stored, then add the plugin to our ADK application.

There are more configuration options available, including filtering which event types are recorded and controlling how larger pieces of content are handled. We don't need those for our example, so we'll keep the configuration simple.

Once events are being recorded, we can query them with SQL.

For example, we could look at tool calls and errors across our runs:

```sql
SELECT
  timestamp,
  event_type,
  JSON_VALUE(content, '$.tool') AS tool_name,
  JSON_QUERY(content, '$.args') AS tool_args,
  status,
  error_message
FROM `YOUR_PROJECT_ID.YOUR_AGENT_NAME_telemetry.agent_events`
WHERE event_type IN ('TOOL_STARTING', 'TOOL_ERROR')
ORDER BY timestamp DESC;
```

The docs' version of this query filters on `TOOL_COMPLETED` and uses `JSON_VALUE`, and its `tool_args` column comes back empty every time. The plugin only writes the arguments on `TOOL_STARTING` and `TOOL_ERROR` rows, and they're a JSON object, which `JSON_VALUE` returns as `NULL`. `JSON_QUERY` keeps them.

Now we're asking questions across our executions instead of opening traces one at a time.

The [example queries](https://google.github.io/agents-cli/guide/observability/bq-agent-analytics/#example-queries) in the documentation show other ways to analyze the recorded events, including token usage.

For our project, this gives us another way to investigate a failed evaluation. We can take the failed case, find the execution behind it, inspect what happened, and then look across our other runs to see whether the same problem is happening elsewhere.

### Putting the two side by side

At this point, we've looked at evaluation and observability separately. Here's how the pieces line up:

| | Strands | ADK |
|---|---|---|
| **Evaluation** | Evals SDK with deterministic and LLM based evaluators | `.test.json` and `.evalset.json` datasets, run with `adk eval` or pytest |
| **Evaluating tool use** | `ToolCalled`, trajectory evaluators | `tool_trajectory_avg_score`, plus `tool_use_quality` in the Agents CLI |
| **Observability** | Metrics, logs, local traces and OpenTelemetry | OpenTelemetry, with Cloud Trace and BigQuery wired up by the Agents CLI |
| **Investigating one execution** | Execution metrics and traces | Cloud Trace and prompt response logging (Agents CLI) |
| **Investigating many executions** | Metrics and external observability integrations | BigQuery Agent Analytics (Agents CLI) |

---

## And finally, how can I deploy what I've built?

We've been running everything locally so far.

How do we deploy?

Strands hands us a Python application and leaves the rest to us. ADK has a command for it, two in fact. `adk deploy` ships in `google-adk` itself with four targets: `agent_engine`, `cloud_run`, `docker` and `gke`. Google's Agents CLI is a separate tool that wraps a whole project around that, and it's the one I'll use below.

Here's how they both do it:

| **Strands** | **ADK** |
|---|---|
| We package the application | `agents-cli deploy` |
| We write the Dockerfile | The CLI builds the container |
| We provision the infrastructure | `-d cloud_run`, `agent_runtime` or `gke` |
| Lambda, Fargate, App Runner, EKS, EC2, AgentCore | Agent Runtime, Cloud Run, GKE |

### Strands: bring your own runtime

With Strands, our agent is part of a Python application. Once we're ready to deploy it, we need to package that application and decide where it should run.

One option is Docker. [The Strands Docker deployment guide](https://strandsagents.com/docs/user-guide/sdk/deploy/deploy_to_docker/) walks through containerizing a Strands agent so we can run the same application locally or on a cloud service.

For example, we could have a Dockerfile like this:

```dockerfile
FROM public.ecr.aws/docker/library/python:3.13-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080"]
```

`requirements.txt` needs `strands-agents`, `fastapi` and `uvicorn`. The `CMD` starts a web server, because the app below is a FastAPI app with nothing to do if you just run it with `python`.

The Dockerfile packages our Python application and its dependencies into an image. We can then run that image wherever we choose.

AWS gives us [several options](https://strandsagents.com/docs/user-guide/sdk/deploy/operating-agents-in-production/) such as Lambda, Fargate, App Runner, EKS, EC2, and Bedrock AgentCore.

If we choose the [Fargate deployment](https://strandsagents.com/docs/user-guide/sdk/deploy/deploy_to_aws_fargate/) for example, we would create a containerized FastAPI application. We'd use AWS CDK to create the Fargate infrastructure, build the Docker image, and deploy the service.

The application might look something like this:

```python
from fastapi import FastAPI
from pydantic import BaseModel
from strands import Agent

app = FastAPI()


class Question(BaseModel):
    question: str


@app.post("/ask")
def ask(body: Question):
    agent = Agent(system_prompt="You are a helpful certification teacher.")
    result = agent(body.question)
    return {"response": str(result)}
```

FastAPI gives our application an HTTP endpoint. The Strands agent is still the same agent we've been working with.

Two things in there are on purpose. The agent is built inside the handler, one per request. An `Agent` holds its own conversation, so a single shared one would mix every caller's messages together, and Strands refuses a second call while the first is still running. And `str(result)` is the text of the answer. `result.message` is the whole message, role and content blocks included.

From there, the deployment process depends on the AWS service we choose.

### ADK: deploy with the Agents CLI

With ADK, we have the Agents CLI from the evaluation section.

The CLI can create a project with a deployment target already configured. For example, if we want to deploy our agent to Cloud Run:

```bash
agents-cli create my-agent \
  -d cloud_run
```

The `-d cloud_run` option sets Cloud Run as the deployment target. The [Agents CLI deployment documentation](https://google.github.io/agents-cli/guide/deployment/) covers the available deployment targets, which currently include Agent Runtime, Cloud Run, and GKE.

Before deploying, we tell Google Cloud which project to use with Google's command line tool, `gcloud`. It comes with the [Google Cloud SDK](https://docs.cloud.google.com/sdk/docs/install-sdk), which you install separately:

```bash
gcloud config set project YOUR_DEV_PROJECT_ID
```

Then we deploy:

```bash
agents-cli deploy
```

`agents-cli deploy` knows where to deploy because we chose Cloud Run with `-d cloud_run` when we created the project.

For Cloud Run, the CLI builds a container from our source and deploys it as a Cloud Run service. We don't have to write a Dockerfile, the way we did for Strands.

We can list what's deployed with:

```bash
agents-cli deploy --list
```

The [Agents CLI command reference](https://google.github.io/agents-cli/cli/) also covers `--no-wait`, which starts a deployment and returns straight away, and `--status` for checking on one started that way.

An agent also needs cloud resources around it, like service accounts, permissions and storage for telemetry. For a basic deployment, `agents-cli deploy` on its own is enough. When we want to set those resources up ourselves, the Agents CLI has a separate command, `agents-cli infra`, and the [deployment documentation](https://google.github.io/agents-cli/guide/deployment/) explains how the two fit together.

So with ADK, the CLI takes care of more of the steps between our local project and the deployed application.

### Putting the two side by side

| | Strands | ADK |
|---|---|---|
| **What are we deploying?** | Our Python application containing the Strands agent | Our ADK project |
| **How do we deploy?** | Choose a deployment option and configure it for our application | `agents-cli deploy` |
| **Containerization** | We package the application when the chosen deployment uses containers | The CLI handles the container build for supported targets such as Cloud Run |
| **Infrastructure** | We configure the AWS resources needed by our chosen deployment | `agents-cli infra` can provision infrastructure when we need more control |
| **Deployment targets** | Lambda, Fargate, App Runner, EKS, EC2, AgentCore, and others | Agent Runtime, Cloud Run, GKE |

We started with:

> How do I define an agent?

And ended up with:

> How do I evaluate it, see what it is doing, and actually run it somewhere?

Here's what we have learned so far:

| **Question**          | **Strands**                          | **ADK**                                          |
| --------------------- | ------------------------------------ | ------------------------------------------------ |
| Define an agent       | `Agent(...)`                         | `Agent(...)`                                     |
| Connect tools         | `tools=[...]`                        | `tools=[...]`                                    |
| Run the agent         | `Agent` runs the loop itself         | A separate `Runner` runs the loop                |
| Store state           | Agent state, messages, sessions      | Sessions, events, state scopes                   |
| Add execution control | Hooks, `limits=` on the invocation   | Callbacks, `RunConfig` on the run                |
| Connect agents        | Agents as tools, Graphs              | Sub agents, collaborative workflows, Graphs      |
| Define workflows      | Graphs                               | Graph based workflows                            |
| Evaluate behaviour    | Strands Evals SDK                    | ADK evaluation tooling                           |
| Observe execution     | OpenTelemetry, metrics, logs         | OpenTelemetry, Cloud Trace, Google Cloud tooling |
| Deploy                | Your own infrastructure or AgentCore | Google Cloud deployment targets                  |


For our learning system, we now have enough pieces to make some decisions.

We know what our agents look like.

We know how they'll communicate.

We know where their state can live.

We know how to control execution.

We know how to connect them into a workflow with a feedback loop.

And we know how we'll eventually test, observe, and deploy the thing.

Now we can actually build it.

**That's Part 2.**


