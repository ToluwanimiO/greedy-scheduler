
# Weighted Scheduling Optimization Model

## Objective

Find a feasible weekly timetable that maximizes a weighted score across
deadline success, work coverage, priority alignment,
and preference satisfaction.

## Decision variables

For each task i and candidate time interval j:

- x[i,j] = 1 if interval j is assigned to task i; otherwise 0.
- x[i,j] = 0 also represents an interval left unused.

The timetable is represented by the resulting ordered task intervals.

## Hard constraints

Every candidate schedule must satisfy:

1. Sessions fit entirely within user availability.
2. Sessions do not overlap each other or fixed commitments.
3. No session finishes after its task's firm deadline.
4. Total scheduled task time does not exceed its weekly target.
5. Daily scheduled time does not exceed the task's daily limit.
6. Unsplit tasks are scheduled as one continuous session.
7. Every session meets the task's minimum session duration.
8. Sessions start and finish on the same day.

Invalid schedules are rejected, not merely penalized.

## Objective metrics

Each metric is normalized to [0, 1].

D — Deadline success:
The priority-weighted proportion of deadline-bearing tasks completed
by their deadlines. Tasks without deadlines are excluded.

W — Work coverage:
Total valid scheduled minutes / total requested minutes.

P — Priority alignment:
Sum(priority * scheduled minutes) /
(maximum task priority * total scheduled minutes).

F — Preference satisfaction:
Scheduled minutes satisfying all specified soft preferences /
total scheduled minutes.

Defined edge cases:
- No deadline-bearing tasks: D = 1.
- No requested work: W = 1.
- No scheduled work: P = 0 and X = 1.
- No preferences: F = 1.
- Preferences exist but no work is scheduled: F = 0.

## Initial weights

Score = 100 * (0.40D + 0.30W + 0.20P + 0.10F)

Weights are initial design hypotheses, not universal constants.
All metrics must be calculated using the same definitions for every
scheduler being compared.

## Search and limitations

The optimizer searches candidate schedules and returns the highest-scoring
feasible candidate it evaluates.

An exhaustive search guarantees the best score only if it explores the
entire defined candidate space. For larger problems, the search may need
branch-and-bound, constraint programming, or other optimization techniques.

The first experiment uses small test cases. Results depend on the chosen
time granularity, metric definitions, weights, and search limits.
