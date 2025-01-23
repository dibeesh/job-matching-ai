import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Candidate extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  skills: string[];

  @Prop({ required: true })
  resume: string; // Plain text of the resume
}
export const CandidateSchema = SchemaFactory.createForClass(Candidate);
