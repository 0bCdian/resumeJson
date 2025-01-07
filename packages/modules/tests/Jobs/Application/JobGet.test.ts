import { JobGet } from '@/Job/Application/JobGet';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../Shared/Logger/logError');
describe('JobGet', () => {
  const mockJobRepository = {
    store: vi.fn(),
    get: vi.fn(),
    update: vi.fn()
  };

  const jobGet = new JobGet(mockJobRepository);
  const jobId = 'test-job-id';
  const userId = 'test-user-id';
  const mockJob = { id: jobId, status: 'pending' };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get a job by id', async () => {
    mockJobRepository.get.mockResolvedValue(mockJob);

    const result = await jobGet.run(jobId, userId);

    expect(result).toEqual(mockJob);
    expect(mockJobRepository.get).toHaveBeenCalledWith(jobId, userId);
  });

  it('should return null  when repository fails', async () => {
    const error = new Error('Get failed');
    mockJobRepository.get.mockRejectedValue(error);

    const result = await jobGet.run(jobId, userId);

    expect(result).toBeNull();
  });
});
