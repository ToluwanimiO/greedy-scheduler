
import type { SchedulingInput } from "../../src/domain/types";

export const optimizerTestInput: SchedulingInput = {
  goals: [
    {
      id: "career",
      title: "Career Growth",
    },
    {
      id: "learning",
      title: "Technical Learning",
    },
  ],

  tasks: [
    {
      id: "interview-prep",
      goalId: "career",
      title: "Technical Interview Preparation",
      weeklyTargetMinutes: 180,
      maxMinutesPerDay: 120,
      priority: 5,
      deadline: {
        day: 3, // Wednesday
        minuteOfDay: 12 * 60, // Noon
      },
      splittable: true,
      minSessionMinutes: 60,
      preferredDays: [1, 2], // Monday and Tuesday
      preferredTimeOfDay: ["morning"],
    },
    {
      id: "system-design",
      goalId: "career",
      title: "System Design Practice",
      weeklyTargetMinutes: 120,
      maxMinutesPerDay: 120,
      priority: 4,
      deadline: {
        day: 5, // Friday
        minuteOfDay: 11 * 60, // 11 AM
      },
      splittable: true,
      minSessionMinutes: 60,
      preferredDays: [3, 4, 5],
      preferredTimeOfDay: ["morning"],
    },
    {
      id: "devops",
      goalId: "learning",
      title: "DevOps Course",
      weeklyTargetMinutes: 180,
      maxMinutesPerDay: 90,
      priority: 2,
      splittable: true,
      minSessionMinutes: 60,
      preferredDays: [4, 6], // Thursday and Saturday
      preferredTimeOfDay: ["afternoon"],
    },
    {
      id: "project",
      goalId: "learning",
      title: "Build a Scheduling Optimizer",
      weeklyTargetMinutes: 120,
      maxMinutesPerDay: 120,
      priority: 3,
      splittable: false,
      minSessionMinutes: 120,
    },
  ],

  availability: [
    {
      day: 1, // Monday
      windows: [
        { startMinute: 9 * 60, endMinute: 11 * 60 },
      ],
    },
    {
      day: 2, // Tuesday
      windows: [
        { startMinute: 9 * 60, endMinute: 11 * 60 },
      ],
    },
    {
      day: 3, // Wednesday
      windows: [
        { startMinute: 9 * 60, endMinute: 11 * 60 },
      ],
    },
    {
      day: 4, // Thursday
      windows: [
        { startMinute: 13 * 60, endMinute: 15 * 60 },
      ],
    },
    {
      day: 5, // Friday
      windows: [
        { startMinute: 9 * 60, endMinute: 11 * 60 },
      ],
    },
    {
      day: 6, // Saturday
      windows: [
        { startMinute: 9 * 60, endMinute: 11 * 60 },
      ],
    },
    {
      day: 7, // Sunday
      windows: [],
    },
  ],

  fixedCommitments: [
    {
      id: "church",
      title: "Church",
      days: [3, 7],
      startMinute: 10 * 60,
      endMinute: 12 * 60,
    },
  ],

  preferences: {
    strategy: "deadline-first",
  },
};
