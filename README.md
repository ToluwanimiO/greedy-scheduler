# Goal-to-Timetable — Greedy Scheduler (Day 2)

A small, framework-independent TypeScript scheduling engine and Vitest baseline suite.

## Run the tests

Requires Node.js 20+.

```bash
npm install
npm test
```

## Files

- `src/domain/types.ts` — input and result contracts.
- `src/scheduler/greedyScheduler.ts` — greedy allocation and validation.
- `tests/fixtures/sample-input.ts` — reproducible example input.
- `tests/greedyScheduler.test.ts` — baseline behaviour tests.

## Algorithm

1. Validate input.
2. Intersect weekly availability with fixed commitments to create free windows.
3. Order tasks according to the selected strategy.
4. Allocate the earliest feasible session to each task, respecting deadline,
   weekly target, daily limit, splitting rules, and minimum session duration.
5. Return sessions, per-task allocations, reasons for incomplete work, and metrics.
6. Validate the resulting schedule and throw if a hard constraint was violated.

`balanced-progress` uses repeated one-session rounds, choosing the task with the
lowest completion ratio first (with priority and deadline as tie-breakers).
The other strategies finish allocating one task before moving to the next.

## Limitations

This is a heuristic, not a globally optimal solver. Its explanation for an
unscheduled task describes the constraint encountered by this algorithm; it
does not prove that no alternative schedule exists. Overnight sessions are
not supported. Time is represented as minutes after midnight and deadlines
must be within the Monday–Sunday scheduling week.
