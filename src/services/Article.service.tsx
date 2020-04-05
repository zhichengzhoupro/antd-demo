import {Article} from "../views/Article/Article";
import {service} from "./common.service"


export const getArticles = ({offset = 0, limited = 0}) => {

    return service.get('/article', {
        params : {
            offset,
            limited
        }
    });
}

export const deleteArticle = async (id: number) => {
    await service.delete(`/article/${id}`);
}

export const getArticleById = async (id: string) => {

    const article = await service.get(`/article/${id}`);

    return article;
}

export const updateArticle = async (article: Article) => {

    const result = await service.put(`/article/`, article);

    return result;
}

export const getKpiArticleAmountByMonthYear = async () => {
    return await service.post(`/article/kpi/amount/month`)
}