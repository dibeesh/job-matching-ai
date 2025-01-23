import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from './entities/job.entity';
import { searchEmbedding, upsertEmbedding } from '../config/pinecone';
import { generateEmbedding } from '../config/openai';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobService {
  constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {}

  async create(createJobDto: CreateJobDto) {
    const job = await this.jobModel.create(createJobDto);
    const embedding = await generateEmbedding(job.description);
    await upsertEmbedding(job.id, embedding);
    return job;
  }

  async findMatchingCandidates(jobId: string) {
    const job = await this.jobModel.findById(jobId);
    console.log(job);
    if (!job) throw new Error('Job not found');

    const embedding = await generateEmbedding(job.description);
    await upsertEmbedding(jobId, embedding);
    const matches = await searchEmbedding(embedding);
    console.log(matches);
    return matches.map((match) => match.metadata); // Return candidate info
  }
}