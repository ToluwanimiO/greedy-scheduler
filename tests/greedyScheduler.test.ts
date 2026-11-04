import { describe, expect, it } from "vitest";
import type { SchedulingInput, Task } from "../src/domain/types";
import { generateGreedySchedule, validateSchedule } from "../src/scheduler/greedyScheduler";
import { sampleInput } from "./fixtures/sample-input";

function minimalInput(tasks: Task[], minutes: number, strategy: SchedulingInput["preferences"]["strategy"] = "priority-first"): SchedulingInput {
  return {
    goals: [{ id: "g", title: "Goal" }],
    tasks,
    availability: [{ day: 1, windows: [{ startMinute: 540, endMinute: 540 + minutes }] }],
    fixedCommitments: [],
    preferences: { strategy },
  };
}

const task = (overrides: Partial<Task> = {}): Task => ({
  id: "task",
  goalId: "g",
  title: "Task",
  weeklyTargetMinutes: 60,
  priority: 3,
  splittable: true,
  minSessionMinutes: 30,
  ...overrides,
});

describe("generateGreedySchedule", () => {
  it("produces a valid schedule for the representative fixture", () => {
    const result = generateGreedySchedule(sampleInput);
    expect(validateSchedule(sampleInput, result.sessions)).toEqual([]);
    expect(result.metrics.hardConstraintViolations).toBe(0);
    expect(result.metrics.totalScheduledMinutes).toBeLessThanOrEqual(600);
    expect(result.allocations).toHaveLength(4);
  });

  it("allocates a task that fits exactly in the available window", () => {
    const input = minimalInput([task({ weeklyTargetMinutes: 60, minSessionMinutes: 60 })], 60);
    const result = generateGreedySchedule(input);
    expect(result.sessions).toHaveLength(1);
    expect(result.sessions[0].startMinute).toBe(540);
    expect(result.sessions[0].endMinute).toBe(600);
    expect(result.allocations[0].status).toBe("complete");
  });

  it("does not overlap a fixed commitment", () => {
    const input = minimalInput([task({ weeklyTargetMinutes: 120, minSessionMinutes: 30 })], 180);
    input.fixedCommitments = [{
      id: "meeting", title: "Meeting", days: [1], startMinute: 600, endMinute: 660,
    }];
    const result = generateGreedySchedule(input);
    expect(result.sessions.every((s) => s.endMinute <= 600 || s.startMinute >= 660)).toBe(true);
    expect(validateSchedule(input, result.sessions)).toEqual([]);
  });

  it("leaves an unsplittable task unscheduled if no window can fit it", () => {
    const input = minimalInput([
      task({ weeklyTargetMinutes: 90, minSessionMinutes: 90, splittable: false }),
    ], 60);
    const result = generateGreedySchedule(input);
    expect(result.sessions).toHaveLength(0);
    expect(result.allocations[0].status).toBe("unscheduled");
  });

  it("enforces a firm deadline", () => {
    const input = minimalInput([
      task({
        weeklyTargetMinutes: 60,
        minSessionMinutes: 30,
        deadline: { day: 1, minuteOfDay: 570 },
        splittable: false,
      }),
    ], 120);
    const result = generateGreedySchedule(input);
    console.log(result)
    expect(result.sessions).toHaveLength(0);
    expect(result.allocations[0].remainingMinutes).toBe(60);
  });

  it("does not allocate more than a task's daily limit", () => {
    const input = minimalInput([
      task({ weeklyTargetMinutes: 120, maxMinutesPerDay: 60, minSessionMinutes: 30 }),
    ], 180);
    const result = generateGreedySchedule(input);
    expect(result.sessions.reduce((sum, s) => sum + s.endMinute - s.startMinute, 0)).toBe(60);
  });

  it("does not allocate more work than the total available time", () => {
    const input = minimalInput([
      task({ id: "a", weeklyTargetMinutes: 90, priority: 5 }),
      task({ id: "b", weeklyTargetMinutes: 90, priority: 1 }),
    ], 120);
    const result = generateGreedySchedule(input);
    expect(result.metrics.totalScheduledMinutes).toBe(120);
    expect(result.allocations.find((a) => a.taskId === "a")?.scheduledMinutes).toBe(90);
    expect(result.allocations.find((a) => a.taskId === "b")?.scheduledMinutes).toBe(30);
  });

  it("rejects tasks referencing an unknown goal", () => {
    const input = minimalInput([task({ goalId: "missing" })], 60);
    expect(() => generateGreedySchedule(input)).toThrow(/unknown goal/i);
  });

  it("supports balanced-progress strategy", () => {
    const input = minimalInput([
      task({ id: "a", weeklyTargetMinutes: 120, priority: 5 }),
      task({ id: "b", weeklyTargetMinutes: 120, priority: 1 }),
    ], 120, "balanced-progress");
    const result = generateGreedySchedule(input);
    expect(result.allocations.every((a) => a.scheduledMinutes > 0)).toBe(true);
    expect(result.metrics.hardConstraintViolations).toBe(0);
  });
});
