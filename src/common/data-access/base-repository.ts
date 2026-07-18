import { ClientSession, Model, QueryOptions } from "mongoose";





export interface CreateOptions{
    session?:ClientSession;
}



export class PaginationResult<T>{
    data:T[];
    totalCount:number;
    page:number | undefined;
    limit:number | undefined;
    pageCount:number;

    constructor(
        data:T[],
        totalCount:number,
        page:number | undefined,
        limit:number | undefined,
    ){
        this.data = data;
        this.totalCount = totalCount;
        this.page = page;
        this.limit = limit;
        this.pageCount = limit ? Math.ceil(totalCount / limit) : 0;
    }
}

export class BaseRepository<T>{

    constructor(public readonly model:Model<T>){}

    async create(
        body:Partial<T>,
        options?:CreateOptions
    ){
        const document = new this.model(body);
        await document.save({
            session:options?.session
        })
        return document;
    }

    async findById(
        id: string | number,
        options: QueryOptions = {lean:true}
    ){
        const document = await this.model.findById(id, undefined, options)
        return document;
    }

    async find(
        filterQuery:Record<string, unknown>,
        options: QueryOptions = {} 
    ){
        const document = this.model.find(filterQuery, undefined, options);
        return document;
    }
}








