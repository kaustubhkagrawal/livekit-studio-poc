# core

This should have all the core logics and will be shared across various features built on top of this including Studio and so on.

- Global State.
- Event Bus
- Plugin Registrar.
- Interfaces
- Conference core Logic

If we shift to Redux, this will contain the root reducer which each plugin can inject their own slice into. Currently using jotai for simplicity

Plugins are only used for building features in isolation and making them easy to debug.

Conference Life Cycle:
INIT -> Plugin Registrations -> (Preview Page Device check and permissions) -> Waiting Room -> Conference Page -> Thanks Page

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test core` to execute the unit tests via [Vitest](https://vitest.dev/).
