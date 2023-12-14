import { HttpService } from '../config';

const createReview = async (writer: string, avaliadoid: string, rating: number, comment: string[]) => {
  const { data } = await HttpService.post('/users', {
    writer,
    avaliadoid,
    rating,
    comment,
  });
  return data;
};

export const ReviewService = {
  createReview,
};
