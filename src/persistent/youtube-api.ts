import axios from 'axios';
import { BaseCriteria, ListResult } from '../models/base-models';
import { VideoInfoDto } from '../models/youtebe-models';
import { YOUTUBE_ROOT } from './constants';

export const fetchSharedVideos = async (
  searchCriteria: BaseCriteria
): Promise<ListResult<VideoInfoDto>> => {
  const result = await axios.get<ListResult<VideoInfoDto>>(`${YOUTUBE_ROOT}`, {
    params: searchCriteria,
  });

  return result.data;
};

export const shareVideo = async (
  url: string
): Promise<VideoInfoDto> => {
  const result = await axios.post<VideoInfoDto>(`${YOUTUBE_ROOT}/share`, {
    url,
  });

  return result.data;
};

