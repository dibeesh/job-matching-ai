import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { Candidate, CandidateSchema } from './entities/candidate.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Candidate.name, schema: CandidateSchema }])
  ],
  controllers: [CandidateController],
  providers: [CandidateService],
})
export class CandidateModule {}
