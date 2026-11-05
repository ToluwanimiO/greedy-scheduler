
import { generateOptimizedSchedule } from "./scheduler/optimizerScheduler";
import { scoreSchedule } from "./scheduler/objective";
import { generateGreedySchedule } from "./scheduler/greedyScheduler";
import { sampleInput } from "../tests/fixtures/sample-input";

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

console.log("\n=== OPTIMIZED ALLOCATIONS ===");
console.table(optimizedResult.allocations);

console.log("\n=== OPTIMIZER SCORE ===");
console.log(scoreSchedule(sampleInput, optimizedResult.sessions));

console.log("\n=== GREEDY SCORE ===");
console.log(scoreSchedule(sampleInput, greedyResult.sessions));
