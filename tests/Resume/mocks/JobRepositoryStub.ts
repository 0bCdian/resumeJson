import { Job } from "../../../src/Resume/domain/entities/Job";
import { JobRepository } from "../../../src/Resume/domain/ports/JobsRepository";

export class InMemoryJobRepository implements JobRepository {
  jobs: Map<string, Job>;
  jobsQeue: string[];
  maxJobHistory: number;
  constructor(maxJobHistory: number) {
    this.jobs = new Map<string, Job>();
    this.jobsQeue = [];
    this.maxJobHistory = maxJobHistory;
  }
  create() {
    const job = new Job();
    this.updateQeue(job);
    return job;
  }
  get(jobID: string) {
    return this.jobs.get(jobID);
  }
  private updateQeue(job: Job) {
    this.jobs.set(job.id, job);
    this.jobsQeue.push(job.id);
    if (this.jobsQeue.length > this.maxJobHistory) {
      const removedJob = this.jobsQeue.shift();
      if (!removedJob) return;
      this.jobs.delete(removedJob);
    }
  }
}
