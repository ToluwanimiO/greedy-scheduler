
import { generateOptimizedSchedule } from "./scheduler/optimizerScheduler";
import { scoreSchedule } from "./scheduler/objective";
import { generateGreedySchedule } from "./scheduler/greedyScheduler";
// import { sampleInput } from "../tests/fixtures/sample-input";
import { optimizerTestInput as sampleInput  } from "../tests/fixtures/optimizer-test-input";

const optimizedResult = generateOptimizedSchedule(sampleInput);
const greedyResult = generateGreedySchedule(sampleInput);

console.log("\n=== OPTIMIZED SCHEDULE ===");
console.table(
  optimizedResult.sessions.map((session) => ({
    taskId: session.taskId,
    day: session.day,
    start: session.startMinute,
    end: session.endMinute,
    duration: session.endMinute - session.startMinute,
  })),
);


console.log("\n=== GREEDY SCHEDULE ===");
console.table(
  greedyResult.sessions.map((session) => ({
    taskId: session.taskId,
    day: session.day,
    start: session.startMinute,
    end: session.endMinute,
    duration: session.endMinute - session.startMinute,
  })),
);


console.log("\n=== OPTIMIZED ALLOCATIONS ===");
console.table(optimizedResult.allocations);

console.log("\n=== GREEDY ALLOCATIONS ===");
console.table(greedyResult.allocations);

console.log("\n=== OPTIMIZER SCORE ===");
console.log(scoreSchedule(sampleInput, optimizedResult.sessions));

console.log("\n=== GREEDY SCORE ===");
console.log(scoreSchedule(sampleInput, greedyResult.sessions));


function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const period = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 || 12;

  return `${displayHour}:${String(mins).padStart(2, "0")} ${period}`;
}

const dayNames: Record<number, string> = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

function printTimetable(
  title: string,
  sessions: typeof optimizedResult.sessions,
) {
  console.log(`\n========== ${title} ==========`);

  for (let day = 1; day <= 7; day++) {
    const daySessions = sessions
      .filter((session) => session.day === day)
      .sort((a, b) => a.startMinute - b.startMinute);

    console.log(`\n${dayNames[day]}`);
    console.log("-".repeat(55));

    if (daySessions.length === 0) {
      console.log("  No scheduled tasks");
      continue;
    }

    for (const session of daySessions) {
      const task = sampleInput.tasks.find(
        (item) => item.id === session.taskId,
      );

      console.log(
        `  ${formatTime(session.startMinute)} - ` +
        `${formatTime(session.endMinute)} | ` +
        `${task?.title ?? session.taskId} | ` +
        `${session.endMinute - session.startMinute} minutes`,
      );
    }
  }
}

printTimetable("OPTIMIZED WEEKLY TIMETABLE", optimizedResult.sessions);
printTimetable("GREEDY WEEKLY TIMETABLE", greedyResult.sessions);
