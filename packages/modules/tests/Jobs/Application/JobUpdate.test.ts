import { describe, it, expect, vi, beforeEach } from 'vitest';
import  type { JobUpdateInfo } from '@/Job/Domain/JobRepository';
import { JobUpdate } from '@/Job/Application/JobUpdate';


describe('JobUpdate', () => {
  const mockJobRepository = {
    store: vi.fn(),
    get: vi.fn(),
    update: vi.fn()
  };

  const jobUpdate = new JobUpdate(mockJobRepository);
  const userId = 'test-user-id';
  const updateInfo:JobUpdateInfo = { jobID: 'test-job',resourceLocation:"somewhere", status: "successful" };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should update a job successfully', async () => {
    mockJobRepository.update.mockResolvedValue(undefined);
    
    const result = await jobUpdate.run(updateInfo, userId);
    
    expect(result).toBe(true);
    expect(mockJobRepository.update).toHaveBeenCalledWith(updateInfo, userId);
  });

  it('should handle update failures', async () => {
    const error = new Error('Update failed');
    mockJobRepository.update.mockRejectedValue(error);
    
    const result = await jobUpdate.run(updateInfo, userId);
    
    expect(result).toBe(false);
  });
});
