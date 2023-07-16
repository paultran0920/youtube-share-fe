import { BaseDto } from "./base-models";

export interface VideoInfoDto extends BaseDto {
  videoId: string;
  url: string;
  title: string;
  description: string;
  owner: string;
  channelId: string;
  thumbnailUrl: string;
  datePublished: string;
}
