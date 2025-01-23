import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';

@Controller('jobs')
export class JobController {
  constructor(private jobService: JobService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobService.create(createJobDto);
  }

  @Get(':id/matches')
  async findMatches(@Param('id') id: string) {
    return this.jobService.findMatchingCandidates(id);
  }
}