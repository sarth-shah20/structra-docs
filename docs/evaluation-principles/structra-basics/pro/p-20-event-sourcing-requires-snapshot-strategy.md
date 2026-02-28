---
title: "P-20 Event Snapshots"
---

# P-20 Event Snapshots

What This Rule Checks
Structra checks that any design using event sourcing as its primary data model includes a snapshotting strategy.
Without snapshots, reconstructing the current state of an entity requires replaying its entire event history from
the beginning — which becomes increasingly expensive as that history grows.

What Event Sourcing Is
In event sourcing, instead of storing the current state of an entity (e.g., "User 42's balance is $150"), you store
every event that ever happened to it:

      "User 42 deposited $200."
      "User 42 withdrew $30."
      "User 42 deposited $50."
      "User 42 withdrew $70."


The current state ($150) is derived by replaying all events in order. The event log is the source of truth.

This gives powerful capabilities: full audit history, ability to replay events to fix bugs, ability to derive new read
models from historical data, time travel (what was the balance at 3 PM on March 15th?).

The Problem: Unbounded Event Logs

An entity that has existed for years may have thousands or millions of events. To answer "What is User 42's
current balance?", the system must load and replay all of those events. As the event count grows, this becomes
slower and slower.

Snapshots
A snapshot is a point-in-time capture of the derived state of an entity, stored alongside the event log. Instead of
replaying all events from the beginning, the system:

  1. Loads the most recent snapshot (e.g., "As of event #50,000: balance = $150").
  2. Replays only the events that occurred after that snapshot.


Snapshots are typically taken every N events (e.g., every 100 events) or on a schedule.

What the Design Must Specify

      How frequently snapshots are taken (every N events, every X minutes).
      Where snapshots are stored (same event store, separate store, cache).
      How the system decides when to use a snapshot vs full replay.




Applies to paid Pro and Enterprise evaluations.
