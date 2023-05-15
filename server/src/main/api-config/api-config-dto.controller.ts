import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ApiConfigDto {
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    property: string;

    @ApiPropertyOptional({
        type: String,
        description: 'This is an Optional property',
    })
    optionalProperty: string;
}