export class CreateJobDto {
    title: string;
    description: string;
    company: string;
    location?: string;
    requirements?: string[];
    salary?: {
        min?: number;
        max?: number;
        currency?: string;
    };
}
