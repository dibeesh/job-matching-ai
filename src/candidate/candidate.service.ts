import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Candidate } from './entities/candidate.entity';
import { generateEmbedding } from '../config/openai';
import { upsertEmbedding } from '../config/pinecone';

@Injectable()
export class CandidateService {
  constructor(@InjectModel(Candidate.name) private candidateModel: Model<Candidate>) {}

  async addCandidate(candidateData: Partial<Candidate>) {
    const candidate = new this.candidateModel(candidateData);
    await candidate.save();

    const embedding = await generateEmbedding(candidate.resume);
    await upsertEmbedding(candidate._id.toString(), embedding, {
      type: 'candidate',
      name: candidate.name,
      resume: candidate.resume,
      skills: candidate.skills,
    });

    return candidate;
  }
}