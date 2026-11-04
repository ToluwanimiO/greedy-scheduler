import type { SchedulingInput } from "../../src/domain/types";

export const sampleInput: SchedulingInput = {
  goals: [
    { id: "career", title: "Prepare for software engineering roles" },
    { id: "learning", title: "Develop cloud engineering skills" },
    { id: "building", title: "Build a personal project" },
  ],
  tasks: [
    {
      id: "interviews",
      goalId: "career",
      title: "Practise technical interviews",
      weeklyTargetMinutes: 240,
      maxMinutesPerDay: 120,
      priority: 5,
      deadline: { day: 5, minuteOfDay: 1020 },
      splittable: true,
      minSessionMinutes: 60,
      preferredTimeOfDay: ["morning"],
    },
    {
      id: "devops",
      goalId: "learning",
      title: "Study DevOps",
      weeklyTargetMinutes: 180,
      maxMinutesPerDay: 90,
      priority: 3,
      deadline: { day: 7, minuteOfDay: 1200 },
      splittable: true,
      minSessionMinutes: 60,
    },
    {
      id: "project",
      goalId: "building",
      title: "Build a personal project",
      weeklyTargetMinutes: 120,
      maxMinutesPerDay: 120,
      priority: 4,
      splittable: false,
      minSessionMinutes: 120,
    },
    {
      id: "review",
      goalId: "career",
      title: "Review interview notes",
      weeklyTargetMinutes: 60,
      priority: 2,
      splittable: true,
      minSessionMinutes: 30,
    },
  ],
  // Total availability = 600 minutes (10 hours).
  availability: [
    { day: 1, windows: [{ startMinute: 540, endMinute: 660 }] },
    { day: 2, windows: [{ startMinute: 540, endMinute: 660 }] },
    { day: 3, windows: [{ startMinute: 540, endMinute: 600 }] },
    { day: 4, windows: [{ startMinute: 540, endMinute: 660 }] },
    { day: 5, windows: [{ startMinute: 540, endMinute: 660 }] },
    { day: 6, windows: [{ startMinute: 540, endMinute: 600 }] },
    { day: 7, windows: [] },
  ],
  fixedCommitments: [
    { id: "wednesday-church", title: "Church", days: [3], startMinute: 1080, endMinute: 1200 },
    { id: "sunday-church", title: "Church", days: [7], startMinute: 600, endMinute: 720 },
  ],
  preferences: { strategy: "deadline-first" },
};
