import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { CandidateService } from './candidate.service';

@Controller('candidates')
export class CandidateController {
  constructor(private candidateService: CandidateService) {}

  @Post()
  async addCandidate(@Body() candidateData: any) {
    return this.candidateService.addCandidate(candidateData);
  }
}