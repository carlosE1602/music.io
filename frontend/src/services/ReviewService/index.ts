import { HttpService } from '../config';

const createReview = async (writer: string, avaliadoid: string, rating: number, comment: string) => {
  const { data } = await HttpService.post('/avaliacao', {
    writer,
    avaliadoid,
    rating,
    comment,
  });
  return data;
};

const listReview = async (id: string, page: number) => {
  const params: Record<string, any> = {
    limit: 1,
    page,
  };

  const { data } = await HttpService.get(`/avaliacao/${id}`, {
    params,
  });

  return data;
};

export const ReviewService = {
  createReview,
  listReview,
};
